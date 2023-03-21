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

    const db = client.db('E-COMteam')

    const items = await db.collection('items').find().toArray()
    console.log(items)

    client.close()

  } catch (error) {
    res.status(500).json({status: 500, message: error})
    client.close()
  }
}

//Gets a specific item based on it's _id
const getItem = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options)
    await client.connect()

    const db = client.db('E-COMteam')

    client.close()
  } catch (error) {
    res.status(500).json({status: 500, message: error})
    client.close()
  }
}

//Gets all compagnies
const getCompanies = async(req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options)
    await client.connect()

    const db = client.db('E-COMteam')

    client.close()
  } catch (error) {
    res.status(500).json({status: 500, message: error})
    client.close()
  }
}


//Gets a specific company based on it's _id
const getCompany = async(req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options)
    await client.connect()

    const db = client.db('E-COMteam')

    client.close()
  } catch (error) {
    res.status(500).json({status: 500, message: error})
    client.close()
  }
}

const getCart = async(req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options)
    await client.connect()

    const db = client.db('E-COMteam')

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

    const db = client.db('E-COMteam')

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

    const db = client.db('E-COMteam')

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

    const db = client.db('E-COMteam')

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

    const db = client.db('E-COMteam')

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