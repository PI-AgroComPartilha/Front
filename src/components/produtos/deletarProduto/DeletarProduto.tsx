import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Produto } from "../../../models/models";
import { listar, deletar } from "../../../services/services";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";

function DeletarProduto() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produto, setProduto] = useState<Produto>({} as Produto);

  const { id } = useParams<{ id: string }>();

  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await listar(`/produtos/${id}`, setProduto, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      ToastAlerta("Produto não encontrado!", "erro");
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarProduto() {
    setIsLoading(true);

    try {
      await deletar(`/produtos/${id}`, {
        headers: { Authorization: token },
      });

      ToastAlerta("Produto apagado com sucesso", "sucesso");
    } catch (error) {
      ToastAlerta("Erro ao deletar o produto.", "erro");
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/produtos");
  }

  return (
    <div className="container w-1/3 mx-auto min-h-[85vh] flex flex-col justify-center">
      <h1 className="text-4xl text-center py-4">Deletar Produto</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar o produto a seguir?
      </p>
      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="w-full text-slate-100 text-2xl font-bold bg-[#587d33] hover:bg-[#456328] flex items-center justify-center py-2">
          Produto
        </header>
        <p className="p-8 text-3xl bg-white h-full text-center">
          {produto.nome}
        </p>
        <div className="flex">
          <button
            className="w-full text-slate-100 bg-[#587d33] hover:bg-[#456328] flex items-center justify-center py-2"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="w-full text-slate-100 0 hover:bg-red-500
                         flex items-center justify-center bg-red-600 b"
            onClick={deletarProduto}
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
export default DeletarProduto;
