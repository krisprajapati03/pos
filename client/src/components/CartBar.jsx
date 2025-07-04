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
    if (cartItems.length === 0) return toast.warn("Cart is empty");
    if (!selectedTable) return setShowTablePopup(true);
    submitKot(selectedTable);
  };

  const submitKot = async (table) => {
    try {
      const kotBody = {
        tableId: table?._id,
        note: "",
        paymentMode,
        orderItems: cartItems.map(i => ({
          productId: i._id,
          name: i.name,
          qty: i.qty,
        })),
      };

      await axios.post("/kot", kotBody);

      if (table) {
        await axios.put(`/table/${table._id}`, { status: "reserved" });
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
    if (cartItems.length === 0) return toast.warn("Cart is empty");

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
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-50 to-purple-50 border-t p-4 shadow-lg flex flex-col items-center sm:flex-row sm:justify-between z-40 transition-all">
        <div className="flex items-center gap-3">
          <span className="font-bold text-xl text-gray-800 tracking-wide">
            Total: <span className="text-green-600">₹{total}</span>
          </span>
          {selectedTable && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
              Table: {selectedTable.name}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-3 sm:mt-0 flex-wrap justify-center">
          <div className="px-24">
            <button
            onClick={onDetailsClick}
            className="border border-gray-300 px-4 py-2 rounded-full text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 transition"
            >
              Details
            </button>
          </div>

          <div className="pr-12">
            {/* Payment Mode Toggle */}
            {["Cash", "UPI"].map((mode) => (
              <button
                key={mode}
                onClick={() => dispatch(setPaymentMode(mode))}
                className={`rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-150 ${
                  paymentMode === mode
                    ? "bg-blue-600 text-white scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          
          <button
            onClick={handleKotClick}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm transition"
          >
            KOT
          </button>
          <button
            onClick={handleBillClick}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm transition disabled:opacity-50"
            disabled={cartItems.length === 0}
          >
            Bill
          </button>
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
