import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Produto } from "../../models/models";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { listar } from "../../services/services";
import ListarProdutos from "../../components/produtos/listarProdutos/listarProdutos";
import { Helmet } from "react-helmet";

function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarProdutos() {
    try {
      await listar("/produtos", setProdutos, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        ToastAlerta("O token expirou, favor logar novamente", "error");
        handleLogout();
      }
    }

    setIsLoading(false);
  }

  useEffect(() => {
    buscarProdutos();
  }, [token]);

  return (
    <>
    <Helmet>
      <title>Agrocompartilha | Produtos</title>
    </Helmet>
    <ListarProdutos
      produtos={produtos}
      titulo="Nossos Produtos 🛒"
      isLoading={isLoading}
      />
      </>
  );
}

export default ProdutosPage;
