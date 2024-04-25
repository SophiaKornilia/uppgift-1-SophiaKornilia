import { useEffect, useState } from "react";
import "../index.css";
interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        {/* mapa igenom produkterna */}
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
            />
            <h3>{product.name} </h3>
            <p>{product.price}sek</p>
            <button>Add to cart</button>
          </div>
        ))}
      </div>
    </>
  );
};
