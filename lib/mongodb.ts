'use server';
import { MongoClient } from 'mongodb';
import { TourInterface } from '@/data/DUMMY_TOURS';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the client across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getTours() {
  const client = await clientPromise;
  const db = client.db('viatoursdb');
  const tours = await db.collection('tours').find().toArray();
  await new Promise((resolve) => setTimeout(resolve, 3000));


  return (JSON.parse(JSON.stringify(tours)) as TourInterface[]).map(tour => ({
    ...tour,
    _id: tour._id.toString() // Convert ObjectId to string
  }));
}
