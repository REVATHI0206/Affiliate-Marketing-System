import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://sangunathanrevathi_db_user:deeps1@cluster0.pzwmmpc.mongodb.net/AMS?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  console.log("✅ Connected Successfully");
  await client.db("admin").command({ ping: 1 });
  console.log("✅ Ping Success");
} catch (err) {
  console.log(err);
} finally {
  await client.close();
}