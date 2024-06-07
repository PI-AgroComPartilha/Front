import { Link } from "react-router-dom";
import { Produto } from "../../../models/models";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  Basket,
  CircleNotch,
  Heart,
  Pencil,
  Trash,
} from "@phosphor-icons/react";
import { CartContext, CartContextProps } from "../../../contexts/CardContext";
import { useFavorite } from "../../../contexts/FavoritosContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { deletar } from "../../../services/services";

interface CardProdutosProps {
  produto: Produto;
  editavel?: boolean;
}

function CardProduto({ produto, editavel = false }: CardProdutosProps) {
  const { isAuthenticated } = useContext(AuthContext);
  const [favorito, setFavorito] = useState(false);
  const { adicionarProduto } = useContext(CartContext) as CartContextProps;
  const { addFavorite, removeFavorite, favorites } = useFavorite();

  useEffect(() => {
    setFavorito(favorites.some((favProduto) => favProduto.id === produto.id));
  }, [favorites, produto]);

  function toggleFavorito() {
    if (!isAuthenticated)
      return ToastAlerta(
        "Você tem que está logado para poder adicionar aos favoritos!",
        "info"
      );

    if (!favorito) {
      addFavorite(produto);
    } else {
      removeFavorite(produto.id);
    }
    setFavorito(!favorito);
  }

  /* const [deleteModal, setDeleteModal] = useState(false);
  const [loadingDeleteRequest, setLoadingDeleteRequest] =
    useState<boolean>(false);

  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  async function deletarProduto() {
    setLoadingDeleteRequest(true);

    try {
      await deletar(`/produtos/${produto.id}`, {
        headers: { Authorization: token },
      });

      ToastAlerta("Produto apagado com sucesso", "sucesso");
    } catch (error) {
      ToastAlerta("Erro ao deletar o produto.", "erro");
    }

    setLoadingDeleteRequest(false);
  } */
  return (
    <div className="flex select-none flex-col border border-[#386641] relative p-4 pb-1  shadow-lg shadow-gray-400 rounded-2xl  w-[220px] max-h-[220px] justify-between">
      <img
        src={produto.foto}
        alt={produto.nome}
        className="border border-[#386641] absolute rounded-full h-[128px] w-[128px] -top-16 left-1/2 -translate-x-1/2 object-cover
       0 "
      />
      <div className="p-2 flex flex-col justify-between items-center mt-12 text-center">
        <span className="font-bold text-xl">{produto.nome}</span>

        <p className="font-semibold">R$ {produto.preco}/kg</p>
      </div>
      <div className="flex justify-center">
        {/* SE O CART NÃO FOR EDITÁVEL ELE SÓ APARECE A OPÇÃO DE ADICIONAR NO CARRINHO */}
        {editavel && (
          <>
            <Link
              to={`/editarproduto/${produto.id}`}
              className="absolute top-10 left-3 hover:color-[#587d33]"
            >
              <Pencil size={24} className="hover:fill-yellow-500" />
            </Link>
            <Link
              to={`/deletarproduto/${produto.id}`}
              className="absolute top-3 left-3"
            >
              <Trash size={24} className="hover:fill-red-500" />
            </Link>
            {/* <Trash
              onClick={() => setDeleteModal(true)}
              size={24}
              className="hover:fill-red-500 absolute top-3 left-3"
            /> */}
          </>
        )}
        <button
          className="flex gap-2 items-center py-1 w-full mb-2 rounded-xl bg-[#386641] justify-center text-white font-medium text-lg"
          onClick={() => {
            if (!isAuthenticated)
              return ToastAlerta(
                "Você tem que está logado para poder adicionar produtos no carrinho!",
                "info"
              );

            adicionarProduto(produto);
          }}
        >
          Adicionar
          <Basket size={20} weight="bold" />
        </button>
        {favorito ? (
          <Heart
            size={24}
            weight="fill"
            className={
              "absolute top-3 right-3  cursor-pointer hover:text-red-600 dark:hover:text-red-400 text-red-500 duration-300"
            }
            onClick={toggleFavorito}
          />
        ) : (
          <Heart
            size={24}
            className={
              "absolute top-3 right-3 cursor-pointer hover:text-red-600 dark:hover:text-red-400 text-black  duration-300"
            }
            onClick={toggleFavorito}
          />
        )}
      </div>
    </div>
  );
}

export default CardProduto;
