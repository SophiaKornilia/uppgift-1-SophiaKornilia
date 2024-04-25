let mongodb = require("mongodb");
let express = require("express");
let cors = require("cors");
let DatabaseConnection = require("./src/database/DatabasConnection");

let url = "mongodb://localhost:27017";
DatabaseConnection.getInstance().setUrl(url);

// console.log(DatabaseConnection.getInstande());

// console.log(DatabaseConnection.getInstande());

let app = express();

app.use(express.json());
app.use(express.urlencoded());
// app.use(express.static());
app.use(cors());

// // //hämtar ordrar - använder aggregate - vida DatabaseConnection
app.get("/getOrders", async (request, response) => {
  let orders = await DatabaseConnection.getInstance().getAllOrders();
  response.json({ orders });
});

app.get("/products", async (request, response) => {
  let products = await DatabaseConnection.getInstance().getProducts();

  response.json(products);
});

app.post("/createOrder", async (request, response) => {
  let orderId = await DatabaseConnection.getInstance().saveOrder(
    request.body.lineItems,
    request.body.email
  );
  //KATODO:
  response.json({ id: orderId });
});

app.post("/products", async (request, response) => {
  let id = await DatabaseConnection.getInstance().createProduct();
  await DatabaseConnection.getInstance().updateProduct(id, request.body);

  response.json({ id: id });
});

app.post("/products/:id", async (request, response) => {
  await DatabaseConnection.getInstance().updateProduct(
    request.params.id,
    request.body
  );

  response.json({ id: request.params.id });
});

// app.post("/createOrder", async (request, response) => {
//   request.body.name;
//   let customer = await DatabaseConnection.getInstande().getOrCreateCustomer(
//     request.body.name,
//     request.body.email,
//     request.body.address
//   );

//   let order = await DatabaseConnection.getInstande().createOrder(
//     request.lineItems,
//     customer
//   ); //KATODO : create function createOrder

//   response.json({ order });
// });

// //Skapa en customer
// app.get("/createCustomer", (request, response) => {
//   client
//     .connect()
//     .then(() => {
//       console.log("connected");

//       //från mongoDB collection
//       let db = client.db("Webbshop");
//       let orderCollection = db.collection("Customer");

//       return orderCollection
//         .insertOne({
//           _id: "test10@email.com",
//           firstName: "Test10",
//           lastName: "TestL10",
//           passWord: "ThisShouldBeTheHashedPassword",
//           adress: {
//             adress1: "testStreet",
//             adress2: "",
//             zipCode: "12345",
//             city: "Gothenburg",
//           },
//         })

//         .then(() => {
//           console.log("Sucessfully inserted Customer");
//           response.json({ message: "Customer is succesfully created" });
//         });
//     })
//     .catch((error) => {
//       console.log("error", error);
//       response.status(500).json({ error: "server error" });
//     })
//     .finally(() => {
//       client.close();
//     });
// });

// // Skapa en order
// // app.post("/createOrder", (request, response) => {
// //     client.connect().then(() => {
// //         console.log("connected");

// //          //från mongoDB collection
// //         let db = client.db('Webbshop');
// //         let orderCollection = db.collection('Orders');

// //         return orderCollection.insertOne({
// //             customer: "testCustomer",
// //             totalPrice: 1000,
// //             OrderDate: "2024-04-17",
// //             PaymentID: "0987665",
// //             Status: true })
// //         .then(() => {
// //               console.log("Sucessfully orderd");
// //               response.json({message: "Order is succesfully created"})
// //         })

// //     }).catch((error) => {
// //         console.log("error",error);
// //         response.status(500).json({error: "server error"})
// //     }).finally(() => {
// //         client.close();
// //     })

// // })

// // app.post("create-order", async(request, response) => {
// //     request.body.name

// //     response.json({"test": 1})
// // })

app.listen(3000, () => {
  console.log("Server is up and running");
});
