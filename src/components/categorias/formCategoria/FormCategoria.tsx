import { ChangeEvent, useEffect, useState, useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { Categoria } from "../../../models/models";
import { atualizar, cadastrar, listar } from "../../../services/services";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormCategoria() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const { id } = useParams<{ id: string }>();

  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await listar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      ToastAlerta("Categoria não encontrada!", "info");
      retornar();
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/categorias/${id}`, categoria, setCategoria, {
          headers: { Authorization: token },
        });

        ToastAlerta("Categoria atualizado com sucesso", "sucesso");
      } catch (error: any) {
        ToastAlerta("Erro ao atualizar o Categoria", "erro");
      }
    } else {
      try {
        await cadastrar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token },
        });

        ToastAlerta("Categoria cadastrada com sucesso", "sucesso");
      } catch (error: any) {
        ToastAlerta("Erro ao cadastrar a Categoria", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/categorias");
  }

  return (
    <div className="container flex justify-around mx-auto ">
      <div className="w-full md:w-1/2 min-h-[80vh] container flex px-4 flex-col items-center justify-center mx-auto gap-4 my-8">
        <h1 className="text-4xl font-bold">
          {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
        </h1>
        <div className="w-[90%] justify-center flex items-center">
          <form
            className="w-4/5 flex flex-col gap-4"
            onSubmit={gerarNovaCategoria}
          >
            <div className="flex flex-col gap-2 ">
              <label htmlFor="categoria">Nome da Categoria</label>
              <input
                type="text"
                placeholder="Verduras"
                name="nome"
                className="w-full border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#587d33] duration-1000"
                required
                value={categoria.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>

            <button
              className="w-full  h-14 bg-[#587d33] items-center justify-center flex  rounded-lg font-bold text-white hover:bg-[#446126] duration-1000"
              type="submit"
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
                <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormCategoria;
