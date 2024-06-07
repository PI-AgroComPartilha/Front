import { useContext } from "react";
import { Money, ShoppingBagOpen } from "@phosphor-icons/react";
import CardCart from "../cardCarrinho";
import { CartContext, CartContextProps } from "../../../contexts/CardContext";
import { useNavigate } from "react-router-dom";

function Carrinho() {
  const { items, limparCart } = useContext(CartContext) as CartContextProps;
  const navigate = useNavigate();

  const valorTotal = items.reduce((acc, item) => acc + Number(item.preco), 0);
  return (
    <div className="min-h-screen bg-[#f5eedd] p-8">
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-5xl text-center font-bold  mb-8 text-[#587d33]">
          Carrinho 🧺
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((produto) => (
            <CardCart key={produto.id} item={produto} />
          ))}
        </div>

        {items.length === 0 ? (
          <h2 className="text-3xl text-center font-bold  mb-8 ">
            Você não tem items no carinho 😿
          </h2>
        ) : (
          <div className="mt-12 bg-[#E8E8E8] p-6 rounded-lg">
            <h2 className="text-2xl mb-6 text-[#587d33] font-semibold">
              Resumo do Pedido
            </h2>
            <div className="flex justify-between items-center text-lg mb-6">
              <span className="flex items-center text-[#BC4749] font-medium">
                <ShoppingBagOpen size={24} className="mr-2" />
                Total Itens:
              </span>
              <span className="text-[#BC4749] font-semibold">
                {items.length}
              </span>
            </div>
            <div className="flex justify-between items-center text-lg mb-6">
              <span className="flex items-center text-[#BC4749] font-medium">
                <Money size={24} className="mr-2" />
                Valor Total:
              </span>
              <span className="text-[#BC4749] font-semibold">
                {" "}
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(valorTotal)}
              </span>
            </div>
            <div className="flex justify-center">
              <button
                className="flex items-center justify-center rounded-full bg-[#BC4749] text-white py-3 px-6 hover:bg-red-600 transition-all duration-300 focus:outline-none"
                type="submit"
                disabled={items.length === 0}
                onClick={() => {
                  limparCart();
                  navigate("/");
                }}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrinho;
