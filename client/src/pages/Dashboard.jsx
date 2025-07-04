import { useEffect, useState } from "react";
import axios from "../api/axios"; 
import ProductCard from "../components/ProductCard";
import CartBar from "../components/CartBar";
import CartPopup from "../components/CartPopup";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios.get("/product").then((res) => setProducts(res.data.products));
  }, []);

  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold mb-4">Best Seller Items</h1>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

      <CartBar
        onDetailsClick={() => setShowPopup(true)}
      />
      {showPopup && <CartPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
