import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const item = useSelector((state) =>
    state.cart.items.find((i) => i._id === product._id)
  );

  return (
    <div className={`rounded-xl p-2 shadow ${item ? "bg-green-100" : "bg-white"}`}>
      <img src={product.imageURL} alt={product.name} className="h-20 w-full object-cover rounded-md" />
      <p className="mt-2 text-sm font-semibold truncate">{product.name}</p>
      <p className="text-xs text-green-600 font-bold">₹{product.sellingPrice}</p>

      <div className="mt-2 flex justify-center items-center gap-2">
        {item ? (
          <>
            <button onClick={() => dispatch(removeFromCart(product._id))} className="bg-red-500 px-2 rounded text-white">-</button>
            <span>{item.qty}</span>
            <button onClick={() => dispatch(addToCart(product))} className="bg-green-500 px-2 rounded text-white">+</button>
          </>
        ) : (
          <button onClick={() => dispatch(addToCart(product))} className="bg-purple-600 text-white rounded-full px-3 py-1">+</button>
        )}
      </div>
    </div>
  );
}
