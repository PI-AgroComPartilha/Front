import { useState, useContext, useEffect } from "react";
import { Vortex } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { Categoria, Produto } from "../../../models/models";
import { listar } from "../../../services/services";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardProduto from "../cardprodutos/CardProdutos";
import { Plant } from "@phosphor-icons/react";
import Loading from "../../loading/loading";

type ListarProdutosProps = {
  produtos: Produto[];
  titulo?: string;
  naoEncontrado?: string;
  temOpcaoDeCriarNovoProduto?: boolean;
  isLoading: boolean;
};

function ListarProdutos({
  produtos,
  titulo,
  temOpcaoDeCriarNovoProduto = false,
  naoEncontrado = "Nenhum produto encontrado...",
  isLoading,
}: ListarProdutosProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filtroProduto, setFiltroProduto] = useState<string>("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarCategorias() {
    try {
      await listar("/categorias", setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        ToastAlerta("O token expirou, favor logar novamente", "error");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, [token]);

  const handleFiltrarProdutos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroProduto(e.target.value);
  };

  const handleSelecionarCategoria = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategoriaSelecionada(e.target.value);
  };

  const produtosFiltrados = produtos.filter((produto) => {
    return (
      produto.nome.toLowerCase().includes(filtroProduto.toLowerCase()) &&
      (categoriaSelecionada === "" ||
        produto.categorias?.id === parseInt(categoriaSelecionada))
    );
  });

  const cadastrarProduto = (
    <Link to="/cadastrarProduto">
      <button
        className={`p-2 border-3 rounded-lg text-nowrap w-full  border-black dark:border-white font-semibold bg-[#587d33] text-white hover:bg-[#4d702a] `}
        style={{ fontSize: "15px" }}
      >
        Cadastrar Novo Produto
      </button>
    </Link>
  );

  if (isLoading) return <Loading title="Carregando Produtos..." />;

  return (
    <div className="mb-6 select-none  p-5 flex flex-col gap-10 min-h-[82vh]">
      <div className="container flex flex-col items-center justify-center mx-auto gap-4">
        <h2 className="text-4xl text-center mt-4  font-bold uppercase">
          {titulo ? titulo : "Produtos"}
        </h2>
        {produtos.length !== 0 ? (
          <div
            className={
              " bg-[#587d33] flex w-full  bg-opacity-50 backdrop-blur-sm  dark:bg-opacity-30 py-3 px-4 mb-10   flex-col md:flex-row items-center rounded-xl "
            }
          >
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Pesquisar por produto"
                value={filtroProduto}
                onChange={handleFiltrarProdutos}
                className="border-slate-800 rounded-xl bg-white w-full hidden md:block mx-auto px-3 py-2 duration-300"
              />
              <select
                name="categoria"
                id="categoria"
                value={categoriaSelecionada}
                onChange={handleSelecionarCategoria}
                className="border-slate-800 rounded bg-transparent mx-4 cursor-pointer"
              >
                <option value="">Todas as categorias</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.tipo}
                  </option>
                ))}
              </select>
            </div>
            {usuario.tipo === "vendedor" &&
              temOpcaoDeCriarNovoProduto &&
              cadastrarProduto}
          </div>
        ) : (
          usuario.tipo === "vendedor" &&
          temOpcaoDeCriarNovoProduto &&
          cadastrarProduto
        )}
      </div>
      <div className="container mx-auto flex flex-wrap gap-20 justify-center items-center">
        {produtosFiltrados.length === 0 && (
          <p className="text-2xl font-bold">{naoEncontrado}</p>
        )}
        {produtosFiltrados.map((produto) => {
          return (
            <CardProduto
              key={produto.id}
              produto={produto}
              editavel={produto.usuarios?.id === usuario.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ListarProdutos;
