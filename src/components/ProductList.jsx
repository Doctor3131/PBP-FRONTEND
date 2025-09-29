import ProductCard from "./ProductCard";

export default function ProductList({ products, onDelete, onUpdateStock }) {
  if (products.length === 0) {
    return <p className="no-products">Produk tidak ditemukan</p>;
  }

  return (
    <div className="product-list">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onDelete={onDelete}
          onUpdateStock={onUpdateStock}
        />
      ))}
    </div>
  );
}
