"use strict";

const { MongoClient } = require("mongodb")
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Gets all items
const getItems = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options)
    await client.connect()

    const db = client.db('eCommerce')

    const items = await db.collection('items').find().toArray()
    items ?
      res.status(200).json({status: 200, data: items}) :
      res.status(400).sjon({status: 400, message: "Nothing was found here"})
    client.close()
  } catch (error) {
    console.log(error)
    res.status(500).json({status: 500, message: error})
  }
}

//Gets a specific item based on it's _id
const getItem = async (req, res) => {
  const myId = req.params._id;
  const client = new MongoClient(MONGO_URI, options)

  try {
    await client.connect()

    const db = client.db('eCommerce')

    const itemById = await db.collection('items').findOne({ _id: Number(myId) });
  
    itemById 
      ? res.status(200).json({ status: 200, data: itemById }) 
      : res.status(400).json({status: 400, data: myId, message: "Nothing was found here"})

  } catch (error) {
    res.status(500).json({status: 500, message: error}) 
  }
  client.close();
}

//Gets all compagnies
const getCompanies = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");

    const allCompanies = await db.collection("companies").find().toArray();

    allCompanies
      ? res.status(200).json({ status: 200, data: allCompanies })
      : res.status(400).json({status: 400, message: "Nothing was found here"})
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
    const companyById = await db.collection("companies").findOne({ _id: Number(myId) });

    companyById
      ? res.status(200).json({ status: 200, data: companyById })
      : res.status(400).json({status: 400, data: myId, message: "Nothing was found here"})
    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
    client.close();
  }
};

const getCart = async(req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options)
    await client.connect()

    const db = client.db('eCommerce')

    client.close()
  } catch (error) {
    res.status(500).json({status: 500, message: error})
    client.close()
  }
}


const createCart = async(req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options)
    await client.connect()
    const db = client.db('eCommerce')

// this verifies that the item _id exist
const itemId = req.body._id
const findItem = await db.collection("items").findOne({ _id: Number(itemId)});

if (!findItem) {
  return res
    .status(400)
    .json({ status: 400, data: "Item doesn't exist" });
}

// this verifies that the item is in stock
if (findItem.numInStock <= req.body.quantity ) {
  return res
    .status(400) 
    .json({ status: 400, data: "Item not in stock" });
}

//   this creates new cart
const newOrderId = uuidv4();
const newCart = {
  _id: newOrderId, 
  cart: [req.body] 
};
const creatingNewCart = await db
.collection("carts")
.insertOne(newCart);

//   this updates item stock
const query = { _id: Number(itemId) };
const update = { $set: { "numInStock": (findItem.numInStock - Number(req.body.quantity))} };

const itemStockUpdate = await db
.collection("items")
.updateOne(query, update);
///////////////

res.status(200).json({
  status: 200,
  message: "New cart created",
  orderId: `Your order id ${newId}`
});

    client.close()
  } catch (error) {
    res.status(500).json({status: 500, message: error})
    client.close()
  }
}


const updateCart = async(req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options)
    await client.connect()

    const db = client.db('eCommerce')

    client.close()
  } catch (error) {
    res.status(500).json({status: 500, message: error})
    client.close()
  }
}

const confirmOrder = async(req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options)
    await client.connect()

    const db = client.db('eCommerce')

    client.close()
  } catch (error) {
    res.status(500).json({status: 500, message: error})
    client.close()
  }
}

const deleteItem = async(req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options)
    await client.connect()

    const db = client.db('eCommerce')

    client.close()
  } catch (error) {
    res.status(500).json({status: 500, message: error})
    client.close()
  }
}

module.exports = {
  getItems,
  getItem,
  getCompanies,
  getCompany,
  getCart,
  createCart,
  updateCart,
  confirmOrder,
  deleteItem
}