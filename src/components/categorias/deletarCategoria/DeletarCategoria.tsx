import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Categoria } from "../../../models/models";
import { deletar, listar } from "../../../services/services";
import { RotatingLines } from "react-loader-spinner";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarCategoria() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const { id } = useParams<{ id: string }>();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function buscarPorId(id: string) {
    try {
      await listar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        ToastAlerta("O token expirou!", "info");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function retornar() {
    navigate("/categorias");
  }

  async function deletarCategoria() {
    setIsLoading(true);
    try {
      await deletar(`/categorias/${id}`, {
        headers: { Authorization: token },
      });
      ToastAlerta("Postagem apagada com sucesso", "sucesso");
      retornar();
    } catch (error: any) {
      if (error.toString().includes("401")) {
        ToastAlerta("O token expirou!", "info");
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar a postagem.", "erro");
      }
    }
    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container w-full max-w-[600px] mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar categoria</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar a categoria a seguir?
      </p>
      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-blue-600 text-white font-bold text-2xl">
          Categoria
        </header>
        <p className="p-8 text-3xl bg-slate-200 h-full">{categoria.tipo}</p>
        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={() => navigate("/categorias")}
          >
            Não
          </button>
          <button
            className="w-full text-slate-100 bg-blue-400 
                                                    hover:bg-blue-600 flex items-center justify-center"
            onClick={deletarCategoria}
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarCategoria;
