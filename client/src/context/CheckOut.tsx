import { useState } from "react";
import "../index.css";

interface ICustomer {
  email: string;
  firstName: string;
  LastName: string;
  adress: {
    adress1: string;
    adress2: string;
    zipCode: number;
    city: string;
    country: string;
  };
}

export const CheckOut = () => {
  const [customer, setCustomer] = useState<ICustomer>();

  //här ska customer skapas
  return (
    <div>
      <h2>Registreringsformulär</h2>

      <div className="admin-container">
        <label>email</label>
        <input
          //   onChange={}
          name="email"
          id="email"
          type="text"
          //   value={}
        />
        <label>Firstname</label>
        <input
          //   onChange={handleChange}
          name="firstName"
          id="firstName"
          type="text"
          //   value={productData.status}
        />
        <label>Lastname</label>
        <input
          //   onChange={handleChange}
          name="lastName"
          id="lastName"
          type="text"
          //   value={productData.description}
        />
        <p>Adress</p>
        <label>adress1</label>
        <input
          //   onChange={handleChange}
          name="adress1"
          id="adress1"
          type="text"
          //   value={productData.imageUrl}
        />
        <label>adress2</label>
        <input
          //   onChange={handleChange}
          name="adress2"
          id="adress2"
          type="text"
          //   value={productData.imageUrl}
        />
        <label>zipcode</label>
        <input
          //   onChange={handleChange}
          name="zipCode"
          id="zipCode"
          type="number"
          //   value={productData.amountInStock}
        />
        <label>city</label>
        <input
          //   onChange={handleChange}
          name="city"
          id="city"
          type="string"
          //   value={productData.price}
        />
        <label>country</label>
        <input
          //   onChange={handleChange}
          name="country"
          id="country"
          type="string"
          //   value={productData.price}
        />
      </div>
      <button>Pay</button>
    </div>
  );
};
