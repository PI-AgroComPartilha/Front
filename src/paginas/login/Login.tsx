import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsuarioLogin } from "../../models/models";
import { RotatingLines } from "react-loader-spinner";
import { AuthContext } from "../../contexts/AuthContext";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Login() {
  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  const loginForm = z.object({
    email: z.string().email("Insira um email valido"),
    senha: z.string().min(8),
  });

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/");
    }
  }, [usuario.token]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  async function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = loginForm.safeParse(usuarioLogin);

    if (result.success) {
      try {
        await handleLogin(usuarioLogin);
      } catch (error) {
        ToastAlerta(`E-mail ou senha incorretos.`, "erro");
      }
    } else {
      result.error.issues.map((error) => {
        ToastAlerta(`${error.path}: ${error.message}`, "error");
      });
    }
  }

  return (
    <>
      <Helmet>
        <title>Agrocompartilha | Login</title>
      </Helmet>
      <div className="bg-[url('https://img.freepik.com/fotos-gratis/agricultor-agronomo-senior-trabalhador-no-campo-de-soja-verificando-as-colheitas-antes-da-colheita_342744-1260.jpg?t=st=1717550552~exp=1717554152~hmac=210e409d4b522f15538b3b1106fbffc95225aaa5e57b3f5ab0dc3c4c8c954859&w=740')] bg-cover bg-no-repeat h-screen">
        <div className="container mx-auto flex items-center flex-col min-h-[80svh]">
          <div className="text-white bg-white/15 backdrop-blur-md my-[10vh] w-2/3 max-w-[500px] rounded-xl p-5">
            <form
              className="text-gray-800/85 txt-shadow flex justify-center items-center flex-col p-5"
              onSubmit={login}
            >
              <h2 className="text-4xl uppercase font-bold font-sans">Login</h2>
              <div className="relative z-0 w-full mt-5  group">
                <input
                  type="text"
                  id="usuario"
                  name="email"
                  required
                  className="block py-2 pl-2 px-0 w-full text-gray-900 bg-white rounded-xl border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                  value={usuarioLogin.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    atualizarEstado(e)
                  }
                  placeholder=" "
                />
                <label
                  htmlFor="nome"
                  className="pl-2 drop-shadow  font-medium peer-focus:font-medium absolute  text-gray-700  duration-300 transform -translate-y-6 scale-75 top-2.5  origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >
                  E-mail
                </label>
              </div>
              <div className="relative z-0 w-full mt-5  group">
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  minLength={8}
                  required
                  className="block py-2 pl-2 px-0 w-full text-gray-900 bg-white rounded-xl border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                  value={usuarioLogin.senha}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    atualizarEstado(e)
                  }
                  placeholder=" "
                />
                <label
                  htmlFor="senha"
                  className="pl-2 drop-shadow  font-medium peer-focus:font-medium absolute  text-gray-700  duration-300 transform -translate-y-6 scale-75 top-2.5  origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >
                  Senha
                </label>
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
                  <span>Entrar</span>
                )}
              </button>

              <div className="my-3 font-semibold">
                <p>
                  Não tem uma conta?{" "}
                  <Link
                    to="/cadastro"
                    className="text-lime-400 hover:text-lime-300"
                  >
                    Cadastre-se
                  </Link>
                </p>
              </div>
            </form>
            <div className="fundoLogin hidden lg:block"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
