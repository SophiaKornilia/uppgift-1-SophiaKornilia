import { useEffect, useState } from "react";
import "../index.css";
import { IProduct } from "../context/CartContext";

interface IOrder {
  _id: string;
  orderDate: Date;
  paymentId: string;
  status: string;
  totalPrice: number;
  customer: {
    _id: string;
    firstName: string;
    LastName: string;
    adress: {
      adress1: string;
      adress2: string;
      zipCode: number;
      city: string;
      country: string;
    };
  };
  LineItems: ILineItems[];
}

interface ILineItems {
  _id: string;
  orderId: number;
  amount: number;
  product: IProduct;
}
export const ShowOrders = () => {
  //interface med Orders

  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/getOrders");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchData();
  }, []);

  console.log("the order", orders);

  return (
    <>
      <div>
        {orders?.map((order) => (
          <div className="product-card" key={order._id}>
            <p>order Id: {order._id}</p>
            <p>total price: {order.totalPrice} sek</p>
            <p>orderstatus: {order.status} </p>
            <p>customerId: {order.customer?._id}</p>
            <p>Firstname: {order.customer?.firstName}</p>
            <p>Lastname: {order.customer?.LastName}</p>

            {order.LineItems.map((lineItem) => (
              <div>
                <p>Lineitem Id: {lineItem._id}</p>
                <p>order id: {lineItem.orderId}</p>
                <p>amount: {lineItem.amount}</p>
                <p>Product:</p>
                <p>amount: {lineItem.product.name}</p>
                <p>price: {lineItem.product.price}</p>
                <br />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
