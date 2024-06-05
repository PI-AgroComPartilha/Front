import { Link } from "react-router-dom";
import { Produto } from "../../../models/models";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

interface CardProdutosProps {
  produto: Produto;
}

// export interface Produto {
//   id: number;
//   nome: string;
//   descricao: string;
//   foto: string;
//   preco: number;
//   quantidade: number;
//   categoria?: Categoria;
//   usuario: Usuario;
// }

function CardProduto({ produto }: CardProdutosProps) {
  const { usuario } = useContext(AuthContext);

  return (
    <div className="flex flex-col border border-gray-300 shadow-lg rounded overflow-hidden  w-[220px] max-h-[380px] justify-between">
      <div
        className="bg-cover bg-center h-3/5"
        style={{ backgroundImage: `url('${produto.foto}')` }}
      ></div>
      <div className="p-2 flex flex-col justify-between">
        <span className="font-bold text-xl">{produto.nome}</span>
        <p>{produto.descricao}</p>
        <ul className="flex list-none">
          <li>R${produto.preco}</li>
          <li></li>
        </ul>
      </div>
      <div className="flex">
        <Link
          to={`/editarproduto/${produto.id}`}
          className="w-full text-white bg-stone-500 
          hover:bg-yellow-900 flex items-center justify-center py-2"
        >
          Editar
        </Link>
        <Link
          to={`/deletarproduto/${produto.id}`}
          className="text-white bg-red-400 
                    hover:bg-red-700 w-full flex items-center justify-center"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardProduto;
