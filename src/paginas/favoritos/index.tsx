import { useEffect, useState } from "react";
import { useFavorite } from "../../contexts/FavoritosContext";
import ListarProdutos from "../../components/produtos/listarProdutos/listarProdutos";

function FavoritosPage() {
  const { favorites } = useFavorite();
  /*  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []); */

  console.log(favorites);

  return (
    <ListarProdutos
      produtos={favorites}
      titulo="Favoritos 💖💖"
      naoEncontrado="Nenhum favorito encontrado"
    />
  );
}

export default FavoritosPage;
