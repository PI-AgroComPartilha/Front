import { useContext, useEffect, useState } from "react";
import { Produto } from "../../models/models";
import { AuthContext } from "../../contexts/AuthContext";
import { listar } from "../../services/services";
import { DNA } from "react-loader-spinner";
import CardProdutos from "../../components/produtos/cardprodutos/CardProdutos";

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const { usuario } = useContext(AuthContext);
  const token = usuario.token;
  async function buscarProdutos() {
    await listar("/produtos", setProdutos, {
      headers: { Authorization: token },
    });
  }

  useEffect(() => {
    buscarProdutos();
  }, [produtos.length]);

  return (
    <>
      <div className="container px-3 my-10 min-h-[80svh] mx-auto  flex flex-wrap justify-evenly gap-4">
        {produtos.length === 0 ? (
          <DNA
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper mx-auto"
          />
        ) : (
          produtos.map((produto) => (
            <CardProdutos key={produto.id} produto={produto} />
          ))
        )}
      </div>
    </>
  );
}
