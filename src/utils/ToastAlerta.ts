import { toast } from "react-toastify";

const progressBarStyle = {
  backgroundColor: "#386641",
};

export function ToastAlerta(mensagem: string, tipo: string) {
  switch (tipo) {
    case "sucesso":
      toast.success(mensagem, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: { background: "#white", color: "black" },
        progressStyle: progressBarStyle,
      });
      break;

    case "erro":
      toast.error(mensagem, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: { background: "#white", color: "black" },
        progress: undefined,
      });
      break;

    case "info":
    default:
      toast.info(mensagem, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: { background: "#white", color: "black" },
        progress: undefined,
      });
      break;
  }
}
