import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Produto } from "../../../models/models";
import { listar, deletar } from "../../../services/services";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarProduto() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produto, setProduto] = useState<Produto>({} as Produto);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await listar(`/produtos/${id}`, setProduto, "");
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
      await deletar(`/produtos/${id}`, "");

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
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center py-4">Deletar Produto</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar o produto a seguir?
      </p>
      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-slate-600 text-white font-bold text-2xl">
          Produto
        </header>
        <p className="p-8 text-3xl bg-white h-full">{produto.nome}</p>
        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="w-full text-slate-100 bg-teal-400 hover:bg-teal-700
                         flex items-center justify-center"
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
