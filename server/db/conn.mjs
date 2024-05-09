import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("wp1");
    console.log("Connected to MongoDB database");
    return db;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export default connectToDatabase;