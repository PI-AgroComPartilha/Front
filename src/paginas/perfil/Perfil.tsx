import { useContext, useEffect } from "react";

import { AuthContext } from "../../contexts/AuthContext";

function Perfil() {
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
    }
  }, [usuario.token]);

  /* function validarUsuario() {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
    [usuario.token];
  } */

  return (
    <div className="container mx-auto m-4 rounded-2xl overflow-hidden min-h-[calc(100vh-160px)]">
      <img
        className="w-full h-72 object-cover border-b-8 border-white"
        src="https://i.imgur.com/ZZFAmzo.jpg"
        alt="Capa do Perfil"
      />

      <img
        className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10"
        src={usuario.foto}
        alt={`Foto de perfil de ${usuario.nome}`}
      />

      <div
        className="relative mt-[-6rem] h-72 flex flex-col 
                bg-[#587d33] text-white text-2xl items-center justify-center"
      >
        <p>{usuario.nome} </p>
        <p>{usuario.tipo}</p>
      </div>
    </div>
  );
}

export default Perfil;
