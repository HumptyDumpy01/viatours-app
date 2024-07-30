'use server';
import { MongoClient } from 'mongodb';
import { TourInterface } from '@/data/DUMMY_TOURS';

// Extend the global interface
// it resolves issues with the global variable missing type
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Ensure that you have a MongoDB URI in the .env.local file
if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

// Create a cached connection variable
const uri = process.env.MONGODB_URI;
// here we are using the default options
const options = {};

let client;
// Create a new MongoClient
let clientPromise: Promise<MongoClient>;

// If in development mode, use a global variable to store the client
if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the client across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
  // In production mode, use a new client for each request
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// this function is used to get the items from the database
export async function getTours(limit: number, matchProps: unknown, skip: number = 0) {

  const client = await clientPromise;
  const db = client.db('viatoursdb');
  const tours = await db.collection('tours')
    .aggregate([{ $match: matchProps }, { $skip: skip }, { $limit: limit }]).toArray();

  await new Promise((resolve) => setTimeout(resolve, 3000));

  // (JSON.parse(JSON.stringify(tours)) is used to create a new copy of the array
  // also creating a new copy of the array resolves the issue with the buffer type.
  return (JSON.parse(JSON.stringify(tours)) as TourInterface[]).map(tour => ({
    ...tour,
    // this is necessary because Next.js does not allow sending ObjectId to the client
    _id: tour._id.toString() // Convert ObjectId to string
  }));
}
