import { useState, useContext, useEffect } from "react";
import { Vortex } from "react-loader-spinner";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { Categoria, Produto } from "../../../models/models";
import { listar } from "../../../services/services";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardProduto from "../cardprodutos/CardProdutos";

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
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "error");
      navigate("/");
    }
  }, [token]);

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
    console.log(produto);
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

  console.log(produtos);
  console.log(usuario);
  return (
    <>
      {isLoading && (
        <>
          <div className="flex flex-col items-center justify-center my-4 gap-4 min-h-screen">
            <Vortex
              height="100"
              width="100"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              visible={true}
              colors={[
                "#be0343",
                "#be0343",
                "#be0343",
                "#be0343",
                "#be0343",
                "green",
              ]}
            />
            <p>Parece que nenhum produto foi postado ainda.</p>
            <p>Aguarde até que um vendedor poste algo.</p>
          </div>
        </>
      )}
      <div className="container justify-center mx-auto  bg-wallpaper bg-repeat bg-center  min-h-screen">
        <h2 className="text-4xl text-center my-4 font-bold uppercase">
          {titulo ? titulo : "Produtos"}
        </h2>
        <div className="flex gap-14 flex-col mx-auto">
          {produtos.length !== 0 ? (
            <>
              <div
                className={
                  "my-10 bg-[#587d33]  flex w-full bg-opacity-50 backdrop-blur-sm  dark:bg-opacity-30 py-3 px-5 mb-10   flex-col md:flex-row items-center rounded-xl "
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
                {(usuario.tipo === "vendedor" ||
                  usuario.tipo === "administrador") &&
                  temOpcaoDeCriarNovoProduto &&
                  cadastrarProduto}
              </div>
            </>
          ) : (
            (usuario.tipo === "vendedor" || usuario.tipo === "administrador") &&
            temOpcaoDeCriarNovoProduto &&
            cadastrarProduto
          )}
          <div className="mx-auto flex flex-wrap gap-20 justify-center items-center ">
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
      </div>
    </>
  );
}

export default ListarProdutos;
