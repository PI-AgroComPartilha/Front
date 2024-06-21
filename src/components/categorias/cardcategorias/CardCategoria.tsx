import { Link, useNavigate } from "react-router-dom";
import { Categoria } from "../../../models/models";
import { CircleNotch, Plant } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { deletar } from "../../../services/services";
import { AuthContext } from "../../../contexts/AuthContext";

interface CardCategoriasProps {
  categoria: Categoria;
  research: () => void;
}

function CardCategoria({ categoria, research }: CardCategoriasProps) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [loadingDeleteRequest, setLoadingDeleteRequest] =
    useState<boolean>(false);

  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  async function deletarCategoria() {
    setLoadingDeleteRequest(true);
    try {
      await deletar(`/categorias/${categoria.id}`, {
        headers: { Authorization: token },
      });
      ToastAlerta("Postagem apagada com sucesso", "sucesso");
      research();
    } catch (error: any) {
      if (error.toString().includes("401")) {
        ToastAlerta("O token expirou!", "info");
      } else {
        ToastAlerta("Erro ao deletar a postagem.", "erro");
      }
      research();
    }

    setDeleteModal(false);
    setLoadingDeleteRequest(false);
  }

  return (
    <div className="border flex flex-col rounded-2xl overflow-hidden justify-between ">
      <header className="py-2 px-6  bg-[#587d33] text-white font-bold text-2xl text-center">
        <div className="flex gap-4 text-center mx-auto w-full justify-center items-center">
          <h4>{categoria.nome}</h4>
          <Plant size={18} weight="duotone" />
        </div>
      </header>
      <span className="w-full text-3xl h-1" />
      <div className="flex gap-1">
        <Link
          to={`/editarcategoria/${categoria.id}`}
          className="w-full text-slate-100 bg-[#587d33] hover:bg-[#456328] flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>

        <button
          onClick={() => setDeleteModal(true)}
          className="text-slate-100  bg-[#A7C957] hover:bg-red-600 w-full flex items-center justify-center"
        >
          Deletar
        </button>
      </div>
      {/* --------- Modal --------- */}

      <div
        onClick={() => setDeleteModal(false)}
        className={`fixed  right-0 top-0 flex  h-full w-full select-none items-center justify-center   bg-gray-500/50 ${
          deleteModal ? "visible fixed" : "invisible hidden"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="mx-4 flex min-h-20 w-full max-w-[600px] flex-col  justify-center gap-7 rounded-xl bg-white p-6"
        >
          <p className="text-center  font-bold text-black text-3xl">
            Você tem certeza que deseja deletar está categoria ?
          </p>{" "}
          <div className="flex w-full justify-center gap-4 ">
            <button
              className=" min-w-16 justify-center text-2xl w-full border border-gray-500 hover:bg-gray-100 py-2 rounded-lg"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              color="error"
              className="min-w-16 justify-center flex  text-2xl mx-auto w-full border items-center  rounded-lg bg-red-400 hover:bg-red-500"
              onClick={deletarCategoria}
            >
              {loadingDeleteRequest ? (
                <CircleNotch className="animate-spin  " />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCategoria;
