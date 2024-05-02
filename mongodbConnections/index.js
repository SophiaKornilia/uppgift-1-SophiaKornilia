let mongodb = require("mongodb");
let express = require("express");
let cors = require("cors");
let DatabaseConnection = require("./src/database/DatabasConnection");

let url = "mongodb://localhost:27017";
DatabaseConnection.getInstance().setUrl(url);

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static());
app.use(cors());

// // //hämtar ordrar - använder aggregate - vida DatabaseConnection
app.get("/getOrders", async (request, response) => {
  let orders = await DatabaseConnection.getInstance().getAllOrders();
  response.json({ orders });
  console.log(orders);
});

app.get("/products", async (request, response) => {
  let products = await DatabaseConnection.getInstance().getProducts();

  response.json(products);
});

app.post("/createOrder", async (request, response) => {
  let orderId = await DatabaseConnection.getInstance().saveOrder(
    request.body.LineItems,
    request.body.email
  );
  //KATODO:
  response.json({ id: orderId });
});

app.post("/products", async (request, response) => {
  console.log("1", request.body);
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

app.post("/createCustomer", async (request, response) => {
  await DatabaseConnection.getInstance().createCustomer(request.body);
  response.json({ message: "Customer created successfully" });
});
// app.post("/createCustomer", async (request, response) => {
//   try {
//     const client = await mongodb.MongoClient.connect(url)

//     const db = client.db("Webbshop");
//     const customerCollection = db.collection("Customer");

//     const result = await customerCollection.insertOne({
//       _id: request.body.email,
//       firstName: request.body.firstName,
//       lastName: request.body.lastName,
//       passWord: request.body.passWord,
//       address: {
//         address1: request.body.address.address1,
//         address2: request.body.address.address2 || "", // optional
//         zipCode: request.body.address.zipCode,
//         city: request.body.address.city,
//       },
//     });

//     response.json({ message: "Customer created successfully" });
//   } catch (error) {
//     console.error("Error creating customer:", error);
//     response.status(500).json({ error: "Server error" });
//   }
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
// .insertOne({
//   _id: "testmail@email.com",
//   firstName: "Test2",
//   lastName: "Test2",
//   passWord: "Password",
//   adress: {
//     adress1: "testStreet",
//     adress2: "",
//     zipCode: "12345",
//     city: "Gothenburg",
//   },
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
