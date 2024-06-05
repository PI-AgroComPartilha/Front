import { Link } from "react-router-dom";


function PreCadastro() {
  return (
    <div className="h-screen flex justify-center w-full">

     <div className="bg-[url('https://img.freepik.com/fotos-premium/jovem-sorridente-trabalhando-em-uma-estufa_23-2149072029.jpg?w=740')] bg-cover bg-no-repeat w-1/2 h-screen flex justify-center items-center">
      <Link className="mt-6 rounded-3xl bg-white hover:bg-lime-300 font-semibold uppercase font-sans text-black w-1/4 py-2 flex justify-center" to="/cadastro">
        <button
        type="submit">Consumidor
        </button>
        </Link>        
     </div>

     <div className="text-white bg-black bg-opacity-70 rounded absolute uppercase text-5xl mt-12 p-8 font-bold ">
        Cadastre-se Aqui
      </div>

     <div className="bg-[url(https://img.freepik.com/fotos-premium/agronomo-inspecionando-as-culturas-de-soja-crescendo-no-campo-agricola-conceito-de-producao-agricola-jovem-agronomo-examina-a-cultura-de-soja-no-campo-no-verao-agricultor-no-campo-de-soja_255667-31707.jpg?w=740)] bg-cover bg-no-repeat w-1/2 h-screen flex justify-center items-center ">
     <Link className="mt-6 rounded-3xl bg-white hover:bg-lime-300 font-semibold uppercase font-sans text-black w-1/4 py-2 flex justify-center" to="/cadastro">
        <button
        type="submit"
        >Produtor
        </button>
        </Link>
     </div>
    </div>
  );
}

export default PreCadastro;
