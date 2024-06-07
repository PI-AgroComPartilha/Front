import { useEffect, useState } from "react";
import { useFavorite } from "../../contexts/FavoritosContext";
import ListarProdutos from "../../components/produtos/listarProdutos/listarProdutos";
import { Helmet } from "react-helmet";

function FavoritosPage() {
  const { favorites, removeFavorite } = useFavorite();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
    <Helmet>
      <title>Agrocompartilha | Favoritos</title>
    </Helmet>
    <ListarProdutos
      produtos={favorites}
      titulo="Favoritos 💖💖"
      naoEncontrado="Você não tem produtos salvo nos favoritos "
      isLoading={isLoading}
      />
      </>
  );
}

export default FavoritosPage;
