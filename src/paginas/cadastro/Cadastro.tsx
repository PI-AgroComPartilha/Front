import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../../services/services";
import { Usuario, CriarUsuario } from "../../models/models";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { z } from "zod";
import { Helmet } from "react-helmet";

function Cadastro() {
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [usuario, setUsuario] = useState<CriarUsuario>({
    nome: "",
    usuario: "",
    senha: "",
    confirmarSenha: "",
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

  const cadastroFormSchema = z.object({
    nome: z.string().min(3).regex(/[A-Za-z]/gi, "Apenas letras são permitidas"),
    usuario: z.string().email("Escreva um email valido"),
    senha: z.string().min(8, "Sua senha deve ter no minimo 8 caracteres"),
    confirmarSenha: z.string().min(8, "blablabla"),
    foto: z.string().url("Deve ser uma url valida para uma foto"),
    tipo: z.string(),
  }).superRefine(({ confirmarSenha, senha }, ctx) => {
    if (confirmarSenha !== senha) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não correspondem",
        path: ['confirmaSenha']
      })
    }
  })

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const result = cadastroFormSchema.safeParse(usuario);
    const usuarioData = {
      nome: usuario.nome,
      usuario: usuario.usuario,
      senha: usuario.senha,
      tipo: usuario.tipo,
      foto: usuario.foto,
      prudutos: usuario.produtos
    }

    if (result.success) {
      try {
        await cadastrarUsuario(
          `/usuarios/cadastrar`,
          usuarioData,
          setUsuarioResposta
        );
        ToastAlerta("Usuário cadastrado com sucesso", "sucesso");
      } catch (error) {
        ToastAlerta(`${error}`, "erro");
      }
    } else {
      result.error.issues.map((error) => {
        ToastAlerta(`${error.path}: ${error.message}`, "error")
      })

    }
    setIsLoading(false);
  }

  return (
    <>
    <Helmet>
      <title>Agrocompartilha | Cadastre-se</title>
    </Helmet>
      <div className=" bg-[url('https://img.freepik.com/fotos-premium/mao-segurando-soja-com-platation-e-o-ceu-no-horizonte-e-detalhes-em-macro_44762-1027.jpg?w=740')] bg-cover bg-no-repeat h-screen ">
        <div className="container mx-auto flex items-center flex-col min-h-[80svh]">
          <div
            className="text-gray-800/80 bg-white/15 backdrop-blur-md my-[10vh] w-2/3 max-w-[500px] rounded-xl p-5"
          >
            <form
              className="flex justify-center items-center flex-col p-5"
              onSubmit={cadastrarNovoUsuario}
            >
              <h2 className="text-4xl uppercase font-bold font-sans">
                Cadastre-se
              </h2>

              <div className="relative z-0 w-full mb-3 mt-5  group">
                <input
                  required
                  type="text"
                  id="nome"
                  name="nome"
                  className="block py-2.5 pl-2 px-0 w-full text-gray-900 bg-white rounded-xl border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                  value={usuario.nome}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    atualizarEstado(e)
                  }
                  placeholder=" "
                />
                <label htmlFor="nome" className="pl-2 drop-shadow  font-medium peer-focus:font-medium absolute  text-gray-700  duration-300 transform -translate-y-6 scale-75 top-2.5  origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                  Nome
                </label>
              </div>
              <div className="relative z-0 w-full my-3  group">
                <input
                  required
                  type="email"
                  id="usuario"
                  name="usuario"
                  className="block py-2.5 pl-2 px-0 w-full text-gray-900 bg-white rounded-xl border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                  value={usuario.usuario}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    atualizarEstado(e)
                  }
                  placeholder=" "
                />
                <label htmlFor="usuario" className="pl-2 drop-shadow  font-medium  peer-focus:font-medium absolute  text-gray-700  duration-300 transform -translate-y-6 scale-75 top-2.5  origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">E-mail</label>
              </div>
              <div className="relative z-0 w-full my-3  group">
                <input
                  required
                  type="text"
                  id="foto"
                  name="foto"
                  className="block py-2.5 pl-2 px-0 w-full text-gray-900 bg-white rounded-xl border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                  value={usuario.foto}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    atualizarEstado(e)
                  }
                  placeholder=" "
                />
                <label htmlFor="foto" className="pl-2 drop-shadow  font-medium  peer-focus:font-medium absolute  text-gray-700  duration-300 transform -translate-y-6 scale-75 top-2.5  origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Foto</label>
              </div>
              <div className="relative z-0 w-full my-3  group">
                <select
                  className="block py-2.5 px-1 w-full text-gray-700 font-medium drop-shadow bg-white rounded-xl border-2 border-gray-200  focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                  onChange={(e) => {
                    setUsuario({
                      ...usuario,
                      tipo: e.target.value,
                    });
                  }}
                  required
                  aria-required
                >
                  <option selected disabled>
                    Tipo
                  </option>
                  <option value="cliente" >Consumidor</option>
                  <option value="vendedor">Produtor</option>
                </select>
              </div>
              <div className="relative z-0 w-full my-3  group">
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  required
                  className="block py-2.5 pl-2 px-0 w-full text-gray-900 bg-white rounded-xl border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                  value={usuario.senha}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    atualizarEstado(e)
                  }
                  placeholder=" "
                />
                <label htmlFor="senha" className="pl-2 txt-shadow text-sm font-bold  peer-focus:font-medium absolute  text-gray-700  duration-300 transform -translate-y-6 scale-75 top-2.5  origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Senha</label>
              </div>
              <div className="relative z-0 w-full my-3  group">
                <input
                  required
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  className="block py-2.5 pl-2 px-0 w-full text-gray-900 bg-white rounded-xl border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                  value={usuario.confirmarSenha}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    atualizarEstado(e)
                  }
                  placeholder=" "
                />
                <label htmlFor="senha" className="pl-2 txt-shadow text-sm font-bold  peer-focus:font-medium absolute  text-gray-700  duration-300 transform -translate-y-6 scale-75 top-2.5  origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Confirmar senha</label>
              </div>
              <button
                type="submit"
                className="mt-3 rounded-3xl bg-lime-400 hover:bg-lime-300 font-semibold uppercase font-sans text-black w-1/2 py-2 flex justify-center"
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
      </div>
    </>
  );
}

export default Cadastro;
