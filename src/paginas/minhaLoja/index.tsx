import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Produto, Usuario } from "../../models/models";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { listar } from "../../services/services";
import ListarProdutos from "../../components/produtos/listarProdutos/listarProdutos";

function MinhaLojaPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

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
  }

  useEffect(() => {
    buscarProdutos();
  }, [token]);

  /* Isso aqui é uma gambiarra louca para arrumar o backend user produtc dont have */
  const userProduto = produtos.filter(
    (prod) => prod.usuarios?.id === usuario.id
  );
  return (
    <ListarProdutos
      produtos={(userProduto as any) || []}
      titulo="Meu Produtos"
      temOpcaoDeCriarNovoProduto={true}
    />
  );
}

export default MinhaLojaPage;
