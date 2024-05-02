import React, { useEffect, useState } from "react";
import "../index.css";
import { ShowOrders } from "../Components/ShowOrders";
// import { ChangeProduct } from "../Components/ChangeProduct";

interface IProduct {
  _id: string;
  name: string;
  status: string;
  description: string;
  price: number;
  image: string;
  amountInStock: number;
}

export const AdminPage = () => {
  //KATODO:lägg till produkt
  /* 
  1. Ta ut värdet av vad som skrivs i label
  2. Skicka värdet till backend
  */

  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [showInput, setShowInput] = useState(false);
  const [changeInput, setChangeInput] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    status: "",
    description: "",
    imageUrl: "",
    amountInStock: 0,
    price: 0,
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue =
      name === "amountInStock" || name === "price"
        ? parseInt(value, 10)
        : value;

    setProductData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  //KATODO: Lista alla produkter
  const handleClick = async () => {
    console.log(productData);

    if (
      productData.name === "" ||
      productData.status === "" ||
      productData.description === "" ||
      productData.imageUrl === "" ||
      productData.amountInStock === 0 ||
      productData.price === 0
    ) {
      console.log("Fyll i alla fält innan du registrerar.");
      alert("Fyll i alla fält innan du registrerar.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        console.log("Product created");
        //tömmer staten
        setProductData({
          name: "",
          status: "",
          description: "",
          imageUrl: "",
          amountInStock: 0,
          price: 0,
        });

        //tömmer inputvaluet
        const nameInput = document.getElementById("name") as HTMLInputElement;
        const statusInpus = document.getElementById(
          "status"
        ) as HTMLInputElement;
        const descriptionInput = document.getElementById(
          "description"
        ) as HTMLInputElement;
        const imageInput = document.getElementById(
          "imageUrl"
        ) as HTMLInputElement;
        const amountInput = document.getElementById(
          "amountInStock"
        ) as HTMLInputElement;
        const priceInput = document.getElementById("price") as HTMLInputElement;

        if (nameInput) nameInput.value = "";
        if (statusInpus) statusInpus.value = "";
        if (descriptionInput) descriptionInput.value = "";
        if (imageInput) imageInput.value = "";
        if (amountInput) amountInput.value = "0";
        if (priceInput) priceInput.value = "0";
      } else {
        alert("Registration failed");
        console.log("Registration failed");
      }
    } catch (error) {
      console.error("Something went wriong:", error);
    }
  };

  //KATODO:redigera produkt
  const handleChangeProduct = async (product: IProduct) => {
    console.log(product);
    setShowInput(true);
    setChangeInput(true);
    setSelectedProduct(product);
    setProductData({
      name: product.name,
      status: product.status,
      description: product.description,
      imageUrl: product.image,
      amountInStock: product.amountInStock,
      price: product.price,
    });
  };

  const confirmChangeProduct = async () => {
    if (selectedProduct) {
      console.log(selectedProduct._id);

      try {
        const response = await fetch(
          `http://localhost:3000/products/${selectedProduct._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
          }
        );

        if (response.ok) {
          console.log("Product created");
          //tömmer staten
          setProductData({
            name: "",
            status: "",
            description: "",
            imageUrl: "",
            amountInStock: 0,
            price: 0,
          });

          //tömmer inputvaluet
          const nameInput = document.getElementById("name") as HTMLInputElement;
          const statusInpus = document.getElementById(
            "status"
          ) as HTMLInputElement;
          const descriptionInput = document.getElementById(
            "description"
          ) as HTMLInputElement;
          const imageInput = document.getElementById(
            "imageUrl"
          ) as HTMLInputElement;
          const amountInput = document.getElementById(
            "amountInStock"
          ) as HTMLInputElement;
          const priceInput = document.getElementById(
            "price"
          ) as HTMLInputElement;

          if (nameInput) nameInput.value = "";
          if (statusInpus) statusInpus.value = "";
          if (descriptionInput) descriptionInput.value = "";
          if (imageInput) imageInput.value = "";
          if (amountInput) amountInput.value = "0";
          if (priceInput) priceInput.value = "0";
        } else {
          alert("Registration failed");
          console.log("Registration failed");
        }
      } catch (error) {
        console.error("Something went wriong:", error);
      }
    }
  };

  return (
    <div className="admin-container">
      <div>
        <button
          onClick={() => {
            setShowInput(!showInput);
          }}
        >
          Create new product
        </button>
      </div>
      <div>
        {showInput && (
          <div>
            <h4>Insert new product here</h4>
            <label>Name</label>
            <input
              onChange={handleChange}
              name="name"
              id="name"
              type="text"
              value={productData.name}
            />
            <label>Status</label>
            <input
              onChange={handleChange}
              name="status"
              id="status"
              type="text"
              value={productData.status}
            />
            <label>Description</label>
            <input
              onChange={handleChange}
              name="description"
              id="description"
              type="text"
              value={productData.description}
            />
            <label>Image URL</label>
            <input
              onChange={handleChange}
              name="imageUrl"
              id="imageUrl"
              type="text"
              value={productData.imageUrl}
            />
            <label>AmountInStock</label>
            <input
              onChange={handleChange}
              name="amountInStock"
              id="amountInStock"
              type="number"
              value={productData.amountInStock}
            />
            <label>Price</label>
            <input
              onChange={handleChange}
              name="price"
              id="price"
              type="number"
              value={productData.price}
            />
            {changeInput ? (
              <button onClick={() => confirmChangeProduct()}>
                Change product
              </button>
            ) : (
              <button onClick={handleClick}>Create</button>
            )}
          </div>
        )}
      </div>
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
            <button onClick={() => handleChangeProduct(product)}>
              Change product
            </button>
          </div>
        ))}
      </div>
      <ShowOrders />
    </div>
  );
};

export default AdminPage;
