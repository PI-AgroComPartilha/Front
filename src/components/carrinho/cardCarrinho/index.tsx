import { useContext } from "react";
import { CartContext } from "../../../contexts/CardContext";
import { Produto } from "../../../models/models";

interface CardProdutosProps {
  item: Produto;
}

function CardCarrinho({ item }: CardProdutosProps) {
  const { removerProduto } = useContext(CartContext);

  return (
    <div className="flex flex-col rounded-lg overflow-hidden justify-between bg-white">
      <div className="py-4">
        <img
          src={item.foto}
          className="mt-1 h-40 w-full mx-auto object-cover"
          alt={item.nome}
        />

        <div className="p-4 border-x-4 gap-2">
          <p className="font-semibold text-xl text-center uppercase">
            {item.nome}
          </p>
          <h3 className="text-xl text-center font-bold uppercase">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.preco)}
          </h3>
          <p className="text-sm italic text-center">
            Categoria: {item.categorias.tipo}
          </p>
        </div>
        <button
          className="w-full text-slate-100 bg-red-500 hover:bg-red-700 
                                   flex items-center justify-center py-2 rounded-b-lg"
          onClick={() => removerProduto(item.id)}
        >
          Remover
        </button>
      </div>
    </div>
  );
}

export default CardCarrinho;
