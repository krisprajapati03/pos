import { useSelector } from "react-redux";

export default function CartPopup({ onClose }) {
  const { items } = useSelector((s) => s.cart);
  const total = items.reduce((sum, item) => sum + item.sellingPrice * item.qty, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-2">Cart Details</h2>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item._id} className="flex justify-between">
              <span>{item.name} x {item.qty}</span>
              <span>₹{item.qty * item.sellingPrice}</span>
            </li>
          ))}
        </ul>
        <hr className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        <button onClick={onClose} className="mt-4 w-full bg-red-500 text-white rounded py-1">Close</button>
      </div>
    </div>
  );
}
