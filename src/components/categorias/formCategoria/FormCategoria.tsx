import { ChangeEvent, useEffect, useState, useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { Categoria } from "../../../models/models";
import { atualizar, cadastrar, listar } from "../../../services/services";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormCategoria() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await listar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      ToastAlerta("Categoria não encontrada!", "info");
      retornar();
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token },
        });

        ToastAlerta("Categoria atualizado com sucesso", "sucesso");
      } catch (error: any) {
        ToastAlerta("Erro ao atualizar o Categoria", "erro");
      }
    } else {
      try {
        await cadastrar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token },
        });

        ToastAlerta("Categoria cadastrada com sucesso", "sucesso");
      } catch (error: any) {
        ToastAlerta("Erro ao cadastrar a Categoria", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/categorias");
  }

  return (
    <div className="bg-[url('https://ik.imagekit.io/vmo8ef1xo/PI%20-AgroComPartilha/imagens%20login%20cadastro/outside-312569288.jpg?updatedAt=1717608899134')] bg-cover bg-no-repeat h-screen flex justify-center items-center flex-col">
    <div className="justify-center text-black items-center bg-white bg-opacity-40
       w-1/2 rounded-3xl gap-4">
      <h1 className="text-3xl text-center my-9 ">
        {id === undefined ? 'Cadastrar Categoria' : 'Editar Categoria'}
      </h1>

      <form className="w-1/2 text-center  my-8 flex flex-col gap-8 text-black rounded-1xl outline-0 p-1.5  w-full"
        onSubmit={gerarNovaCategoria}
      >
        <div className="text-2xl text-center justify-center my-3 gap-5 ">
          <label htmlFor="categoria">Categoria</label>
          <input
            type="text"
            placeholder="Categoria"
            name='tipo'
            className="border-1 border-slate-600 rounded p-3 utral-800"
            required
            value={categoria.tipo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button
          className="rounded text-slate-100 bg-slate-400 
          hover:bg-green-700 w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
        >
          {isLoading ?
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            /> :
            <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
          }
        </button>
      </form>
    </div>
    </div>
  );
}

export default FormCategoria;