import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Shopify Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ddd", padding: 10 }}>
            <h3>{p.title}</h3>
            {p.image && <img src={p.image.src} alt={p.title} width="150" />}
            <p>{p.body_html?.replace(/<[^>]*>?/gm, "").slice(0, 80)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
