import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CardCart from "../cardCart";
import { CartContext, CartContextProps } from "../../../contexts/CardContext";

function Cart() {
  const navigate = useNavigate();

  const { items, limparCart, quantidadeItems } = useContext(
    CartContext
  ) as CartContextProps;

  console.log(items);
  return (
    <div
      className="
                bg-gray-200 
                flex 
                flex-col
                justify-center
                "
    >
      <h1 className="text-4xl text-center my-4">Carrinho de Compras</h1>
      <h2 className="text-2xl text-center my-4">
        {quantidadeItems === 0 ? "O Carrinho está vazio!" : ""}
      </h2>
      <div
        className="container mx-auto my-4 grid grid-cols-1 
                            md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {items.map((produto) => (
          <CardCart key={produto.id} item={produto} />
        ))}
      </div>

      <button
        className="rounded text-slate-100 bg-slate-400 
          hover:bg-slate-800 w-1/4 py-2 mx-auto flex justify-center"
        type="submit"
        disabled={items.length === 0 ? true : false}
        onClick={limparCart}
      >
        Finalizar Compra
      </button>
    </div>
  );
}

export default Cart;
