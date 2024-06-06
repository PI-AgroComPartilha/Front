import { useEffect, useState } from "react";
import { useFavorite } from "../../contexts/FavoritosContext";
import ListarProdutos from "../../components/produtos/listarProdutos/listarProdutos";

function FavoritosPage() {
  const { favorites } = useFavorite();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <ListarProdutos
      produtos={favorites}
      titulo="Favoritos 💖💖"
      naoEncontrado="Você não gosta de nada ?? vai lá favorita algo e ajudar o pessoal (Você nem vai pagar)"
      isLoading={isLoading}
    />
  );
}

export default FavoritosPage;
