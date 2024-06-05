import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsuarioLogin } from "../../models/models";
import { RotatingLines } from "react-loader-spinner";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

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

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="bg-[url('https://img.freepik.com/fotos-gratis/agricultor-agronomo-senior-trabalhador-no-campo-de-soja-verificando-as-colheitas-antes-da-colheita_342744-1260.jpg?t=st=1717550552~exp=1717554152~hmac=210e409d4b522f15538b3b1106fbffc95225aaa5e57b3f5ab0dc3c4c8c954859&w=740')] bg-cover bg-no-repeat h-screen flex justify-center items-center">
      <div className="text-white bg-black bg-opacity-70
       w-1/4 h-1/2 rounded-2xl">
        <form
          className="flex justify-center items-center flex-col p-5"
          onSubmit={login}
        >
          <h2 className="text-4xl uppercase font-bold font-sans">Login</h2>
          <div className="w-full my-3">
            <label htmlFor="usuario" className="font-semibold text-white">E-mail</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              className="text-black rounded-3xl outline-0 p-1.5 bg-white w-full"
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="w-full">
            <label htmlFor="senha" className="font-semibold text-white">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              className="text-black rounded-3xl outline-0 p-1.5 bg-white w-full"
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
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
            <Link to="/cadastro" className="text-lime-400 hover:text-lime-300">
              Cadastre-se
            </Link>
          </p>
          </div>
        </form>
        <div className="fundoLogin hidden lg:block"></div>
      </div>
    </div>
  );
}

export default Login;
