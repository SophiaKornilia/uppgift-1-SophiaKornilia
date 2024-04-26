import { useState } from "react";
import "../index.css";

export const AdminPage = () => {
  //KATODO:lägg till produkt
  /* 
  1. Ta ut värdet av vad som skrivs i label
  2. Skicka värdet till backend
  */

  const [productData, setProductData] = useState({
    name: "",
    status: "",
    description: "",
    imageUrl: "",
    amountInStock: 0,
    price: 0,
  });

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
        alert("Registeringen misslyckades");
        console.log("Registreringen misslyckades");
      }
    } catch (error) {
      console.error("Något gick fel:", error);
    }
  };

  //KATODO:redigera produkt

  return (
    <div className="admin-container">
      <div>
        <div>
          <h4>Insert new product here</h4>
          <label>Name</label>
          <input onChange={handleChange} name="name" id="name" type="text" />
          <label>Status</label>
          <input
            onChange={handleChange}
            name="status"
            id="status"
            type="text"
          />
          <label>Description</label>
          <input
            onChange={handleChange}
            name="description"
            id="description"
            type="text"
          />
          <label>Image URL</label>
          <input
            onChange={handleChange}
            name="imageUrl"
            id="imageUrl"
            type="text"
          />
          <label>AmountInStock</label>
          <input
            onChange={handleChange}
            name="amountInStock"
            id="amountInStock"
            type="number"
          />
          <label>Price</label>
          <input
            onChange={handleChange}
            name="price"
            id="price"
            type="number"
          />
          <button onClick={handleClick}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
