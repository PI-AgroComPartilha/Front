import { useContext, useEffect, useState } from "react";
import { Categoria } from "../../../models/models";
// import CardCategoria from "../cardcategorias/CardCategoria";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { listar } from "../../../services/services";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListarCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

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

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);
  return (
    <>
      {categorias.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div
        className="
                bg-gray-200 
                flex 
                justify-center
                "
      >
        <div className="my-4 container flex flex-col">
          {categorias.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhuma categoria foi encontrada
            </span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* {categorias.map((categoria) => (
              <CardCategoria key={categoria.id} categoria={categoria} />
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListarCategorias;
