'use server';
import { MongoClient, ObjectId, Timestamp } from 'mongodb';
import { TourInterface } from '@/data/DUMMY_TOURS';
import { revalidatePath } from 'next/cache';
import { FormContactDetailsType } from '@/components/checkout/form/CheckoutFormContactDetails';
import { transformedResultsType } from '@/components/checkout/form/CheckoutFormActivityDetails';
import { OrderInterface } from '@/components/checkout/checkout-details/CheckoutDetails';
import bcrypt from 'bcrypt';

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

///////////////////////////////////////
// IMPORTANT: TOUR(S)

// this function is used to get the items from the database
export async function getTours(limit: number, matchProps: unknown, skip: number = 0, project?: unknown) {

  const client = await clientPromise;
  const db = client.db('viatoursdb');
  const tours = await db.collection('tours')
    .aggregate([{ $match: matchProps }, { $sort: { 'rating.overall': -1 } }, { $skip: skip }, { $limit: limit }]).toArray();

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

export async function getTourById(id: string, incViews?: boolean) {

  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  // if (incViews) {
  //   // increment the views by 1
  //   await db.collection(`tours`).updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } });
  // }

  const tour = await db.collection('tours').aggregate([
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
    { $unwind: { path: '$tourComments', preserveNullAndEmptyArrays: true } },
    { $sort: { 'tourComments.addedAt': -1 } },
    {
      $group: {
        _id: '$_id',
        tourData: { $first: '$$ROOT' },
        tourComments: { $push: '$tourComments' }
      }
    },
    {
      $project: {
        _id: '$tourData._id',
        title: '$tourData.title',
        overview: '$tourData.overview',
        country: '$tourData.country',
        city: '$tourData.city',
        reviews: '$tourData.reviews',
        views: '$tourData.views',
        time: '$tourData.time',
        type: '$tourData.type',
        price: '$tourData.price',
        tags: '$tourData.tags',
        booked: '$tourData.booked',
        images: '$tourData.images',
        duration: '$tourData.duration',
        groupSize: '$tourData.groupSize',
        ages: '$tourData.ages',
        tourHighlights: '$tourData.tourHighlights',
        whatsIncluded: '$tourData.whatsIncluded',
        itinerary: '$tourData.itinerary',
        tourMap: '$tourData.tourMap',
        meetingPoint: '$tourData.meetingPoint',
        available: '$tourData.available',
        onSale: '$tourData.onSale',
        languages: '$tourData.languages',
        rating: '$tourData.rating',
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
              abuseReports: '$$comment.abuse_reports'
            }
          }
        }
      }
    }
  ]).toArray();
  // console.log(`Executing tour: `, tour);
  return JSON.parse(JSON.stringify(tour))[0] as TourInterface;
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

  // console.log(`Executing userExists: (Server)`, userExists);
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

  // rating coefficients
  const location = 0.2;
  const amenities = 0.2;
  const food = 0.15;
  const room = 0.15;
  const price = 0.1;
  const tourOperator = 0.2;

  // console.log(Math.min(5, (rating.location * location) + (rating.amenities * amenities) + (rating.food * food) + (rating.room * room) + (rating.price * price) + (rating.tourOperator * tourOperator)));
  // TODO: Create session for all 4 stages to be executed in one transaction
  // INFO: It is important to execute all 4 stages in one transaction to avoid any issues with the data consistency.

  try {
    /* IMPORTANT: 1/4 STAGE: inserting a new comment to "tourComments" collection
    *   Performing calculation of overall rating based on coefficients. */
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
        rooms: Number(rating.room),
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

      /* IMPORTANT: 2/4 STAGE: adding newly created comment(objectId only) onto a tour
      *   Pushing comment's object id onto comments tour array */
      const commentId = result.insertedId.toString();
      // update the tour by 1. finding it by id and 2. adding the comment id to the comments array
      const updateTour = await db.collection(`tours`).updateOne(
        { _id: new ObjectId(tourId) },
        // @ts-ignore
        { $push: { comments: new ObjectId(commentId) }, $inc: { reviews: 1 } }
      );

      if (!updateTour.acknowledged) {
        new Error(`Oops! We were unable to save this comment! Failed to add comment id to a tour array. We are working on it...`);
      }

      /* IMPORTANT: 3/4 STAGE: gathering all comments related to this specific tour and performing recalculation of
      *   overall rating.*/
      const recalculatedRatings = await db.collection(`tours`).aggregate([
        {
          $match: {
            _id: new ObjectId(tourId)
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
          $unwind: '$tourComments'
        },
        {
          $group: {
            _id: '_id',
            avgOverall: {
              $avg: '$tourComments.rating.overall'
            },
            avgLocation: {
              $avg: '$tourComments.rating.location'
            },
            avgAmenities: {
              $avg: '$tourComments.rating.amenities'
            },
            avgFood: {
              $avg: '$tourComments.rating.food'
            },
            avgPrice: {
              $avg: '$tourComments.rating.price'
            },
            avgRooms: {
              $avg: '$tourComments.rating.rooms'
            },
            avgTourOperator: {
              $avg: '$tourComments.rating.tourOperator'
            }
          }
        }
      ]).toArray();


      // console.log(`Executing recalculatedRatings: `, recalculatedRatings);

      /* IMPORTANT: 4/4 STAGE: recalculated rating, up-to-date stats are pushed to the corresponding tour */
      const updatedRating = {
        overall: Number(recalculatedRatings[0].avgOverall.toFixed(2)),
        location: Number(recalculatedRatings[0].avgLocation.toFixed(2)),
        amenities: Number(recalculatedRatings[0].avgAmenities.toFixed(2)),
        food: Number(recalculatedRatings[0].avgFood.toFixed(2)),
        price: Number(recalculatedRatings[0].avgPrice.toFixed(2)),
        rooms: Number(recalculatedRatings[0].avgRooms.toFixed(2)),
        tourOperator: Number(recalculatedRatings[0].avgTourOperator.toFixed(2))
      };
      const updatedTour = await db.collection(`tours`).updateOne({ _id: new ObjectId(tourId) }, { $set: { rating: updatedRating } });

      if (!updatedTour.acknowledged) {
        new Error(`Oops! We were unable to save this comment! Failed to update the tour rating...  We are working on it
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

export async function
filterTours(
  searchTerm: string,
  sortBy: string,
  tourType?: string[],
  tourTags?: string[],
  tourLanguages?: string[],
  tourRatings?: number[]
) {

  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  let sort = {};

  if (sortBy === `default`) {
    sort = { 'rating.overall': -1 };
  }

  if (sortBy === `a-z`) {
    sort = { title: 1 };
  }

  if (sortBy === `z-a`) {
    sort = { title: -1 };
  }

  if (sortBy === `low-price`) {
    sort = { 'price.children': 1 };
  }

  if (sortBy === `high-price`) {
    sort = { 'price.children': -1 };
  }

  let tourTypeObj = {};
  if (tourType) {
    tourTypeObj = { type: { $in: tourType } };
  }

  let tourTagsObj = {};
  if (tourTags) {
    tourTagsObj = { tags: { $in: tourTags } };
  }
  let tourLanguagesObj = {};
  if (tourLanguages) {
    tourLanguagesObj = { languages: { $in: tourLanguages } };
  }

  let tourRatingsObj = {};
  if (tourRatings) {
    tourRatingsObj = {
      $or: tourRatings.map(rating => {
        if (rating === 5) {
          return { 'rating.overall': { $gte: 4.5 } };
        } else if (rating === 1) {
          return { 'rating.overall': { $gte: 0, $lt: 2 } };
        } else {
          return { 'rating.overall': { $gte: rating, $lt: rating + 1 } };
        }
      })
    };
  }

  let searchTermObj = {};
  if (searchTerm !== `find-all-tours`) {
    searchTermObj = { $text: { $search: searchTerm } };
  }

  console.log(`Executing tourTypeObj: `, tourTypeObj);

  const tours = await db.collection(`tours`).aggregate([
    // IS FOR conjunction of:

    // INFO: 1. Search Term
    { $match: searchTermObj },

    // INFO sort by RATING (DEFAULT)
    { $sort: sort },

    // INFO: FOR TYPE
    { $match: tourTypeObj },
    // INFO:  FOR TAG
    { $match: tourTagsObj },

    // INFO:  FOR LANGUAGE
    { $match: tourLanguagesObj },

    // INFO:  FOR RATING
    { $match: tourRatingsObj },

    {
      $project: {
        country: 1,
        city: 1,
        title: 1,
        rating: 1,
        reviews: 1,
        overview: 1,
        images: 1,
        duration: 1,
        price: 1,
        onSale: 1.
      }
    }
  ]).toArray();
  return JSON.parse(JSON.stringify(tours));


}


///////////////////////////////////////
// IMPORTANT: ORDER
export async function createOrder(contactDetails: FormContactDetailsType,
                                  activityDetails: transformedResultsType, order: OrderInterface) {

  const client = await clientPromise;
  const db = client.db(`viatoursdb`);
  console.log(`Executing contactDetails: `, contactDetails);
  console.log(`Executing activityDetails: `, activityDetails);
  console.log(`Executing order: `, order);

  const isUserExists = false;

  if (!contactDetails || !activityDetails || !order) {
    throw new Error(`Failed to get form details!`);
  }

  const transformedOrder = {
    // this one would be generated by mongodb and can be only an ObjectId(omitted here)
    _id: new ObjectId(),
    // should be an ObjectId
    tourId: new ObjectId(order.tourId),
    tourTitle: order.tourTitle,
    // can be null or an ObjectId
    userId: !isUserExists ? null : new ObjectId(`HereComesTheUserId`),

    booking: {
      // should be a date in ISO format
      date: new Date(order.date).toISOString(),
      // should be a string
      time: order.time,
      tickets: {
        // all props should be numbers
        overall: Number(order.adultTickets) + Number(order.youthTickets) + Number(order.childrenTickets),
        adultTickets: Number(order.adultTickets),
        youthTickets: Number(order.youthTickets),
        childrenTickets: Number(order.childrenTickets)
      },
      extra: {
        // all props can be either true or false
        servicePerBooking: !!order.servicePerBooking,
        servicePerPerson: !!order.servicePerPerson
      },
      // should be a number
      totalPrice: order.totalPrice
    },
    contactDetails: {
      // should be a string
      firstName: contactDetails.firstName,
      // should be a string
      lastName: contactDetails.lastName,
      // should be a string
      email: contactDetails.email,
      // should be a boolean
      getEmailsWithOffers: contactDetails.getEmailsWithOffers,
      // should be a number
      phone: String(contactDetails.phone)
    },
    activityDetails: {
      // each prop should be rather an empty array or {firstName: string, lastName: string}[] format
      adults: activityDetails.adults,
      youths: activityDetails.youths,
      children: activityDetails.children
    },
    // meeting point should be an object
    // in this format: {title: string; location: {type: "Point" | "Polygon", coordinates: number[]}, city: string; state: string; country: string }
    meetingPoint: order.meetingPoint,
    // should be a string
    tourLanguage: activityDetails.tourLanguage,
    // should be a string or false
    // @ts-ignore
    specialRequirements: activityDetails.specialRequirements ? activityDetails.specialRequirements.trim() : false,
    extraDetails: {
      refund: {
        // can be false or true
        available: false,
        // can be false or true
        requested: false
      },
      cancellation: {
        // can be false or true
        available: true,
        // can be false or true
        requested: false
      },
      // should be a string in ISO format
      createdAt: new Date().toISOString(),
      // should be a timestamp which we have in mongodb
      timestamp: Timestamp.fromNumber(Date.now()),
      // can be false or { promo: string }
      promoApplied: false,
      // can be null or a number
      tourDiscount: null,
      state: {
        // should be a string
        status: `pending`,
        // can be false or true
        confirmed: false,
        // can be false or true
        paid: false,
        // can be false or true
        refunded: false,
        // can be false or true
        cancelled: false
      }
    }

  };

  console.log(`transformedOrder: `, transformedOrder);

  const createdOrder = await db.collection(`orders`).insertOne(transformedOrder);

  console.log(`Executing createdOrder: `, createdOrder);

  if (!createdOrder) {
    throw new Error(`Failed to create an order!`);
  } else {
    console.log(`createdOrder: `, createdOrder);
    return createdOrder;
  }

}

export async function handleOrder(perform: `deletion` | `changeStatus` | `fetchById`, id: string) {
  try {
    const client = await clientPromise;
    const db = client.db(`viatoursdb`);


    if (perform === `fetchById`) {
      const order = await db.collection(`orders`).findOne({ _id: new ObjectId(id) });

      if (!order) {
        new Error(`Failed to find the order with the id ${id}`);
      }
      return order;
    }

    if (perform === `changeStatus`) {
      console.log(`Executing changeStatus: `, id);

      const updatedOrder = await db.collection(`orders`)
        .updateOne({ _id: new ObjectId(id) }, {
          $set: {
            'extraDetails.state': {
              status: `booked`,
              confirmed: true,
              paid: true,
              refunded: false,
              cancelled: false
            }
          }
        });
      console.log(`Executing updatedOrder: `, updatedOrder);

      const order = await db.collection(`orders`).findOne({ _id: new ObjectId(id) });

      if (!order) {
        new Error(`Failed to find the order with the id ${id}`);
      }

      const updatedTour =
        await db.collection(`tours`).updateOne({ _id: new ObjectId(order!.tourId) }, { $inc: { booked: 1 } });

      if (updatedTour) {
        new Error(`Failed to update the tour with the id ${order!.tourId}`);
      }

      revalidatePath(`/`, `layout`);
      return updatedOrder;

    }

    if (perform === `deletion`) {
      const deleteOrder = await db.collection(`orders`).deleteOne({ _id: new ObjectId(id) });

      if (!deleteOrder) {
        new Error(`Failed to delete the order with the id ${id}`);
      }
    }

  } catch (e) {
    throw new Error(`Failed to handle the order! ${e}`);
  }
}

///////////////////////////////////////
// IMPORTANT: USER

export async function getUser(filter: {}, options?: {}) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);
  const user = await db.collection(`users`).aggregate([{ $match: filter }, { $project: options }]).toArray();

  console.log(`Executing user: `, user);

  return JSON.parse(JSON.stringify(user));
}

type createUserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type UserType = {
  image: null | `string`;
  firstName: string;
  registeredManually: boolean;
  lastName: string;
  email: string;
  password: string | null;
  phone: string | null;
  orders: string[];
  notifications: UserNotificationsType[];
  wishlist: string[];
  savedArticles: string[];
  extra: {
    signedOnNewsletter: boolean;
  }
}

type UserNotificationsType = {
  type: `green` | `red` | `orange` | `darkOrange`;
  icon: `smile` | `bell` | `key` | `map` | `letter` | `sale` | `ticket` | `money`;
  addedAt: Date;
  timestamp: Timestamp;
  text: string;
}


export async function createUser(formData: createUserType, createViaProvider?: boolean) {
  try {

    const client = await clientPromise;
    const db = client.db(`viatoursdb`);

    const userExists = await getUser({ email: formData.email }, { email: 1, _id: 0 });

    if (userExists.length > 0) {
      return {
        error: `The user with the email ${formData.email} already exists. Please sign in to proceed.`
      };
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      return {
        error: `Please fill in all the fields.`
      };
    }

    if (formData.password !== formData.confirmPassword) {
      return {
        error: `The passwords do not match.`
      };
    }

    const transformedUser: UserType = {
      image: null,
      registeredManually: true,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: await bcrypt.hash(formData.password, 12),
      phone: null,
      orders: [],
      notifications: [{
        type: `green`,
        icon: `smile`,
        addedAt: new Date(),
        timestamp: Timestamp.fromNumber(Date.now()),
        text: `Welcome aboard! Your account was successfully registered!`
      }],
      wishlist: [],
      savedArticles: [],
      extra: {
        signedOnNewsletter: false
      }
    };

    // un-hash password
    // const userPassword = await bcrypt.compare(formData.password, transformedUser.password);
    // const userEmail = await bcrypt.compare(formData.email, transformedUser.email);
    // console.log(`Executing userPassword: `, userPassword);
    // console.log(`Executing userEmail: `, userEmail);

    const createdUser = await db.collection(`users`).insertOne(transformedUser);

    if (!createdUser.acknowledged) {
      return {
        error: `Failed to create a user.`
      };
    }

    return {
      success: `The user was successfully created.`,
      acknowledged: createdUser.acknowledged,
      insertedId: createdUser.insertedId
    };
    // console.log(`Executing formData on Server: `, formData);
    // console.log(`Executing transformedUser on Server: `, transformedUser);


  } catch (e) {
    throw new Error(`An error occurred while creating a user. Please try again later. ${e}`);
  }
}

export type updateUserType = {
  userId: string;
  type: `ADDED_COMMENT` | `MADE_ORDER`;
  data: unknown;
}

export async function pushNotificationToUserDocument(userId: string, type: `ADDED_COMMENT` | `MADE_ORDER`, data: unknown) {

  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  if (type === `ADDED_COMMENT`) {
    const addedCommentNotification: UserNotificationsType = {
      type: `darkOrange`,
      icon: `map`,
      addedAt: new Date(),
      timestamp: Timestamp.fromNumber(Date.now()),
      // @ts-ignore
      text: `You left a comment on <a href='tours/${data.tourId}'>“${data.tourTitle.slice(0, 40)}...”</a> tour!`
    };
    // find this user by his email, and add a notification object to array.

    const result = await db.collection(`users`)
    // @ts-ignore
      .updateOne({ _id: new ObjectId(userId) }, { $push: { notifications: addedCommentNotification } });

    return result;
  }
}

