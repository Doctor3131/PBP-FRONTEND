import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";
import AddProductButton from "../components/AddProductButton";
import AddProductModul from "../components/AddProductModul";
import "../assets/index.css";
import pic1 from "../assets/pic1.jpeg";
import pic2 from "../assets/pic2.jpeg";
import pic3 from "../assets/pic3.jpeg";
import ProfileButton from "../components/ProfileButton";


export default function DashboardAdmin() {
  const [products, setProducts] = useState([
    { id: 1, name: "Keyboard", stock: 10, image: pic1, description: "Keyboard USB standar dengan desain simpel dan tombol responsif, cocok untuk kebutuhan kerja, belajar, dan penggunaan harian.", price : 150000},
    { id: 2, name: "Mouse", stock: 5, image: pic2, description: "Mouse optik berkabel dengan desain ergonomis dan sensor presisi, ideal untuk aktivitas kerja, belajar, dan penggunaan harian.", price : 100000},
    { id: 3, name: "Bundle Keyboard + Mouse Gaming", stock: 7, image: pic3, description: "Bundle Keyboard dan Mouse Gaming dengan desain ergonomis, pencahayaan RGB, dan respons tinggi untuk pengalaman bermain yang maksimal.", price : 225000},
  ]);
  const [search, setSearch] = useState("");
  const [showModul, setShowModul] = useState(false);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleUpdateStock = (id, delta) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      )
    );
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <ProfileButton />
      <h1 className="title">Dashboard Produk</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <ProductList
        products={filteredProducts}
        onDelete={handleDelete}
        onUpdateStock={handleUpdateStock}
      />
      <AddProductButton onClick={() => setShowModul(true)} />
      {showModul && (
        <AddProductModul
          onClose={() => setShowModul(false)}
          onSubmit={handleAddProduct}
        />
      )}
    </div>
  );
}
