import { toast } from "react-toastify";

export function ToastAlerta(mensagem: string, tipo: string) {
  switch (tipo) {
    case "sucesso":
      toast.error(mensagem, {
        icon: "🚀",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: { background: "#white", color: "black" },
        progressStyle: { backgroundColor: "#386641" },
        progress: undefined,
      });
      break;
  
    case "erro":
      toast.error(mensagem,  {
        icon: "ℹ️",
       position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: { background: "#white", color: "black" },
        progressStyle: { backgroundColor: "#386641" },
        progress: undefined,
      });
      break;

    case "info":
    default:
      toast.error(mensagem, {
        icon: "❗",
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      style: { background: "#white", color: "black" },
      progressStyle: { backgroundColor: "#386641", width: "100%" }, // Estilizando o hideProgressBar para o tipo "info"
      progress: undefined
    });
    break;
  }
}
