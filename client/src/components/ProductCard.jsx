import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const item = useSelector((state) =>
    state.cart.items.find((i) => i._id === product._id)
  );

  return (
    <div className={`rounded-2xl p-4 shadow-lg transition-all duration-200 hover:scale-105 border ${item ? "bg-gradient-to-br from-green-100 to-green-50 border-green-300" : "bg-white border-gray-200"}`}>
      <div className="relative">
        <img
          src={product.imageURL}
          alt={product.name}
          className="h-32 w-full object-cover rounded-xl shadow-sm"
        />
        {item && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
            In Cart
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-base font-bold truncate text-gray-800">{product.name}</p>
        <p className="text-sm text-green-700 font-semibold mt-1">₹{product.sellingPrice}</p>
      </div>
      <div className="mt-4 flex justify-center items-center gap-3">
        {item ? (
          <>
            <button
              onClick={() => dispatch(removeFromCart(product._id))}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-white font-bold text-lg shadow"
              aria-label="Remove one"
            >
              −
            </button>
            <span className="font-semibold text-gray-700 text-lg">{item.qty}</span>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-full text-white font-bold text-lg shadow"
              aria-label="Add one"
            >
              +
            </button>
          </>
        ) : (
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-5 py-2 font-bold shadow transition"
            aria-label="Add to cart"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
