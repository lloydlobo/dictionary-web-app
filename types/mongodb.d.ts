import { MongoClient } from "mongodb";

// Source: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb/types/mongodb.d.ts
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}
