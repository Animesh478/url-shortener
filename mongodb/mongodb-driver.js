import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

await client.connect();

const db = client.db("test");
console.log("connection established");

const userCollection = db.collection("users");
// const insertResult = await userCollection.insertOne({
//   name: "Animesh",
//   age: 22,
//   role: "Developer",
// });

const user = await userCollection.findOne();
console.log(user);
