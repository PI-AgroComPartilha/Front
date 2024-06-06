import { Link } from "react-router-dom";
import { Categoria } from "../../../models/models";
import { Plant } from "@phosphor-icons/react";

interface CardCategoriasProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriasProps) {
  return (
    <div className="border flex flex-col rounded-2xl overflow-hidden justify-between ">
      <header className="py-2 px-6  bg-[#587d33] text-white font-bold text-2xl text-center">
        <div className="flex gap-4 text-center mx-auto w-full justify-center items-center">
          <h4>{categoria.tipo}</h4>
          <Plant size={18} weight="duotone" />
        </div>
      </header>
      <span className="w-full text-3xl h-1" />
      <div className="flex ">
        <Link
          to={`/editarcategoria/${categoria.id}`}
          className="w-full text-slate-100 bg-[#587d33] hover:bg-[#456328] flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarcategoria/${categoria.id}`}
          className="text-slate-100  bg-[#A7C957] hover:bg-red-600 w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;
