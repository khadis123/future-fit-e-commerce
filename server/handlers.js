"use strict";
const { uuid } = require("uuidv4");
const { MongoClient, LEGAL_TLS_SOCKET_OPTIONS } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Gets all items
const getItems = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("eCommerce");

    const items = await db.collection("items").find().toArray();
    items
      ? res.status(200).json({ status: 200, data: items })
      : res
          .status(400)
          .sjon({ status: 400, message: "Nothing was found here" });
    client.close();
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: error });
  }
};

//Gets a specific item based on it's _id
const getItem = async (req, res) => {
  const myId = req.params._id;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("eCommerce");
    const itemById = await db
      .collection("items")
      .findOne({ _id: Number(myId) });

    itemById
      ? res.status(200).json({ status: 200, data: itemById })
      : res
          .status(400)
          .json({ status: 400, data: myId, message: "Nothing was found here" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
  client.close();
};

// Gets items by category
const getItemsByCategory = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");

    const myCategory = req.params.category;
    const items = await db.collection("items").find().toArray();
    const itemsCatOnly = items.filter((item) => {
      return item.category.toLowerCase() === myCategory.toLowerCase();
    });

    itemsCatOnly
      ? res.status(200).json({ status: 200, data: itemsCatOnly })
      : res
          .status(400)
          .json({ status: 400, message: "Nothing was found here" });
    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
};

//Gets all compagnies
const getCompanies = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");

    const allCompanies = await db.collection("companies").find().toArray();

    allCompanies
      ? res.status(200).json({ status: 200, data: allCompanies })
      : res
          .status(400)
          .json({ status: 400, message: "Nothing was found here" });
    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
};

//Gets a specific company based on it's _id
const getCompany = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");
    const myId = req.params._id;
    const companyById = await db
      .collection("companies")
      .findOne({ _id: Number(myId) });

    companyById
      ? res.status(200).json({ status: 200, data: companyById })
      : res
          .status(400)
          .json({ status: 400, data: myId, message: "Nothing was found here" });
    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
    client.close();
  }
};

// Get cart
const getCart = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");

    const result = await db.collection("cart").find().toArray();

    result
      ? res.status(200).json({ status: 200, data: result })
      : res.status(404).json({ status: 404, message: "Not Found" });

    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
    client.close();
  }
};

// Get order by ID
const getOrder = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");
    const myId = Number(req.params.orderId);

    const orderResult = await db.collection("orders").findOne({ _id: myId });
    orderResult
      ? res.status(200).json({ status: 200, data: orderResult })
      : res
          .status(400)
          .sjon({ status: 400, message: "Nothing was found here" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
    client.close();
  }
};

// POST add to cart
const addCart = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");

    // this verifies that the item _id exist
    const itemId = Number(req.body._id);
    const findItem = await db.collection("items").findOne({ _id: itemId });
    if (!findItem) {
      return res.status(400).json({ status: 400, data: "Item doesn't exist" });
    }

    // this verifies that the item is in stock
    if (findItem.numInStock < req.body.quantity) {
      return res.status(400).json({ status: 400, data: "Item not in stock" });
    }

    // this checks if item already exist in cart
    const findCart = await db.collection("cart").find().toArray();
    const itemFind = findCart.find((item) => {
      return item._id === itemId;
    });

    // this updates quantity if item already exist in cart and updates stock as well
    if (itemFind) {
      const query = { _id: itemId };
      const update = {
        $set: { quantity: itemFind.quantity + Number(req.body.quantity) },
      };
      const updateQuantity = await db
        .collection("cart")
        .updateOne(query, update);

      const query2 = { _id: itemId };
      const update2 = {
        $set: { numInStock: findItem.numInStock - Number(req.body.quantity) },
      };
      const itemStockUpdate = await db
        .collection("items")
        .updateOne(query2, update2);

      return res.status(200).json({
        status: 200,
        message: "Cart has been updated",
      });
    }

    // this adds new item to cart and updates stock
    const newAddToCart = await db.collection("cart").insertOne(req.body);

    const query1 = { _id: itemId };
    const update1 = {
      $set: { numInStock: findItem.numInStock - Number(req.body.quantity) },
    };

    const itemStockUpdate = await db
      .collection("items")
      .updateOne(query1, update1);
    ///////////////

    res.status(200).json({
      status: 200,
      message: "New item added to cart",
    });

    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
    client.close();
  }
};

// PATCH updates cart
const updateCart = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");
  
    // this verifies that the item _id exist
    const itemId = Number(req.body._id);
    const findItem = await db.collection("items").findOne({ _id: itemId });
    if (!findItem) {
      return res.status(400).json({ status: 400, data: "Item doesn't exist" });
    }
  
    // this verifies that the item is in stock
    if (findItem.numInStock < req.body.quantity) {
      return res.status(400).json({ status: 400, data: "Item not in stock" });
    }
   

    // this updates quantity in cart and updates stock
    const oldCartItem = await db
      .collection("cart")
      .findOne({ _id: itemId });

    const query1 = { _id: itemId };
    const update1 = {
      $set: { quantity: oldCartItem.quantity + Number(req.body.quantity) },
    };
    const updateQuantity = await db
      .collection("cart")
      .updateOne(query1, update1);

    // stock
    const query2 = { _id: itemId };
    const update2 = {
      $set: { numInStock: findItem.numInStock - Number(req.body.quantity) },
    };
    const itemStockUpdate = await db
      .collection("items")
      .updateOne(query2, update2);

    const updatedCart = await db.collection("cart").find().toArray();

    res.status(200).json({
      status: 200,
      message: "Cart has been updated",
      data: updatedCart,
    });
    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
    client.close();
  }
};

// POST for place order
const confirmOrder = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");

    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.address ||
      !req.body.email
    ) {
      return res.status(409).json({ status: 409, data: "Missing information" });
    }
    const newOrderId = uuid();
    const findCart = await db.collection("cart").find().toArray();

    const finalOrder = {
      _id: newOrderId,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      province: req.body.province,
      postalCode: req.body.postalCode,
      country: req.body.country,
      phone: req.body.phone,
      cart: findCart,
    };

    const orderResult = await db.collection("orders").insertOne(finalOrder);

    res.status(200).json({
      status: 200,
      message: "New order created",
      orderId: `Your order id ${newOrderId}`,
    });

    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
    client.close();
  }
};

module.exports = {
  getItems,
  getItem,
  getItemsByCategory,
  getCompanies,
  getCompany,
  getCart,
  getOrder,
  addCart,
  updateCart,
  confirmOrder,
};
