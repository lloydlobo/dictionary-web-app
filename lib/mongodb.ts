import { MongoClient } from "mongodb";

// Source: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb/lib/mongodb.ts

if (!process.env.MONGODB_URI) {
  throw new Error("Missing or invalid environment variable: 'MONGODB_URI'");
}

const uri = process.env.MONGODB_URI;
const options = {};
console.log({ uri });

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Use a global variable in development mode, so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongoDB = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongoDB._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongoDB._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongoDB._mongoClientPromise;
} else {
  // Do not use global variable in production mode.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
