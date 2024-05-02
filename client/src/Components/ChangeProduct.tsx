// import { useEffect, useState } from "react";
// import "../index.css";

// interface IProduct {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
// }
// export const ChangeProduct = () => {
//   /* 
//     1. Lista alla produkter
//     2. Knapp - ändra produkt (sparar ner id i ett state)
//     3. Välj vilka fält du vill ändra
//     4. Skicka iväg - post fetch
//     */

//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [showChangeData, setShowChangeData] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/products");
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products", error);
//       }
//     };
//     fetchData();
//   }, []);
//   const handleChangeProduct = (productId: string) => {
//     console.log(productId);
//     setShowChangeData(true);
//   };

//   const handleChange = () => {
//     return <h1>hello</h1>;
//   };

//   return (
//     <div>
//       {showChangeData ? (
//         <div>
//           <h4>Insert new product here</h4>
//           <label>Name</label>
//           <input onChange={handleChange} name="name" id="name" type="text" />
//           <label>Status</label>
//           <input
//             onChange={handleChange}
//             name="status"
//             id="status"
//             type="text"
//           />
//           <label>Description</label>
//           <input
//             onChange={handleChange}
//             name="description"
//             id="description"
//             type="text"
//           />
//           <label>Image URL</label>
//           <input
//             onChange={handleChange}
//             name="imageUrl"
//             id="imageUrl"
//             type="text"
//           />
//           <label>AmountInStock</label>
//           <input
//             onChange={handleChange}
//             name="amountInStock"
//             id="amountInStock"
//             type="number"
//           />
//           <label>Price</label>
//           <input
//             onChange={handleChange}
//             name="price"
//             id="price"
//             type="number"
//           />
//           <button>Create</button>
//         </div>
//       ) : null}
//       <div>
//         {/* mapa igenom produkterna */}
//         {products.map((product) => (
//           <div className="product-card" key={product._id}>
//             <img
//               className="product-image"
//               src={product.image}
//               alt={product.name}
//             />
//             <h3>{product.name} </h3>
//             <p>{product.price}sek</p>
//             <button
//               onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
//                 handleChangeProduct(product._id)
//               }
//             >
//               Change product
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
