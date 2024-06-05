import { Plant } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

export default function Header() {

  const navigate = useNavigate()

  const { isAuthenticated, usuario, handleLogout } = useContext(AuthContext);

  function logout(){
    handleLogout()
        alert('o usuario foi desconectado!')
        navigate('/login')
    }

  return (


    <header>
      <div className="flex text- justify-center bg-[#587d33] text-white ">
        <nav className="flex justify-between py-6 mx-auto items-center container px-3">
          <div className="font-medium text-2xl flex items-center gap-1">
            <Plant />
            AGROCOMPARTILHA
          </div>

          <ul className="flex gap-3 items-center text-sm">
            <li>
              <Link to="/"> Home</Link>
            </li>
            <li>
              <Link to="/sobre">Sobre nós</Link>
            </li>
            <li>
              <Link to="/contato">Contato</Link>
            </li>
            <li>
              <Link to="/produtos">Listar produtos</Link>
            </li>
            <li>
              <Link to="/perfil">Perfil</Link>
            </li>
          </ul>
          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="px-6 py-1 bg-white rounded-full text-black"
              >
                Login
              </Link>
            ) : (
              <button
                className="px-5 py-1 bg-white rounded-full text-black"
                onClick={handleLogout}
              >
                Sair
              </button>
            )}
            {!isAuthenticated ? (
              <Link
                to="/pre-cadastro"
                className="px-5 py-1 bg-white rounded-full text-black"
              >
                Cadastre-se
              </Link>
            ) : (
              ""
            )}
          </div>
        </nav>
      </div>
      <div className="bg-white container flex px-8 py-2 gap-4">
        <Link
          to="/categorias"
          className="bg-[#587d33] px-4 py-1 rounded-full text-white font-medium"
        >
          Categorias
        </Link>
        <Link
          to="/produtos"
          className="bg-[#587d33] px-4 py-1 rounded-full text-white font-medium"
        >
          Produtos
        </Link>
      </div>
    </header>
  );
}
