import { Link } from "react-router-dom";
import { Categoria } from "../../../models/models";

interface CardCategoriasProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriasProps) {
  return (
    <div className="border flex border-2 flex-col rounded-2xl overflow-hidden justify-between">
      <header className="py-2 px-6  bg-[#587d33] text-white font-bold text-2xl">
        {" "}
        {categoria.tipo}
      </header>
      <p className="p-8 text-3xl h-full">Descrição: </p>
      <div className="flex">
        <Link
          to={`/editarcategoria/${categoria.id}`}
          className="w-full text-slate-100 bg-[#587d33] hover:bg-indigo-800 flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarcategoria/${categoria.id}`}
          className="text-slate-100  bg-[#A7C957] hover:bg-red-700 w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;
