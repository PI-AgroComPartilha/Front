import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { Categoria, CriarProduto } from "../../../models/models";
import { atualizar, cadastrar, listar } from "../../../services/services";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";

export default function FormProduto() {
  const [produto, setProduto] = useState<CriarProduto>({
    id: 0,
    nome: "",
    foto: "",
    preco: 0,
    categoria: {
      id: 0,
    },
  } as CriarProduto);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
  });

  async function buscarProdutoPorId(id: string) {
    await listar(`/produtos/${id}`, setProduto, {
      headers: {
        Authorization: token,
      },
    });

    setProduto((p) => {
      /* Delete the quantity and description receive from the backend */
      delete p.quantidade;
      delete p.descricao;

      /* Update the price to be a number so when the user enters  */
      return { ...p, preco: Number(p.preco) };
    });
  }

  async function buscarCategoriaPorId(id: string) {
    await listar(`/categorias/${id}`, setCategoria, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarCategorias() {
    try {
      await listar(`/categorias`, setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      ToastAlerta("Erro ao buscar categorias", "erro");
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    let value: any;

    if (e.target.name === "preco") {
      value = parseFloat(Number(e.target.value).toFixed(2));
      console.log(value);
      console.log(typeof value);
      e.target.value = value;

      setProduto({
        ...produto,
        preco: value,
        categoria: {
          id: categoria.id,
        },
        usuario: {
          id: usuario.id,
        },
      });
      return;
    }

    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categoria: {
        id: categoria.id,
      },
      usuario: {
        id: usuario.id,
      },
    });
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    console.log(produto);
    if (id) {
      try {
        await atualizar(`/produtos/${id}`, produto, setProduto, {
          headers: { Authorization: token },
        });

        ToastAlerta("Produto atualizado com sucesso", "sucesso");
      } catch (error: any) {
        ToastAlerta("Erro ao atualizar o produto!", "erro");
      }
    } else {
      try {
        await cadastrar(`/produtos`, produto, setProduto, {
          headers: { Authorization: token },
        });

        ToastAlerta("Produto cadastrado com sucesso", "sucesso");
      } catch (error: any) {
        ToastAlerta("Erro ao cadastrar o produto!", "sucesso");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/produtos");
  }

  useEffect(() => {
    if (token === "") {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarProdutoPorId(id);
    }
    buscarCategorias();
  }, [id]);

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: {
        id: categoria.id,
      },
    });
  }, [categoria]);

  //TODO: Criar card de preview que atualiza os componentes conforme edição do usuário
  return (
    <div className="container flex justify-around mx-auto ">
      <div className="w-full md:w-1/2 min-h-[84vh] container flex px-4 flex-col items-center justify-center mx-auto gap-4 my-8">
        <div className="w-[90%] justify-center flex items-center">
          <h1 className="text-3xl font-bold">
            {id === undefined ? "Novo Produto" : "Editar Produto"}
          </h1>
          {/*  <img src={Logo} className="w-14" alt="" /> */}
        </div>

        <form
          className="w-full flex flex-col items-center gap-4 mx-auto"
          onSubmit={gerarNovoProduto}
        >
          <input
            required
            type="text"
            placeholder="Nome do Produto"
            name="nome"
            className="w-full border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#587d33] duration-1000"
            value={produto.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />

          <input
            required
            type="number"
            placeholder="Preço do Produto"
            name="preco"
            className="w-full border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#587d33] duration-1000 "
            min="0"
            step="0.01"
            value={produto.preco}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />

          <input
            required
            type="text"
            placeholder="URL da Imagem do Produto"
            name="foto"
            className="w-full border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#587d33] duration-1000"
            value={produto.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />

          <select
            required
            name="categoria"
            className="w-full border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#587d33]  duration-1000 "
            value={produto.categoria.id ? produto.categoria.id : ""}
            onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled>
              Selecione a categoria
            </option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>

          <button
            className="w-full  h-14 bg-[#587d33] items-center justify-center flex  rounded-lg font-bold text-white hover:bg-[#446126] duration-1000"
            type="submit"
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
