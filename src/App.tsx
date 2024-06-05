import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeletarCategoria from "./components/categorias/deletarCategoria/DeletarCategoria";
import FormCategoria from "./components/categorias/formCategoria/FormCategoria";
import ListarCategorias from "./components/categorias/listarcategorias/ListarCategorias";
import Contato from "./components/contato";
import DeletarProduto from "./components/produtos/deletarProduto/DeletarProduto";
import FormularioProduto from "./components/produtos/formProduto/FormProduto";
import Login from "./paginas/login/Login";
import Produtos from "./paginas/produtos";
import { ProtectedRoute } from "./services/ProtectedRoute";
import Cadastro from "./paginas/cadastro/Cadastro";
import Header from "./components/header";
import Home from "./paginas/home";
import Footer from "./components/footer";
import { AuthProvider } from "./contexts/AuthContext";
import Sobre from "./paginas/sobre";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Perfil from "./paginas/perfil/Perfil";
import Cart from "./components/carrinho/cart";
import { CartProvider } from "./contexts/CardContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastContainer />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/categorias"
              element={
                <ProtectedRoute>
                  <ListarCategorias />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cadastrarCategoria"
              element={
                <ProtectedRoute>
                  <FormCategoria />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editarCategoria/:id"
              element={
                <ProtectedRoute>
                  <FormCategoria />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deletarCategoria/:id"
              element={
                <ProtectedRoute>
                  <DeletarCategoria />
                </ProtectedRoute>
              }
            />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/cadastrarproduto" element={<FormularioProduto />} />
            <Route path="/editarproduto/:id" element={<FormularioProduto />} />
            <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
