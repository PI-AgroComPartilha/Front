import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./paginas/home/home.css"

import { register } from "swiper/element/bundle";

register();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <App />
);
