import {
  Basket,
  Carrot,
  Heart,
  Plant,
  Stairs,
  User,
} from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import { ToastAlerta } from "../../utils/ToastAlerta";

type SecoesType = {
  id: number;
  nome: string;
  path: string;
};

const secoes: SecoesType[] = [
  {
    id: 1,
    nome: "Home",
    path: "/",
  },
  {
    id: 2,
    nome: "Contato",
    path: "/contato",
  },
  {
    id: 3,
    nome: "Produtos",
    path: "/Produtos",
  },
];

export default function Header() {
  const navigate = useNavigate();

  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = document.getElementById("user-menu");

  const { isAuthenticated, usuario, handleLogout } = useContext(AuthContext);

  const [userMenu, setUserMenu] = useState(false);

  function logout() {
    handleLogout();
    ToastAlerta("O usuário foi desconectado com sucesso!", "info");
    navigate("/login");
    setUserMenu(false);
  }

  function toggleMenu() {
    setUserMenu(!userMenu);
  }

  /* TODO: implementar o  */
  useEffect(() => {
    menuId?.addEventListener("blur", toggleMenu);
    // document.body.addEventListener("mousedown", toggleMenu);
    return () => {
      menuId?.addEventListener("blur", toggleMenu);
      // document.body.removeEventListener("mousedown", toggleMenu);
    };
  }, [userMenu]);

  return (
    <header className="select-none">
      <div className="flex text- justify-center bg-[#587d33] text-white ">
        <nav className="flex justify-between py-6 mx-auto items-center container px-3">
          {/* NOSSO LOGO */}
          <Link to="/">
            <div className="font-medium text-2xl flex items-center gap-1">
              <Plant />
              AGROCOMPARTILHA
            </div>
          </Link>
          {/* NOSSAS SECÇÕES */}
          <ul className="flex gap-3 items-center text-base">
            {secoes.map((secao) => (
              <li
                key={secao.id}
                className="hover:underline hover:underline-offset-4"
              >
                <Link to={secao.path} onClick={() => setUserMenu(false)}>
                  {secao.nome}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              /* USUARIO LOGADO */
              <>
                <Link to="/carrinho">
                  <Basket size={36} weight="bold" />
                </Link>
                <div className="relative">
                  <User
                    size={36}
                    weight="bold"
                    className="cursor-pointer "
                    onClick={() => setUserMenu(!userMenu)}
                  />

                  {userMenu && (
                    <div
                      className="absolute right-0 z-50 mt-3 origin-top-right rounded-md bg-white py-1 shadow-lg w-fit ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      id="user-menu"
                      tabIndex={-1}
                      onBlur={() => setUserMenu(false)}
                      ref={menuRef}
                    >
                      <div className="block px-4 py-2 text-sm text-gray-700">
                        <Link
                          to="/perfil"
                          className="group block px-4 py-2 text-sm "
                          onClick={() => setUserMenu(false)}
                        >
                          <div className="flex items-center gap-2">
                            <User
                              size={32}
                              className="group-hover:fill-[#587d33]"
                            />
                            <p className=" text-lg text-gray-800">Perfil</p>
                          </div>
                        </Link>
                        <Link
                          to="/favoritos"
                          className="group block px-4 py-2 text-sm"
                          onClick={() => setUserMenu(false)}
                        >
                          <div className="flex items-center gap-2">
                            <Heart
                              size={32}
                              className="group-hover:fill-[#587d33]"
                            />
                            <p className=" text-lg text-gray-800">Favoritos</p>
                          </div>
                        </Link>
                        {usuario?.tipo === "produtor" && (
                          <Link
                            to="/minhaLoja"
                            className="group block px-4 py-2 text-sm"
                            onClick={() => setUserMenu(false)}
                          >
                            <div className="flex items-center gap-2">
                              <Carrot
                                size={32}
                                className="group-hover:fill-[#587d33]"
                              />
                              <p className=" text-lg text-gray-800 text-nowrap">
                                Minha Loja
                              </p>
                            </div>
                          </Link>
                        )}
                        {usuario?.tipo === "admin" && (
                          <Link
                            to="/categorias"
                            className="group block px-4 py-2 text-sm"
                            onClick={() => setUserMenu(false)}
                          >
                            <div className="flex items-center gap-2">
                              <Plant
                                size={32}
                                className="group-hover:fill-[#587d33]"
                              />
                              <p className=" text-lg text-gray-800 text-nowrap">
                                Categorias
                              </p>
                            </div>
                          </Link>
                        )}
                        <div
                          className="group block px-4 py-2 cursor-pointer"
                          onClick={logout}
                        >
                          <div className="flex items-center gap-2">
                            <Stairs
                              size={32}
                              className="group-hover:fill-[#587d33]"
                            />
                            <p className=" font-normal text-gray-800 text-lg">
                              Sair
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* USUARIO DESLOGADO */
              <>
                <Link
                  to="/login"
                  className="px-6 py-2 bg-white rounded-full text-black hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/cadastro"
                  className="px-5 py-2 bg-white rounded-full text-black
                  hover:bg-gray-100"
                >
                  Cadastre-se
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
