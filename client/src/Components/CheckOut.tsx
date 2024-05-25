import { useState } from "react";
import "../index.css";
import { ICartItem, useCart } from "../context/CartContext";

interface ICustomer {
  email: string;
  firstName: string;
  lastName: string;
  address: IAddress;
}

interface IAddress {
  address1: string;
  address2: string;
  zipCode: string;
  city: string;
  country: string;
}

export const CheckOut = () => {
  const { cart } = useCart();
  const [Customer, setCustomer] = useState<ICustomer>({
    email: "",
    firstName: "",
    lastName: "",
    address: {
      address1: "",
      address2: "",
      zipCode: "",
      city: "",
      country: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Om det är en del av adressen som ändras
    if (["address1", "address2", "zipCode", "city", "country"].includes(name)) {
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        address: {
          ...prevCustomer.address,
          [name]: value,
        },
      }));
    } else {
      // Om det är ett fält i customer förnamn, efternamn eller e-post som ändras
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        [name]: value,
      }));
    }
    console.log("customer", Customer);
  };

  const handleClick = async () => {
    const LineItems = cart.map((item: ICartItem) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    console.log(Customer, LineItems);

    try {
      const response = await fetch("/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Customer, LineItems }),
      });

      if (response.ok) {
        console.log("Customer created successfully");
      } else {
        console.error("Failed to create customer");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Registreringsformulär</h2>

      <div className="admin-container">
        <label>Email</label>
        <input
          onChange={handleChange}
          name="email"
          id="email"
          type="text"
          value={Customer.email}
        />
        <label>Firstname</label>
        <input
          onChange={handleChange}
          name="firstName"
          id="firstName"
          type="text"
          value={Customer.firstName}
        />
        <label>Lastname</label>
        <input
          onChange={handleChange}
          name="lastName"
          id="lastName"
          type="text"
          value={Customer.lastName}
        />
        <p>address</p>
        <label>address1</label>
        <input
          onChange={handleChange}
          name="address1"
          id="address1"
          type="text"
          value={Customer.address.address1}
        />
        <label>address2</label>
        <input
          onChange={handleChange}
          name="address2"
          id="address2"
          type="text"
          value={Customer.address.address2}
        />
        <label>zipcode</label>
        <input
          onChange={handleChange}
          name="zipCode"
          id="zipCode"
          type="number"
          value={Customer.address.zipCode}
        />
        <label>city</label>
        <input
          onChange={handleChange}
          name="city"
          id="city"
          type="text"
          value={Customer.address.city}
        />
        <label>country</label>
        <input
          onChange={handleChange}
          name="country"
          id="country"
          type="text"
          value={Customer.address.country}
        />
      </div>
      <button onClick={handleClick}>Pay</button>
    </div>
  );
};
