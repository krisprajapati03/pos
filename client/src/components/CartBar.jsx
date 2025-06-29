import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setPaymentMode } from "../redux/cartSlice";
import TableSelector from "./TableSelector";
import axios from "../api/axios";
import { toast } from "react-toastify";


export default function CartBar({ onDetailsClick }) {
  const dispatch = useDispatch();
  const { items: cartItems, paymentMode } = useSelector((s) => s.cart);

  const [showTablePopup, setShowTablePopup] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const total = cartItems.reduce((sum, item) => sum + item.sellingPrice * item.qty, 0);

  const handleKotClick = () => {
    if (!selectedTable) return setShowTablePopup(true);
    submitKot(selectedTable);
  };

  const submitKot = async (table) => {
    try {
      const kotBody = {
        tableId: table?._id,
        note: "",
        orderItems: cartItems.map(i => ({
          productId: i._id,
          name: i.name,
          qty: i.qty,
        })),
      };

      await axios.post("/kot", kotBody);

      if (table) {
        await axios.put(`/table/${table._id}`, {
          status: "reserved"
        });
      }

      dispatch(clearCart());
      toast.success("KOT created successfully");
      setShowTablePopup(false);
      setSelectedTable(null);
    } catch (err) {
      toast.error("Failed to create KOT");
    }
  };

  const handleBillClick = async () => {
    try {
      const res = await axios.post("/bill", {
        billNumber: "AUTO",
        date: new Date(),
        products: cartItems.map(i => ({
          productId: i._id,
          qty: i.qty,
          sellingPrice: i.sellingPrice,
          total: i.qty * i.sellingPrice,
        })),
        totalAmount: total,
        paymentMode,
        tax: 0,
        paidAmount: total,
      });

      if (selectedTable) {
        await axios.put(`/table/${selectedTable._id}`, {
          status: "available",
          currentBillId: res.data._id,
        });
      }

      dispatch(clearCart());
      toast.success("Bill created successfully");
    } catch (err) {
      toast.error("Failed to create bill");
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 shadow flex flex-col items-center sm:flex-row sm:justify-between z-40">
        <div className="font-bold text-lg">Total: ₹{total}</div>

        <div className="flex gap-2 mt-2 sm:mt-0">
          {["Cash", "UPI"].map((mode) => (
            <button
              key={mode}
              onClick={() => dispatch(setPaymentMode(mode))}
              className={`rounded px-3 py-1 text-sm ${paymentMode === mode ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              {mode}
            </button>
          ))}

          <button onClick={onDetailsClick} className="border px-3 py-1 rounded">Details</button>
          <button onClick={handleKotClick} className="bg-purple-600 text-white px-3 py-1 rounded">KOT</button>
          <button onClick={handleBillClick} className="bg-green-600 text-white px-3 py-1 rounded">Bill</button>
        </div>
      </div>

      {showTablePopup && (
        <TableSelector
          onClose={() => setShowTablePopup(false)}
          onSelect={(table) => {
            setSelectedTable(table);
            submitKot(table);
          }}
        />
      )}
    </>
  );
}
