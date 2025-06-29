// import CartDrawer from "../../components/CartDrawer";
// import { useSelector, useDispatch } from "react-redux";
// import { createBill } from "../../api/bill";
// import { clearCart } from "../../redux/cartSlice";

// export default function BillingPage() {
//   const items = useSelector(state => state.cart.items);
//   const dispatch = useDispatch();

//   const handleBill = async () => {
//     const total = items.reduce((sum,i)=>sum + i.sellingPrice * i.qty, 0);
//     await createBill({
//       billNumber: `BILL-${Date.now()}`,
//       date: new Date().toISOString().slice(0,10),
//       products: items.map(i=>({
//         productId: i.productId,
//         qty: i.qty,
//         sellingPrice: i.sellingPrice,
//         total: i.sellingPrice * i.qty
//       })),
//       totalAmount: total,
//       paymentMode: "Cash",
//       tax: 0,
//       paidAmount: total
//     });
//     dispatch(clearCart());
//     alert("Bill created!");
//   };

//   return <CartDrawer onBill={handleBill} />;
// }
import React from 'react'

function BillingPage() {
  return (
    <div>BillingPage</div>
  )
}

export default BillingPage