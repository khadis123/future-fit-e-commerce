const { MongoClient } = require("mongodb");
const items = require("./data/items.json");
const companies = require("./data/companies.json");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("eCommerce");

  console.log("connecter");
  await db.collection("items").insertMany(items);
  await db.collection("companies").insertMany(companies);

  client.close();
};

batchImport();