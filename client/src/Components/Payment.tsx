import { useCart } from "../context/CartContext";
import "../index.css";

export const Payment = () => {
  const { cart } = useCart();

  return (
    <div>
      <div>
        <button id="myBtn">Cart</button>
      </div>
    </div>
  );
};

{
  /* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>My Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* mapa igenom produkterna */
}
//       {cart.map((cartItem) => (
//         <div className="product-card" key={cartItem.product._id}>
//           <img
//             className="product-image"
//             src={cartItem.product.image}
//             alt={cartItem.product.name}
//           />
//           <h3>{cartItem.product.name} </h3>
//           <p>{cartItem.product.price}sek</p>
//         </div>
//       ))}
//     </div>
//   </Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={handleClose}>
//       Close
//     </Button>
//   </Modal.Footer>
// </Modal> */}
