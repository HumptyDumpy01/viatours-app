'use server';
import { MongoClient, ObjectId, Timestamp } from 'mongodb';
import { TourInterface } from '@/data/DUMMY_TOURS';
import { revalidatePath } from 'next/cache';

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

export async function getUser(filter: {}, options?: {}) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);
  const user = await db.collection(`users`).aggregate([{ $match: filter }, { $project: options }]).toArray();
  return JSON.parse(JSON.stringify(user));
}

type submitTourComment = {
  tourId: string;
  rating: {
    location: number;
    amenities: number;
    food: number;
    room: number;
    price: number;
    tourOperator: number;
  };
  email: string;
  user: string;
  title: string;
  text: string;
  images: File[];
}

export async function submitTourComment({ rating, email, user, title, text, images, tourId }: submitTourComment) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);
  const userExists = await getUser({ email: email }, { email: 1, _id: 0 });

  console.log(`Executing userExists: (Server)`, userExists);
  if (userExists.length > 0) {
    return {
      error: `The user with the email ${email} already exists. Please sign in to proceed.`
    };
  }

  if (!rating.location || !rating.amenities || !rating.food || !rating.room || !rating.price || !rating.tourOperator) {
    return {
      error: `A rating for each category should be provided.`
    };
  }
  if (!user) {
    return {
      error: `A user is invalid or empty.`
    };
  }
  if (!email) {
    return {
      error: `An email is invalid or empty.`
    };
  }
  if (!title) {
    return {
      error: `Please provide a title for the comment.`
    };
  }
  if (!text) {
    return {
      error: `Please provide a text for the comment.`
    };
  }
  if (images.length > 3 || (images.length === 1 && images[0].size === 0)) {
    return {
      error: `Failed to upload the images. You can only upload up to 3 or can omit image upload.`
    };
  }
  if (!tourId) {
    throw new Error(`Oops! We were unable to save this comment! Sorry for the inconvenience. We are working on it.`);
  }

  console.log(`rating:`, rating);
  console.log(`tourId:`, tourId);
  console.log(`email:`, email);
  console.log(`user:`, user);
  console.log(`title:`, title);
  console.log(`text:`, text);
  console.log(`images:`, images);

  // rating coefficients
  const location = 0.2;
  const amenities = 0.2;
  const food = 0.15;
  const room = 0.15;
  const price = 0.1;
  const tourOperator = 0.2;

  // console.log(Math.min(5, (rating.location * location) + (rating.amenities * amenities) + (rating.food * food) + (rating.room * room) + (rating.price * price) + (rating.tourOperator * tourOperator)));

  try {
    const result = await db.collection(`tourComments`).insertOne({
      userId: null,
      tourId: new ObjectId(tourId),
      user: user,
      email: email,
      rating: {
        // to calculate the overall rating based on the coefficients and the ratings, max rating is 5
        overall: Number(Math.min(5,
          (rating.location * location)
          + (rating.amenities * amenities)
          + (rating.food * food)
          + (rating.room * room)
          + (rating.price * price)
          + (rating.tourOperator * tourOperator)).toFixed(2)),
        location: Number(rating.location),
        amenities: Number(rating.amenities),
        food: Number(rating.food),
        price: Number(rating.price),
        room: Number(rating.room),
        tourOperator: Number(rating.tourOperator)
      },
      title: title,
      text: text,
      images: images,
      addedAt: new Date(),
      // add a timestamp, like in mongodb shell
      timestamp: Timestamp.fromNumber(Date.now()),
      likes: 0,
      dislikes: 0,
      abuseReports: 0

    });
    if (!result.acknowledged) {
      new Error(`Oops! We were unable to save this comment! Sorry for the inconvenience. We are working on it.`);
    } else {
      const commentId = result.insertedId.toString();
      // update the tour by 1. finding it by id and 2. adding the comment id to the comments array
      const updateTour = await db.collection(`tours`).updateOne(
        { _id: new ObjectId(tourId) },
        // @ts-ignore
        { $push: { comments: new ObjectId(commentId) } }
      );

      if (!updateTour.acknowledged) {
        new Error(`Oops!
        `);
      }

    }


  } catch (e) {
    throw new Error(`Oops! We were unable to save this comment! Sorry for the inconvenience. We are working on it.`);
  }
  // revalidate the tour page
  revalidatePath(`/`, `layout`);

  return {
    success: `The comment has been successfully added.`
  };

}
