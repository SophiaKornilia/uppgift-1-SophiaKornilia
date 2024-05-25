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

  async saveOrder(lineitems, customerId) {
    await this.connect();

    let db = this.client.db("Webbshop");
    let collection = db.collection("Orders");

    let result = await collection.insertOne({
      customer: new mongodb.ObjectId(customerId),
      orderDate: new Date(),
      status: "unpaid",
    });

    console.log("customer", customer);

    let orderId = result.insertedId;

    let encodedLineItems = lineitems.map((lineItem) => {
      return {
        amount: lineItem.quantity,
        totalPrice: 0, // Update this if you have total price calculation
        order: new mongodb.ObjectId(orderId),
        product: new mongodb.ObjectId(lineItem.product),
      };
    });

    let lineItemsCollection = db.collection("LineItems");
    await lineItemsCollection.insertMany(encodedLineItems);

    return orderId;
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

  async createCustomer(email, firstName, lastName, address) {
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
}

module.exports = DatabaseConnection;
