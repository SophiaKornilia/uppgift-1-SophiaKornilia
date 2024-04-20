let mongodb = require('mongodb');
let express = require('express');

let app = express(); 

app.post("/createOrder", (request, response) => {

    //via docker
    let url = 'mongodb://localhost:27017'; 
    let client = new mongodb.MongoClient(url);

    client.connect().then(() => {
        console.log("connected");

         //från mongoDB collection
        let db = client.db('Webbshop');
        let orderCollection = db.collection('Orders');

        return orderCollection.insertOne({
            customer: "testCustomer",
            totalPrice: 1000,
            OrderDate: "2024-04-17",
            PaymentID: "0987665",
            Status: true })
        .then(() => {
              console.log("Sucessfully orderd");
              response.json({message: "Order is succesfully created"})
        })

    }).catch((error) => {
        console.log("error",error);
        response.status(500).json({error: "server error"})
    }).finally(() => {
        client.close();
    })

})

app.post("create-order", async(request, response) => {
    request.body.name

    response.json({"test": 1})
})

app.listen(3000, () => {
    console.log("Server is up and running");
})