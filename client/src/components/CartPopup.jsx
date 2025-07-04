import { useSelector } from "react-redux";

export default function CartPopup({ onClose }) {
  const { items } = useSelector((s) => s.cart);
  const total = items.reduce((sum, item) => sum + item.sellingPrice * item.qty, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
          aria-label="Close"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">🛒 Cart Details</h2>
        <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto mb-4">
          {items.length === 0 ? (
            <li className="py-8 text-center text-gray-400">Your cart is empty.</li>
          ) : (
            items.map((item) => (
              <li key={item._id} className="flex justify-between items-center py-3">
                <div>
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="ml-2 text-sm text-gray-500">x {item.qty}</span>
                </div>
                <span className="font-semibold text-gray-800">₹{item.qty * item.sellingPrice}</span>
              </li>
            ))
          )}
        </ul>
        <div className="flex justify-between items-center text-lg font-bold text-gray-900 border-t pt-4">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 transition text-white rounded-lg py-2 font-semibold shadow"
        >
          Close
        </button>
      </div>
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95);}
          to { opacity: 1; transform: scale(1);}
        }
      `}</style>
    </div>
  );
}
