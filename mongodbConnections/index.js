let mongodb = require("mongodb");
let express = require("express");

let app = express();

//via docker
let url = "mongodb://localhost:27017";
let client = new mongodb.MongoClient(url);

// //hämtar ordrar - använder aggregate
app.get("/getOrders", (request, response) => {
  client
    .connect()
    .then(async () => {
      console.log("connected");

      let db = client.db("Webbshop");
      let collection = db.collection("Orders");

      let pipeline = [
        {
          $lookup: {
            from: "LineItem",
            localField: "order",
            foreignField: "id",
            as: "LineItems",
            pipeline: [
              {
                $lookup: {
                  from: "Product",
                  localField: "id",
                  foreignField: "product",
                  as: "linkedProduct",
                },
              },
              {
                $addFields: {
                  linkedProduct: {
                    $first: "$linkedProduct",
                  },
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "Customer",
            localField: "id",
            foreignField: "customer",
            as: "linkedCustomer",
          },
        },
        {
          $addFields: {
            linkedCustomer: {
              $first: "$linkedCustomer",
            },
            calculatedCustomer: {
              $sum: "$LineItems.totalPrice",
            },
          },
        },
      ];

      let aggregate = collection.aggregate(pipeline);

      let orders = [];

      for await (let document of aggregate) {
        orders.push(document);
      }

      return orders;
    })
    .then((orders) => {
      response.json({ orders });
    })
    .finally(() => {
      client.close();
    });
});

//Skapa en customer
app.get("/createCustomer", (request, response) => {
  client
    .connect()
    .then(() => {
      console.log("connected");

      //från mongoDB collection
      let db = client.db("Webbshop");
      let orderCollection = db.collection("Customer");

      return orderCollection
        .insertOne({
          _id: "test10@email.com",
          firstName: "Test10",
          lastName: "TestL10",
          passWord: "ThisShouldBeTheHashedPassword",
          adress: {
            adress1: "testStreet",
            adress2: "",
            zipCode: "12345",
            city: "Gothenburg",
          },
        })

        .then(() => {
          console.log("Sucessfully inserted Customer");
          response.json({ message: "Customer is succesfully created" });
        });
    })
    .catch((error) => {
      console.log("error", error);
      response.status(500).json({ error: "server error" });
    })
    .finally(() => {
      client.close();
    });
});

// Skapa en order
// app.post("/createOrder", (request, response) => {
//     client.connect().then(() => {
//         console.log("connected");

//          //från mongoDB collection
//         let db = client.db('Webbshop');
//         let orderCollection = db.collection('Orders');

//         return orderCollection.insertOne({
//             customer: "testCustomer",
//             totalPrice: 1000,
//             OrderDate: "2024-04-17",
//             PaymentID: "0987665",
//             Status: true })
//         .then(() => {
//               console.log("Sucessfully orderd");
//               response.json({message: "Order is succesfully created"})
//         })

//     }).catch((error) => {
//         console.log("error",error);
//         response.status(500).json({error: "server error"})
//     }).finally(() => {
//         client.close();
//     })

// })

// app.post("create-order", async(request, response) => {
//     request.body.name

//     response.json({"test": 1})
// })

app.listen(3000, () => {
  console.log("Server is up and running");
});
