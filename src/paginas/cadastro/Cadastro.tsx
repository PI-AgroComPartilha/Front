import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../../services/services";
import { Usuario } from "../../models/models";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { ArrowLeft } from "@phosphor-icons/react";

function Cadastro() {
  let navigate = useNavigate();

  const { isLoading } = useContext(AuthContext);

  const [confirmaSenha, setConfirmaSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    tipo: "",
    foto: "",
  });

  const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    tipo: "",
    foto: "",
  });

  useEffect(() => {
    if (usuarioResposta.id !== 0) {
      back();
    }

  }, [usuarioResposta]);

  function back() {
    navigate("/login");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      try {
        await cadastrarUsuario(
          `/usuarios/cadastrar`,
          usuario,
          setUsuarioResposta
        );
        ToastAlerta("Usuário cadastrado com sucesso", "sucesso");
      } catch (error) {
        ToastAlerta("Erro ao cadastrar o Usuário", "erro");
      }
    } else {
      ToastAlerta(
        "Dados inconsistentes. Verifique as informações de cadastro.",
        "erro"
      );
      setUsuario({ ...usuario, senha: "" });
      setConfirmaSenha("");
    }
  }

  return (
    <div className="bg-[url('https://img.freepik.com/fotos-premium/mao-segurando-soja-com-platation-e-o-ceu-no-horizonte-e-detalhes-em-macro_44762-1027.jpg?w=740')] bg-cover bg-no-repeat h-screen flex justify-center items-center flex-col">
      <Link
        className="rounded-3xl font-semibold uppercase font-sans text-black w-1/6 py-2 flex justify-center mb-10 "
        to="/login"
      >
        <div className="mr-2"><ArrowLeft size={28} /></div>
        Retornar
      </Link>


      <div
        className="text-white bg-black bg-opacity-70
       w-1/3 rounded-2xl"
      >
        <form
          className="flex justify-center items-center flex-col p-5"
          onSubmit={cadastrarNovoUsuario}
        >
          <h2 className="text-4xl uppercase font-bold font-sans">
            Cadastre-se
          </h2>

          <div className="w-full my-1">
            <label htmlFor="nome" className="font-semibold text-white">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="text-black rounded-3xl outline-0 p-1.5 bg-white w-full"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="w-full my-1">
            <label htmlFor="usuario">E-mail</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              className="text-black rounded-3xl outline-0 p-1.5 bg-white w-full"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="w-full my-1">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              className="text-black rounded-3xl outline-0 p-1.5 bg-white w-full"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="w-full my-1">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              className="text-black rounded-3xl outline-0 p-1.5 bg-white w-full"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="w-full my-1">
            <label htmlFor="usuario">Tipo</label>
            <select className="text-black rounded-3xl outline-0 p-1.5 bg-white w-full cursor-pointer"
            onChange={e => {setUsuario({
              ...usuario,
              tipo: e.target.value,
            })}
          }
            >

            <option selected disabled>Selecionar</option>
            <option value="consumidor">Consumidor</option>
            <option value="produtor">Produtor</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-6 rounded-3xl bg-lime-400 hover:bg-lime-300 font-semibold uppercase font-sans text-black w-1/2 py-2 flex justify-center"
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
              <span>Cadastrar</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
