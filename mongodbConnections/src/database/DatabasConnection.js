const { response } = require("express");
let mongodb = require("mongodb");
let instance = null;

class DatabaseConnection {
  constructor() {
    this.url = null;
  }

  setUrl(url) {
    this.url = url;
  }

  async connect() {
    if (this.client) {
      return;
    }
    this.client = new mongodb.MongoClient(this.url);

    await this.client.connect();
  }

  async saveOrder(LineItems, customer) {
    await this.connect();

    let db = this.client.db("Webbshop");
    let collection = db.collection("Orders");

    let result = await collection.insertOne({
      customer: customer,
      orderDate: new Date(),
      status: "unpaid",
    });

    console.log("customer", customer);

    let orderId = result.insertedId;

    // let encodedLineItems = LineItems.map((lineItem) => {
    //   console.log(lineItem);
    //   return {
    //     amount: lineItem["amount"],
    //     totalPrice: 0,
    //     order: new mongodb.ObjectId(orderId),
    //     product: new mongodb.ObjectId(lineItem["product"]),
    //   };
    // });

    // let lineItemsCollection = db.collection("LineItems");
    // await lineItemsCollection.insertMany(encodedLineItems);

    // return orderId;
  }

  async createProduct() {
    await this.connect();

    let db = this.client.db("Webbshop");
    let collection = db.collection("Product");

    let result = await collection.insertOne({
      status: "draft",
      name: null,
      description: null,
      image: null,
      amountInStock: 0,
      price: 0,
    });

    return result.insertedId;
  }

  async updateProduct(id, productData) {
    await this.connect();

    let db = this.client.db("Webbshop");
    let collection = db.collection("Product");

    // console.log({ name: productData["name"] });

    await collection.updateOne(
      { _id: new mongodb.ObjectId(id) },
      {
        $set: {
          name: productData["name"],
          description: productData["description"],
          amountInStock: productData["amountInStock"],
          price: productData["price"],
          category: productData["category"]
            ? new mongodb.ObjectId(productData["category"])
            : null,
        },
      }
    );
  }

  async getProducts() {
    await this.connect();

    let db = this.client.db("Webbshop");
    let collection = db.collection("Product");

    let pipeline = [
      {
        $lookup: {
          from: "Category",
          localField: "category",
          foreignField: "id",
          as: "category",
        },
      },
      {
        $addFields: {
          category: {
            $first: "$category",
          },
        },
      },
    ];

    let documents = collection.aggregate(pipeline);
    let returnArray = [];

    for await (let document of documents) {
      returnArray.push(document);
    }
    return returnArray;
  }
  static getInstance() {
    if (instance === null) {
      instance = new DatabaseConnection();
    }
    return instance;
  }

  async getAllOrders() {
    await this.connect();

    let db = this.client.db("Webbshop");
    let collection = db.collection("Orders");

    let pipeline = [
      {
        $lookup: {
          from: "LineItems",
          localField: "_id",
          foreignField: "order",
          as: "LineItems",
          pipeline: [
            {
              $lookup: {
                from: "Product",
                localField: "product",
                foreignField: "_id",
                as: "product",
              },
            },
            {
              $addFields: {
                product: {
                  $first: "$product",
                },
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "Customer",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $addFields: {
          customer: {
            $first: "$customer",
          },
        },
      },
    ];

    let documents = collection.aggregate(pipeline);
    let returnArray = [];

    for await (let document of documents) {
      returnArray.push(document);
    }
    return returnArray;
  }

  async createOrder(email, firstName, lastName, address) {
    await this.connect();

    let db = this.client.db("Webbshop");
    let customerCollection = db.collection("Customer");

    let existingCustomer = await collection.findOne({ _id: email });

    if (existingCustomer) {
      return existingCustomer._id;
    } else {
      let result = await customerCollection.insertOne({
        _id: email,
        firstName: firstName,
        lastName: lastName,
        address: {
          address1: address.address1,
          address2: address.address2 || "", // optional
          zipCode: address.zipCode,
          city: address.city,
        },
      });
      return result.insertedId;
    }
  }

  static getInstance() {
    if (instance === null) {
      instance = new DatabaseConnection();
    }
    return instance;
  }
}

module.exports = DatabaseConnection;
//   constructor() {
//     console.log("DatabaseConnection: constructor");

//     this.client = null;
//     this.url = null;

//     this.debugId = Math.floor(Math.random() * 10000);
//   }

//   setUrl(url) {
//     this.url = url;
//   }

//   async connect() {
//     if (!this.client) {
//       this.client = new mongodb.MongoClient(this.url);

//       await this.client.connect();
//     }
//   }

//   async getAllOrders() {
//     await this.connect();

//     let db = this.client.db("Webbshop");
//     let collection = db.collection("Orders");

// let pipeline = [
//   {
//     $lookup: {
//       from: "LineItem",
//       localField: "order",
//       foreignField: "id",
//       as: "LineItems",
//       pipeline: [
//         {
//           $lookup: {
//             from: "Product",
//             localField: "id",
//             foreignField: "product",
//             as: "linkedProduct",
//           },
//         },
//         {
//           $addFields: {
//             linkedProduct: {
//               $first: "$linkedProduct",
//             },
//           },
//         },
//       ],
//     },
//   },
//   {
//     $lookup: {
//       from: "Customer",
//       localField: "id",
//       foreignField: "customer",
//       as: "linkedCustomer",
//     },
//   },
//   {
//     $addFields: {
//       linkedCustomer: {
//         $first: "$linkedCustomer",
//       },
//     },
//   },
// ];

//     let aggregate = collection.aggregate(pipeline);

//     let orders = [];

//     for await (let document of aggregate) {
//       orders.push(document);
//     }

//     return orders;
//   }

//   async getOrCreateCustomer(email, name, address) {
//     //KATODO

//     return { id: 123456 }; //skriver för att testa men funktionen är ej klar
//   }

//   async createOrder(lineItems, customer) {
//     //KATODO

//     return { id: "order13345666" }; //skriver för att testa men funktionen är ej klar
//   }

//   static getInstande() {
//     // skapas första gången, sedan returnera den skapade objektet
//     if (instance === null) {
//       instance = new DatabaseConnection();
//     }
//     return instance;
//   }
// }

// module.exports = DatabaseConnection;

// [
//     {
//       $lookup:
//         {
//           from: "LineItem",
//           localField: "order",
//           foreignField: "id",
//           as: "LineItems",
//         },
//     },
//     {
//       $lookup:
//         {
//           from: "Customer",
//           localField: "Customer",
//           foreignField: "id",
//           as: "customer",
//         },
//     },
//     {
//       $addFields:
//         {
//           customer: {
//             $first: "$customer",
//           },
//         },
//     },
//   ]

// [
//     {
//       $lookup: {
//         from: "Product",
//         localField: "Product",
//         foreignField: "id",
//         as: "product",
//       },
//     },
//     {
//       $addFields: {
//         product: {
//           $first: "$product",
//         },
//       },
//     },
//   ]
