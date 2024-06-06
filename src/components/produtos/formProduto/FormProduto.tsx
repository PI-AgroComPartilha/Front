/* import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Categoria, CriarProduto } from "../../../models/models";
import { atualizar, cadastrar, listar } from "../../../services/services";
import { RotatingLines } from "react-loader-spinner";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormularioProduto() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<Categoria>({ id: 0, tipo: "" });
  const [produto, setProduto] = useState<CriarProduto>({} as CriarProduto);
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    buscarCategorias();

    if (id !== undefined) {
      buscarProdutoPorId(id);
    }
  }, [id]);

  useEffect(() => {
    console.log(categoria);
    setProduto({
      categorias: categoria,
      ...produto,
      usuarios: usuario.id,
      preco: Number(produto.preco),
    });

    console.log(produto);
  }, [categoria]);

  async function buscarProdutoPorId(id: string) {
    try {
      await listar(`/produtos/${id}`, setProduto, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      ToastAlerta("Erro ao buscar produto", "erro");
    }
  }

  async function buscarCategoriaPorId(id: string) {
    console.log(id);
    try {
      await listar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      ToastAlerta("Erro ao buscar categoria", "erro");
    }
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
    } else {
      value = e.target.value;
    }

    setProduto({
      ...produto,
      [e.target.name]: value,
      categorias: categoria,
      usuarios: usuario.id,
    });
  }

  function retornar() {
    navigate("/produtos");
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    console.log(produto);

    if (id) {
      try {
        await atualizar(`/produtos`, produto, setProduto, {
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
    //retornar();
  }

  const carregandoCategoria = categoria.tipo === "";

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoProduto}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Nome do Produto</label>
          <input
            value={produto.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Insira aqui o nome do Produto"
            name="nome"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Preço do Produto</label>

          <input
            value={produto.preco}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="number"
            placeholder="Adicione aqui o preço do Produto"
            name="preco"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Descrição</label>
          <input
            value={produto.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Insira aqui a descrição do Produto"
            name="descricao"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Quantidade</label>
          <input
            value={produto.quantidade}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Insira aqui a quantidade"
            name="quantidade"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Foto do Produto</label>

          <input
            value={produto.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Adicione aqui a foto do Produto"
            name="foto"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Categoria do Produto</p>
          <select
            name="categorias"
            className="border p-2 border-slate-800 rounded"
            value={produto.categorias?.id || ""}
            onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
          >
            <option value="">Selecione a categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.tipo}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={carregandoCategoria}
          className="flex justify-center rounded disabled:bg-slate-200 bg-slate-400 
                    hover:bg-slate-800  text-white font-bold w-1/2 mx-auto py-2"
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
  );
}

export default FormularioProduto;
 */

import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { Categoria, CriarProduto } from "../../../models/models";
import { atualizar, cadastrar, listar } from "../../../services/services";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";

export default function FormProduto() {
  const [produto, setProduto] = useState<CriarProduto>({} as CriarProduto);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    tipo: "",
  });

  async function buscarProdutoPorId(id: string) {
    await listar(`/produtos/${id}`, setProduto, {
      headers: {
        Authorization: token,
      },
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
        categorias: categoria.id,
        usuarios: usuario.id,
      });
      return;
    }

    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categorias: categoria.id,
      usuarios: usuario.id,
    });
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    console.log(produto);

    if (id) {
      try {
        await atualizar(`/produtos`, produto, setProduto, {
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
    navigate("/home");
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
      categorias: categoria.id,
    });
  }, [categoria]);

  //TODO: Criar card de preview que atualiza os componentes conforme edição do usuário
  return (
    <div className="container flex justify-around mx-auto">
      <div className="w-full min-h-[84vh] container flex flex-col items-center justify-center mx-auto gap-4 my-8">
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
            type="text"
            placeholder="Nome do Produto"
            name="nome"
            className="w-[50%] border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#587d33] duration-1000"
            value={produto.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />

          <input
            type="text"
            placeholder="Descrição do Produto"
            name="descricao"
            className="w-[50%] border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#587d33] duration-1000 "
            value={produto.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />

          <input
            type="number"
            placeholder="Preço do Produto"
            name="preco"
            className="w-[50%] border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#587d33] duration-1000 "
            min="0"
            step="0.01"
            value={produto.preco}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />

          <input
            type="number"
            placeholder="Quantidade do Produto"
            name="quantidade"
            className="w-[50%] border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#587d33] duration-1000 "
            value={produto.quantidade}
            min={0}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />

          <input
            type="text"
            placeholder="URL da Imagem do Produto"
            name="foto"
            className="w-[50%] border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#587d33] duration-1000"
            value={produto.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />

          <select
            name="categoria"
            className="w-[50%] border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 "
            value={produto.categorias || ""}
            onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
          >
            <option value="">Selecione a categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.tipo}
              </option>
            ))}
          </select>

          <button
            className="w-[50%] h-14 bg-[#587d33] rounded-lg font-bold text-white hover:bg-[#5f5f5f] duration-1000"
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
