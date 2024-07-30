'use server';
import { MongoClient, ObjectId } from 'mongodb';
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
export async function getTours(limit: number, matchProps: unknown, skip: number = 0, project?: unknown) {

  const client = await clientPromise;
  const db = client.db('viatoursdb');
  const tours = await db.collection('tours')
    .aggregate([{ $match: matchProps }, { $skip: skip }, { $limit: limit }]).toArray();

  if (project) {
    const tours = await db.collection('tours')
      .aggregate([{ $match: matchProps }, { $project: project }, { $skip: skip }, { $limit: limit }]).toArray();

    return (JSON.parse(JSON.stringify(tours)) as TourInterface[]).map(tour => ({
      ...tour,
      // this is necessary because Next.js does not allow sending ObjectId to the client
      _id: tour._id.toString() // Convert ObjectId to string
    }));
  }

  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // (JSON.parse(JSON.stringify(tours)) is used to create a new copy of the array
  // also creating a new copy of the array resolves the issue with the buffer type.
  return (JSON.parse(JSON.stringify(tours)) as TourInterface[]).map(tour => ({
    ...tour,
    // this is necessary because Next.js does not allow sending ObjectId to the client
    _id: tour._id.toString() // Convert ObjectId to string
  }));
}

export async function getTourById(id: string) {
  const client = await clientPromise;

  const db = client.db(`viatoursdb`);
  const tour = await db.collection(`tours`).aggregate([
    {
      $match: {
        _id: new ObjectId(id)
      }
    },
    {
      $lookup: {
        from: 'tourComments',
        localField: 'comments',
        foreignField: '_id',
        as: 'tourComments'
      }
    },
    {
      $project: {
        title: 1,
        overview: 1,
        country: 1,
        city: 1,
        reviews: 1,
        views: 1,
        time: 1,
        type: 1,
        price: 1,
        tags: 1,
        booked: 1,
        images: 1,
        duration: 1,
        groupSize: 1,
        ages: 1,
        tourHighlights: 1,
        whatsIncluded: 1,
        itinerary: 1,
        tourMap: 1,
        meetingPoint: 1,
        available: 1,
        onSale: 1,
        languages: 1,
        rating: 1,
        // looking up for the comments added to the tour. I do exclude
        // userId, tourId, timestamp and rating.overall but all other nested props.
        tourComments: {
          $map: {
            input: '$tourComments',
            as: 'comment',
            in: {
              _id: '$$comment._id',
              user: '$$comment.user',
              rating: '$$comment.rating.overall',
              title: '$$comment.title',
              text: '$$comment.text',
              images: '$$comment.images',
              addedAt: '$$comment.addedAt',
              likes: '$$comment.likes',
              dislikes: '$$comment.dislikes',
              abuseReports:
                '$$comment.abuse_reports'
            }
          }
        }
      }
    }
  ]).toArray();
  console.log(`Executing tour: `, tour);
  return JSON.parse(JSON.stringify(tour))[0] as TourInterface;
}
