import { Link } from "react-router-dom";
import { Produto } from "../../../models/models";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Basket, Heart, Pencil, Trash } from "@phosphor-icons/react";
import { CartContext, CartContextProps } from "../../../contexts/CardContext";
import { useFavorite } from "../../../contexts/FavoritosContext";

interface CardProdutosProps {
  produto: Produto;
  editavel?: boolean;
}

function CardProduto({ produto, editavel = false }: CardProdutosProps) {
  const { usuario } = useContext(AuthContext);
  const [favorito, setFavorito] = useState(false);
  const { adicionarProduto } = useContext(CartContext) as CartContextProps;

  const { addFavorite, removeFavorite, favorites } = useFavorite();

  useEffect(() => {
    setFavorito(favorites.some((favProduto) => favProduto.id === produto.id));
  }, [favorites, produto]);

  function toggleFavorito() {
    if (!favorito) {
      addFavorite(produto);
    } else {
      removeFavorite(produto.id);
    }
    setFavorito(!favorito);
  }
  return (
    <div className="flex flex-col border border-[#386641] relative  shadow-lg shadow-gray-400 rounded-2xl  w-[220px] max-h-[220px] justify-between">
      <img
        src={produto.foto}
        alt={produto.nome}
        className="border border-[#386641] absolute rounded-full h-28 w-28 -top-14 left-12"
      />
      <div className="p-2 flex flex-col justify-between items-center mt-12 text-center">
        <span className="font-bold text-xl">{produto.nome}</span>
        <p>{produto.descricao}</p>
        <ul className="flex list-none">
          <li>R${produto.preco}/kg</li>
          <li></li>
        </ul>
      </div>
      <div className="flex justify-center">
        {usuario ? (
          <>
            {/* SE O CART NÃO FOR EDITÁVEL ELE SÓ APARECE A OPÇÃO DE ADICIONAR NO CARRINHO */}
            {editavel && (
              <>
                <Link
                  to={`/editarproduto/${produto.id}`}
                  className="absolute top-3 right-9"
                >
                  <Pencil size={20} />
                </Link>
                <Link
                  to={`/deletarproduto/${produto.id}`}
                  className="absolute top-3 right-3"
                >
                  <Trash size={20} />
                </Link>
                {favorito ? (
                  <Heart
                    size={20}
                    weight="fill"
                    className={
                      "absolute top-3 left-3  cursor-pointer hover:text-red-600 dark:hover:text-red-400 text-red-500 duration-300"
                    }
                    onClick={toggleFavorito}
                  />
                ) : (
                  <Heart
                    size={20}
                    className={
                      "absolute top-3 left-3 cursor-pointer hover:text-red-600 dark:hover:text-red-400 text-black  duration-300"
                    }
                    onClick={toggleFavorito}
                  />
                )}
              </>
            )}
            <button
              className="flex gap-2 items-center py-2 w-[80%] mb-2 rounded-full bg-[#386641] justify-center text-white font-medium text-lg"
              onClick={() => adicionarProduto(produto)}
            >
              Adicionar
              <Basket size={20} />
            </button>
          </>
        ) : (
          <>
            <button
              className="flex gap-2 items-center py-2 w-[80%] mb-2 rounded-full bg-[#386641] justify-center text-white font-medium text-lg"
              onClick={() => adicionarProduto(produto)}
            >
              Adicionar
              <Basket size={20} />
            </button>
            <Basket size={20} />
          </>
        )}
      </div>
    </div>
  );
}

export default CardProduto;
