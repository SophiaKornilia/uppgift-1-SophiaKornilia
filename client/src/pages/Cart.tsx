import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const Cart = () => {
  const { cart } = useCart();

  return (
    <div>
      <div>
        <button>
          <Link to="/CheckOut">Check out</Link>
        </button>
        {/* mapa igenom produkterna */}
        <h2>Cart items</h2>
        {cart.map((cartItem) => (
          <div className="product-card" key={cartItem.product._id}>
            <img
              className="product-image"
              src={cartItem.product.image}
              alt={cartItem.product.name}
            />
            <h3>{cartItem.product.name} </h3>
            <p>{cartItem.product.price}sek</p>
          </div>
        ))}
      </div>
    </div>
  );
};
