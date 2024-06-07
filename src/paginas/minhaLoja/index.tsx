import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Produto } from "../../models/models";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { listar } from "../../services/services";
import ListarProdutos from "../../components/produtos/listarProdutos/listarProdutos";
import { Helmet } from "react-helmet";

function MinhaLojaPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "error");
      navigate("/");
    }
  }, [token]);

  async function buscarProdutos() {
    try {
      await listar(`/produtos`, setProdutos, {
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

  /* Isso aqui é uma gambiarra louca para arrumar o backend user produtc dont have */
  const userProduto = produtos.filter(
    (prod) => prod.usuarios?.id === usuario.id
  );
  return (
    <>
    <Helmet>
      <title>Agrocompartilha | Loja</title>
    </Helmet>
    <ListarProdutos
      produtos={(userProduto as any) || []}
      titulo="Meu Produtos"
      temOpcaoDeCriarNovoProduto={true}
      isLoading={isLoading}
      />
      </>
  );
}

export default MinhaLojaPage;
