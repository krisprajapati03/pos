// KotPage.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../../api/product";
import ProductCard from "../../components/ProductCard";

export default function KotPage() {
  const [products, setProducts] = useState([]);
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    getProducts().then(res => setProducts(res.data.products));
  }, []);

  const totalQty = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const totalAmount = cartItems.reduce((sum, i) => sum + (i.sellingPrice * i.qty), 0);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Best Seller Items</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-3 border-t shadow-md flex justify-between items-center">
        <div className="text-lg font-semibold">Total: ₹{totalAmount} ({totalQty} items)</div>
        <div className="space-x-2">
          <button className="bg-purple-600 text-white px-4 py-1 rounded">KOT</button>
          <button className="bg-green-600 text-white px-4 py-1 rounded">Bill</button>
        </div>
      </div>
    </div>
  );
}
