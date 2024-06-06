import { useContext, useEffect, useState } from "react";
import { Categoria } from "../../../models/models";
// import CardCategoria from "../cardcategorias/CardCategoria";
import { Link, useNavigate } from "react-router-dom";
import { listar } from "../../../services/services";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardCategoria from "../cardcategorias/CardCategoria";

function ListarCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");

  let navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
  }, [token]);

  async function buscarCategorias() {
    try {
      await listar("/categorias", setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        ToastAlerta("O token expirou, favor logar novamente", "info");
        handleLogout();
      }
    }
  }

  const handleFiltrarCategorias = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroCategoria(e.target.value);
  };

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

  const categoriasFiltrada = categorias.filter((categoria) => {
    return categoria.tipo.toLowerCase().includes(filtroCategoria.toLowerCase());
  });

  return (
    <div
      className="
                bg-gray-200 
                flex flex-col
                px-5
                justify-center
                min-h-[80vh]
                "
    >
      <div
        className={
          "my-10 bg-[#587d33]  flex w-full bg-opacity-50 backdrop-blur-sm  dark:bg-opacity-30 py-3 px-5 mb-10   flex-col md:flex-row items-center rounded-xl "
        }
      >
        <div className="flex w-full gap-4">
          <input
            type="text"
            placeholder="Pesquisar por produto"
            value={filtroCategoria}
            onChange={handleFiltrarCategorias}
            className="border-slate-800 rounded-xl bg-white w-full hidden md:block mx-auto px-3 py-2 duration-300"
          />
          {(usuario.tipo === "vendedor" ||
            usuario.tipo === "administrador") && (
            <Link to="/cadastrarCategoria">
              <button
                className={`p-2 border-3 rounded-lg text-nowrap w-full  border-black dark:border-white font-semibold bg-[#587d33] text-white hover:bg-[#4d702a] `}
                style={{ fontSize: "15px" }}
              >
                Cadastrar Nova Categoria
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="my-4 container flex flex-col mx-auto">
        {categorias.length === 0 && (
          <span className="text-3xl text-center my-8">
            Nenhuma categoria foi encontrada
          </span>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoriasFiltrada.map((categoria) => (
            <CardCategoria key={categoria.id} categoria={categoria} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListarCategorias;
