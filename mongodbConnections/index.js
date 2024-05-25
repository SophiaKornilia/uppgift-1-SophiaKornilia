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
  response.json(orders);
  // console.log(orders);
});

app.get("/products", async (request, response) => {
  let products = await DatabaseConnection.getInstance().getProducts();

  response.json(products);
});

app.post("/createOrder", async (request, response) => {
  let orderId = await DatabaseConnection.getInstance().saveOrder(
    request.body.LineItems,
    +request.body.email
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

app.listen(3000, () => {
  console.log("Server is up and running");
});
