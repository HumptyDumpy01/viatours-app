'use server';
import { MongoClient, ObjectId, Timestamp } from 'mongodb';
import { TourInterface } from '@/data/DUMMY_TOURS';
import { revalidatePath } from 'next/cache';
import { FormContactDetailsType } from '@/components/checkout/form/CheckoutFormContactDetails';
import { transformedResultsType } from '@/components/checkout/form/CheckoutFormActivityDetails';
import { OrderInterface } from '@/components/checkout/checkout-details/CheckoutDetails';
import bcrypt from 'bcrypt';
import { comment } from 'postcss';
import { notFound, redirect } from 'next/navigation';
import { FormDataType } from '@/components/account-settings/contents/user-profile/UserProfile';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationCode } from '@/lib/mail';

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

  // check if input must be a 24 character hex string, 12 byte Uint8Array, or an integer
  if (!ObjectId.isValid(id)) {
    notFound();
  }

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
  session: {
    user: {
      email: string;
      name: string;
    }
  }
}

export async function
submitTourComment({
                    rating,
                    email,
                    user,
                    title,
                    text,
                    images,
                    tourId,
                    session
                  }: submitTourComment) {

  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const userExists = await getUser({ email: email }, { email: 1, _id: 0 });

  // console.log(`Executing userExists: (Server)`, userExists);

  if (!session) {
    if (userExists.length > 0) {
      return {
        error: `The user with the email ${email} already exists. Please sign in to proceed.`
      };
    }
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
      likes: [],
      dislikes: [],
      abuseReports: []

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

  // const isUserExists = false;

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

export async function getUser(filter: {}, options?: {}, unwind: boolean = false) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  if (!unwind) {
    const user = await db.collection(`users`).aggregate([{ $match: filter }, { $project: options }]).toArray();


    console.log(`Executing user: `, user);

    return JSON.parse(JSON.stringify(user));
  } else {
    console.log(`User Email`, filter);


    /* IMPORTANT: if user's wishlist/savedArticles/orders is empty, an empty arr would be returned
    *   from this pipeline. It is done by a condition in the end of the pipeline.
    *   without  this condition the format in which data gets returned would be horrible.*/

    // Unwind an entire user document, particularly talking about wishlisted tours,
    // saved articles, orders
    const unwoundUser = await db.collection('users').aggregate([
      { $match: filter },

      // Ensure wishlist, notifications, and savedArticles have default values
      {
        $addFields: {
          wishlist: { $ifNull: ['$wishlist', []] },
          notifications: { $ifNull: ['$notifications', []] },
          savedArticles: { $ifNull: ['$savedArticles', []] }
        }
      },

      {
        $lookup: {
          from: 'tours',
          localField: 'wishlist',
          foreignField: '_id',
          as: 'wishlistedTours'
        }
      },

      { $unwind: { path: '$wishlistedTours', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$_id',
          email: { $first: '$email' },
          image: { $first: '$image' },
          firstName: { $first: '$firstName' },
          lastName: { $first: '$lastName' },
          password: { $first: '$password' },
          phone: { $first: '$phone' },
          orders: { $first: '$orders' },
          notifications: { $first: '$notifications' },
          savedArticles: { $first: '$savedArticles' },
          registeredManually: { $first: '$registeredManually' },
          twoFactorAuthEnabled: { $first: '$twoFactorAuthEnabled' },
          wishlist: {
            $push: {
              _id: { $ifNull: ['$wishlistedTours._id', null] },  // Push null-safe values
              title: { $ifNull: ['$wishlistedTours.title', null] },
              image: { $ifNull: [{ $arrayElemAt: ['$wishlistedTours.images', 0] }, null] },
              location: {
                $cond: {
                  if: { $and: ['$wishlistedTours.city', '$wishlistedTours.country'] },
                  then: { $concat: ['$wishlistedTours.city', ', ', '$wishlistedTours.country'] },
                  else: null
                }
              },
              rating: { $ifNull: ['$wishlistedTours.rating.overall', 0] },
              reviews: { $ifNull: ['$wishlistedTours.reviews', 0] },
              duration: { $ifNull: ['$wishlistedTours.duration', null] },
              fromPrice: { $ifNull: ['$wishlistedTours.price.children', null] }
            }
          }
        }
      },

      { $lookup: { from: 'orders', localField: 'orders', foreignField: '_id', as: 'userOrders' } },
      { $unwind: { path: '$userOrders', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$_id',
          email: { $first: '$email' },
          firstName: { $first: '$firstName' },
          lastName: { $first: '$lastName' },
          image: { $first: '$image' },
          password: { $first: '$password' },
          phone: { $first: '$phone' },
          notifications: { $first: '$notifications' },
          savedArticles: { $first: '$savedArticles' },
          registeredManually: { $first: '$registeredManually' },
          twoFactorAuthEnabled: { $first: '$twoFactorAuthEnabled' },
          wishlist: { $last: '$wishlist' },
          orders: {
            $push: {
              _id: { $ifNull: ['$userOrders._id', null] },
              tourId: { $ifNull: ['$userOrders.tourId', null] },
              date: { $ifNull: ['$userOrders.booking.date', null] },
              contactDetails: { $ifNull: ['$userOrders.contactDetails', null] },
              tickets: { $ifNull: ['$userOrders.booking.tickets', null] },
              price: { $ifNull: ['$userOrders.booking.totalPrice', null] },
              extraDetails: { $ifNull: ['$userOrders.extraDetails', null] }
            }
          }
        }
      },
      { $unwind: { path: '$orders', preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: 'tours',
          localField: 'orders.tourId',
          foreignField: '_id',
          as: 'orderTours'
        }
      },
      {
        $group: {
          _id: '$_id',
          email: { $first: '$email' },
          firstName: { $first: '$firstName' },
          lastName: { $first: '$lastName' },
          image: { $first: '$image' },
          password: { $first: '$password' },
          phone: { $first: '$phone' },
          notifications: { $first: '$notifications' },
          savedArticles: { $first: '$savedArticles' },
          registeredManually: { $first: '$registeredManually' },
          twoFactorAuthEnabled: { $first: '$twoFactorAuthEnabled' },
          wishlist: { $last: '$wishlist' },
          orders: {
            $push: {
              _id: '$orders._id',
              date: '$orders.date',
              totalPrice: '$orders.price',
              tickets: '$orders.tickets',
              contactDetails: { $ifNull: ['$orders.contactDetails', null] },
              extraDetails: '$orders.extraDetails',
              tour: {
                _id: { $arrayElemAt: ['$orderTours._id', 0] },
                title: { $arrayElemAt: ['$orderTours.title', 0] },
                location: {
                  $cond: {
                    if: { $and: [{ $arrayElemAt: ['$orderTours.city', 0] }, { $arrayElemAt: ['$orderTours.country', 0] }] },
                    then: { $concat: [{ $arrayElemAt: ['$orderTours.city', 0] }, ', ', { $arrayElemAt: ['$orderTours.country', 0] }] },
                    else: null
                  }
                },
                image: { $arrayElemAt: [{ $arrayElemAt: ['$orderTours.images', 0] }, 0] },
                rating: { $arrayElemAt: ['$orderTours.rating.overall', 0] },
                reviews: { $arrayElemAt: ['$orderTours.reviews', 0] },
                duration: { $arrayElemAt: ['$orderTours.duration', 0] }
              }
            }
          }
        }
      },

      // IMPORTANT: Add this final stage to replace nulls with empty arrays
      //  DO NOT REMOVE THIS STAGE
      {
        $addFields: {
          wishlist: {
            $cond: {
              if: { $ne: [{ $arrayElemAt: ['$wishlist._id', 0] }, null] },
              then: '$wishlist',
              else: []
            }
          },
          orders: {
            $cond: {
              if: { $ne: [{ $arrayElemAt: ['$orders._id', 0] }, null] },
              then: '$orders',
              else: []
            }
          }
        }
      }
    ]).toArray();

    // console.log(`Executing unwoundUser: `, unwoundUser);
    // console.log(`Executing unwoundUser.wishlist: `, unwoundUser[0].wishlist);
    // console.log(`Executing unwoundUser.orders: `, unwoundUser[0].orders);

    if (!unwoundUser || unwoundUser.length === 0) {
      return {
        error: true,
        message: `Failed to find the user with the email ${filter}`
      };
    } else {
      return JSON.parse(JSON.stringify(unwoundUser));
    }
  }

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
  twoFactorAuthEnabled: boolean;
}

export type UserNotificationsType = {
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
      },
      twoFactorAuthEnabled: false
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

export async function createUserWhenAuthViaProvider(formData: UserType) {
  try {
    const client = await clientPromise;
    const db = client.db('viatoursdb');

    const userExists = await getUser({ email: formData.email }, { email: 1, _id: 0 });

    if (userExists.length > 0) {
      return {
        error: `The user with the email ${formData.email} already exists. Please sign in to proceed.`
      };
    }

    const createdUser = await db.collection('users').insertOne(formData);

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

  // @ts-ignore
  const transformedTourTitle = data.tourTitle.length > 40 ? data.tourTitle.slice(0, 40) + `...` : data.tourTitle;

  if (type === `ADDED_COMMENT`) {
    const addedCommentNotification: UserNotificationsType = {
      type: `darkOrange`,
      icon: `letter`,
      addedAt: new Date(),
      timestamp: Timestamp.fromNumber(Date.now()),
      text: `You left a comment on <a class="highlighted text-decoration-none" href='tours/${(data as {
        tourId: string
      }).tourId}'>“${transformedTourTitle}”</a> tour!`
    };
    // find this user by his email, and add a notification object to array.

    const result = await db.collection(`users`)
      // @ts-ignore
      .updateOne({ _id: new ObjectId(userId) }, { $push: { notifications: addedCommentNotification } });

    return result;
  }
}

export async function addOrderIdToUserDocument(
  orderId: string,
  userEmail: string,
  tourId: string,
  tourTitle: string,
  userPhoneNumber: string,
  getEmailsWithOffers: boolean
) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  if (!orderId && userEmail) {
    throw new Error(`No order id or user email provided.`);
  }

  const IsUserExists = await getUser({ email: userEmail }, { email: 1, _id: 0, phone: 1 });

  // if not, then just return. No need to save it onto user history.
  // This is the benefit for authenticated users.
  if (IsUserExists.length === 0) {
    return;
  }


  const user = await getUser({ email: userEmail }, { email: 1, _id: 0, phone: 1, extra: 1 });

  let userPhone: string = ``;

  // check if user exists and if his phone number is null
  if (user.length > 0 && !user[0].phone) {
    // set the phone number the one got from the form
    userPhone = userPhoneNumber;
  }

  // console.log(`Executing tourId: `, tourId);
  // console.log(`Executing tourTitle: `, tourTitle);

  // Push new notification to the user's document
  const newNotificationOrder: UserNotificationsType = {
    type: `green`,
    icon: `map`,
    addedAt: new Date(),
    timestamp: Timestamp.fromNumber(Date.now()),
    text: `You successfully bought tickets to <a class="highlighted text-decoration-none" href="tours/${tourId}">“${tourTitle}”<a/> tour!`
  };

  // console.log(`Executing getEmailsWithOffers: `, getEmailsWithOffers);
  // console.log(`Executing user:
  // user[0].extra.signedOnNewsletter === false`, user[0].extra.signedOnNewsletter === false);

  // check if you have user email in the newsletter collection, if not, add it.
  if (getEmailsWithOffers && user[0].extra.signedOnNewsletter === false) {

    const insertEmailToNewsletter = await db.collection('newsletter').updateOne(
      { email: userEmail },
      { $setOnInsert: { email: userEmail } },
      { upsert: true }
    );

    if (!insertEmailToNewsletter.acknowledged) {
      throw new Error(`Failed to insert email to the newsletter collection.`);
    }

    const updateUser = await db.collection(`users`)
      .updateOne({ email: userEmail }, { $set: { 'extra.signedOnNewsletter': true } });

    if (!updateUser.acknowledged) {
      throw new Error(`Failed to update the user document.`);
    }
  }


  if (userPhone.length > 0) {
    const result = await db.collection('users').updateOne(
      { email: userEmail },
      {
        // @ts-ignore
        $push: {
          orders: new ObjectId(orderId),
          notifications: newNotificationOrder
        },

        // Push phone number to the user document
        $set: {
          phone: userPhone
        }
      }
    );

    if (!result) {
      throw new Error(` Failed to add an order id to the user document.`);
    }

    return {
      acknowledged: result.acknowledged
    };

  } else {
    const result = await db.collection('users').updateOne(
      { email: userEmail },
      {
        // @ts-ignore
        $push: {
          orders: new ObjectId(orderId),
          notifications: newNotificationOrder
        }
      }
    );

    if (!result) {
      throw new Error(` Failed to add an order id to the user document.`);
    }

    return {
      acknowledged: result.acknowledged
    };
  }
}


export async function findWishlistedTour(tourId: string, userEmail: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const user = await getUser({ email: userEmail }, { email: 1, _id: 0, wishlist: 1 });

  if (user.length === 0) {
    throw new Error(`The user with the email ${userEmail} does not exist.`);
  }

  const isTourWishlisted = user[0].wishlist.includes(tourId);

  return isTourWishlisted;
}


export type DeleteIndividualUserItemType = {
  userEmail: string;
  itemId: string;
  type: `WISHLIST` | `SAVED_ARTICLES`;
}

export async function deleteIndividualUserItem(userEmail: string, itemId: string, type: `WISHLIST` | `SAVED_ARTICLES`) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  if (!userEmail || !itemId || !type) {
    return {
      error: true,
      message: `Missing required fields.`,
      status: 400
    };
  }

  const user = await getUser({ email: userEmail }, { email: 1, _id: 0, wishlist: 1, savedArticles: 1 });

  if (user.length === 0) {
    return {
      error: true,
      message: `The user with the email ${userEmail} does not exist.`,
      status: 404
    };
  }

  if (type === `WISHLIST`) {
    const response = await db.collection(`users`).updateOne({ email: userEmail }, {
      // @ts-ignore
      $pull: {
        wishlist: new ObjectId(itemId)
      }
    });

    if (!response.acknowledged) {
      return {
        error: true,
        message: `Failed to delete the item from the wishlist.`,
        status: 500
      };
    } else {
      return {
        error: false,
        message: `The item was successfully deleted from the wishlist.`,
        status: 200
      };
    }
  }
  if (type === `SAVED_ARTICLES`) {
    const response = await db.collection(`users`).updateOne({ email: userEmail }, {
      // @ts-ignore
      $pull: {
        savedArticles: new ObjectId(itemId)
      }
    });

    if (!response.acknowledged) {
      return {
        error: true,
        message: `Failed to delete the item from the Saved Articles.`,
        status: 500
      };
    } else {
      return {
        error: false,
        message: `The item was successfully deleted from the Saved Articles.`,
        status: 200
      };
    }

  }


}

export async function handleAddRemoveFromWishlist(isWishlisted: boolean, tourId: string, userEmail: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  if (isWishlisted) {
    // remove from wishlist
    const result = await db.collection(`users`).updateOne({ email: userEmail }, {
      // @ts-ignore
      $pull: {
        wishlist: new ObjectId(tourId)
      }
    });

    if (!result.acknowledged) {
      return {
        acknowledged: false
      };
    }

    return {
      acknowledged: result.acknowledged,
      status: `REMOVED`
    };

  } else {
    // add to wishlist
    const result = await db.collection(`users`).updateOne({ email: userEmail }, {
      // @ts-ignore
      $push: {
        wishlist: new ObjectId(tourId)
      }
    });

    if (!result.acknowledged) {
      return {
        acknowledged: false
      };
    }

    return {
      acknowledged: result.acknowledged,
      status: `ADDED`
    };
  }
}

export type handleCommentActionType = {
  commentId: string;
  userEmail: string;
  action: `LIKE` | `DISLIKE`;

}

export async function handleCommentAction(commentId: string, userEmail: string, action: `LIKE` | `DISLIKE`) {
  try {
    const client = await clientPromise;
    const db = client.db(`viatoursdb`);

    // fetch  the comment
    const fetchedComment = await db.collection(`tourComments`).aggregate(
      [{ $match: { _id: new ObjectId(commentId) } }, { $project: { likes: 1, dislikes: 1 } }]).toArray();

    if (fetchedComment.length === 0) {
      new Error(`Failed to fetch the comment.`);
    }

    // console.log(`Executing fetchedComment: `, fetchedComment[0]);

    // console.log(`Executing commentId on Server: `, commentId);
    // console.log(`Executing userEmail on Server: `, userEmail);
    // console.log(`Executing action on Server: `, action);


    if (action === `LIKE`) {

      // if the user already liked comment , and he did not dislike it before
      if (fetchedComment[0].likes.includes(userEmail) && !fetchedComment[0].dislikes.includes(userEmail)) {
        //  REMOVE THE LIKE
        const removedLike = await db.collection(`tourComments`).updateOne({ _id: new ObjectId(commentId) }, {
          // @ts-ignore
          $pull: {
            likes: userEmail
          }
        });

        if (!removedLike.acknowledged) {
          return {
            acknowledged: false
          };
        } else {
          revalidatePath(`/`, `layout`);
          return {
            acknowledged: removedLike.acknowledged,
            status: `REMOVED`
          };
        }
      }

      // if the user did not like comment, and he did not dislike it before
      if (!fetchedComment[0].likes.includes(userEmail) && !fetchedComment[0].dislikes.includes(userEmail)) {
        const pushedLike = await db.collection(`tourComments`).updateOne({ _id: new ObjectId(commentId) }, {
          // @ts-ignore
          $push: {
            likes: userEmail
          }
        });

        if (!pushedLike.acknowledged) {
          return {
            acknowledged: false
          };
        } else {
          revalidatePath(`/`, `layout`);
          return {
            acknowledged: pushedLike.acknowledged,
            status: `LIKED`
          };
        }
      }

      // if the user disliked a comment before, and he did not like it
      if (fetchedComment[0].dislikes.includes(userEmail) && !fetchedComment[0].likes.includes(userEmail)) {
        const response = await db.collection(`tourComments`).updateOne({ _id: new ObjectId(commentId) }, {
          // @ts-ignore
          $pull: {
            dislikes: userEmail
          },
          // @ts-ignore
          $push: {
            likes: userEmail
          }
        });

        if (!response.acknowledged) {
          return {
            acknowledged: false
          };
        } else {
          revalidatePath(`/`, `layout`);
          return {
            acknowledged: response.acknowledged,
            status: `LIKED_AND_REMOVED_DISLIKE`
          };
        }
      }

    }

    if (action === `DISLIKE`) {

      // if the user already disliked the comment, and he did not like it before
      if (fetchedComment[0].dislikes.includes(userEmail) && !fetchedComment[0].likes.includes(userEmail)) {
        //  remove the dislike
        const removedDislike = await db.collection(`tourComments`).updateOne({ _id: new ObjectId(commentId) }, {
          // @ts-ignore
          $pull: {
            dislikes: userEmail
          }
        });

        if (!removedDislike.acknowledged) {
          return {
            acknowledged: false
          };
        } else {
          revalidatePath(`/`, `layout`);
          return {
            acknowledged: removedDislike.acknowledged,
            status: `REMOVED_DISLIKE`
          };
        }
      }

      // if the user did not dislike the comment before, and he did not like either

      if (!fetchedComment[0].dislikes.includes(userEmail) && !fetchedComment[0].likes.includes(userEmail)) {

        const addedDislike = await db.collection(`tourComments`).updateOne({ _id: new ObjectId(commentId) }, {
          // @ts-ignore
          $push: {
            dislikes: userEmail
          }
        });

        if (!addedDislike.acknowledged) {
          return {
            acknowledged: false
          };
        } else {
          revalidatePath(`/`, `layout`);
          return {
            acknowledged: addedDislike.acknowledged,
            status: `ADDED_DISLIKE`
          };
        }
      }

      // if the user did not dislike comment, but he did like it before

      if (!fetchedComment[0].dislikes.includes(userEmail) && fetchedComment[0].likes.includes(userEmail)) {

        const response = await db.collection(`tourComments`).updateOne({ _id: new ObjectId(commentId) }, {
          // @ts-ignore
          $pull: {
            likes: userEmail
          },
          // @ts-ignore
          $push: {
            dislikes: userEmail
          }
        });

        if (!response.acknowledged) {
          return {
            acknowledged: false
          };
        } else {
          revalidatePath(`/`, `layout`);
          return {
            acknowledged: response.acknowledged,
            status: `ADDED_DISLIKE_AND_REMOVED_LIKE`
          };
        }
      }

    }

    revalidatePath(`/`, `layout`);
  } catch (e) {
    throw new Error(`Failed to handle the comment action. ${e}`);
  }

}

export type UpdateUserDataType = {
  formData: FormDataType;
  method: `UPDATE_WITHOUT_PASSWORD` | `UPDATE_WITH_PASSWORD`;
}

export async function updateUserData(formData: FormDataType, method: `UPDATE_WITHOUT_PASSWORD` | `UPDATE_WITH_PASSWORD`) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const isUserExists = await getUser({ email: formData.email }, { email: 1, _id: 0 });

  if (isUserExists.length === 0) {
    return {
      error: `The user with the email ${formData.email} does not exist.`
    };
  }

  if (formData.email === ``) {
    return {
      error: `The email cannot be empty.`
    };
  }
  if (formData.firstName === ``) {
    return {
      error: `The first name cannot be empty.`
    };
  }
  if (formData.lastName === ``) {
    return {
      error: `The last name cannot be empty.`
    };
  }


  if (method === `UPDATE_WITHOUT_PASSWORD`) {
    console.log(`The UPDATE_WITHOUT_PASSWORD method is executed.`);

    console.log(`Executing formData: `, formData);

    if (formData.image === null) {
      const updatedUser = await db.collection(`users`).updateOne({ email: formData.email }, {
        $set: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone
        }
      });

      if (!updatedUser.acknowledged) {
        return {
          error: `Failed to update the user.`
        };
      } else {
        console.log(`Executing updatedUser: `, updatedUser);
        return {
          success: `The user was successfully updated.`,
          acknowledged: updatedUser.acknowledged
        };
      }
    }

    if (formData.image) {
      const updatedUser = await db.collection(`users`).updateOne({ email: formData.email }, {
        $set: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          image: formData.image
        }
      });

      if (!updatedUser.acknowledged) {
        return {
          error: `Failed to update the user.`
        };
      } else {
        return {
          success: `The user was successfully updated.`,
          acknowledged: updatedUser.acknowledged
        };
      }

    }

  }

  if (method === `UPDATE_WITH_PASSWORD` && formData.password?.trim() !== ``) {

    if (!formData.password || formData.password.length < 8 || formData.password.length > 100) {
      return {
        error: `The password must be between 8 and 100 characters long.`
      };
    }


    if (formData.image) {
      const response = await db.collection(`users`).updateOne({ email: formData.email }, {
        $set: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          image: formData.image,
          password: await bcrypt.hash(formData.password, 12)
        }
      });

      if (!response.acknowledged) {
        return {
          error: `Failed to update the user.`
        };
      } else {
        return {
          success: `The user was successfully updated.`,
          acknowledged: response.acknowledged
        };
      }
    }
    if (formData.image === null) {
      const response = await db.collection(`users`).updateOne({ email: formData.email }, {
        $set: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          password: await bcrypt.hash(formData.password, 12)
        }
      });

      if (!response.acknowledged) {
        return {
          error: `Failed to update the user.`
        };
      } else {
        return {
          success: `The user was successfully updated.`,
          acknowledged: response.acknowledged
        };
      }
    }

    console.log(`The UPDATE_WITH_PASSWORD method is executed.`);
  }

  revalidatePath(`/`, `layout`);

}

export type CompareUserPasswordType = {
  email: string;
  oldPassword: string;
}

export async function compareUserPassword(email: string, oldPassword: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const user = await getUser({ email: email }, { email: 1, password: 1, _id: 0 });

  if (user.length === 0) {
    return {
      error: `The user with the email ${email} does not exist.`
    };
  }
  const passwordMatch = await bcrypt.compare(oldPassword, user[0].password);

  return {
    passwordMatch: passwordMatch
  };
}

///////////////////////////////////////

/* IMPORTANT: NEWSLETTER */
export async function addOrRemoveNewsletterEmail(email: string, method: `ADD` | `REMOVE`) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  if (!email || !email.trim().includes(`@`)) {
    return {
      error: `No email provided.`
    };
  }

  if (method === `ADD`) {
    const insertEmailToNewsletter = await db.collection('newsletter').updateOne(
      { email: email },
      { $setOnInsert: { email: email } },
      { upsert: true }
    );

    if (!insertEmailToNewsletter.acknowledged) {
      throw new Error(`Failed to insert email to the newsletter collection.`);
    }

    return {
      acknowledged: insertEmailToNewsletter.acknowledged
    };
  }

  if (method === `REMOVE`) {

    const response = await db.collection(`newsletter`).deleteOne({ email: email });

    if (!response.acknowledged) {
      throw new Error(`Failed to remove email from the newsletter collection.`);
    }

    return {
      error: false,
      acknowledged: response.acknowledged
    };
  }

}

export async function userSignedUpToNewsletter(userEmail: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  if (!userEmail) {
    return {
      error: `No user email provided.`
    };
  }

  const response = await db.collection(`newsletter`).findOne({ email: userEmail });

  if (!response?._id) {
    return {
      // means that the user is not signed up to the newsletter
      status: false
    };

  } else {
    return {
      // means that the user is signed up to the newsletter
      status: true
    };
  }
}

export type DeleteUserDataType = {
  as: `notifications` | `wishlist` | `savedArticles` | `deleteAccount`;
  userEmail: string;
}

export async function deleteUserData(as: `notifications` | `wishlist` | `savedArticles` | `deleteAccount`, userEmail: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const isUserExists = await getUser({ email: userEmail }, { email: 1, _id: 0 });

  if (isUserExists.length === 0) {
    return {
      error: `The user with the email ${userEmail} does not exist.`
    };
  }

  if (!userEmail) {
    return {
      error: `No user email provided.`
    };
  }

  if (as === `deleteAccount`) {
    // TODO: delete user account by email provider in API route
    const response = await db.collection(`users`).deleteOne({ email: userEmail });

    if (!response.acknowledged) {
      return {
        error: `Failed to delete the user account.`
      };
    } else {
      // redirect to the home page when the account is deleted
      redirect(`/`);
    }

  }

  if (as === `notifications`) {

    const response = await db.collection(`users`).updateOne({ email: userEmail }, {
      $set: {
        notifications: []
      }
    });

    if (!response.acknowledged) {
      return {
        error: `Failed to delete notifications.`
      };
    } else {
      return {
        success: `Notifications were successfully deleted.`,
        acknowledged: response.acknowledged
      };
    }

  }


  if (as === `wishlist`) {

    const response = await db.collection(`users`).updateOne({ email: userEmail }, {
      $set: {
        wishlist: []
      }
    });

    if (!response.acknowledged) {
      return {
        error: `Failed to delete notifications.`
      };
    } else {
      return {
        success: `Notifications were successfully deleted.`,
        acknowledged: response.acknowledged
      };
    }

  }


  if (as === `savedArticles`) {

    const response = await db.collection(`users`).updateOne({ email: userEmail }, {
      $set: {
        savedArticles: []
      }
    });

    if (!response.acknowledged) {
      return {
        error: `Failed to delete notifications.`
      };
    } else {
      return {
        success: `Notifications were successfully deleted.`,
        acknowledged: response.acknowledged
      };
    }

  }

}

///////////////////////////////////////
/* IMPORTANT: USER ORDERS OPERATIONS */

export type ToggleOrderRequestType = {
  type: `Refund` | `Cancellation`;
  orderId: string;
  userEmail: string;
  userPhone: string;
}

export type OrderRefundsType = {
  orderId: string;
  status: `pending` | `approved` | `rejected`;
  userEmail: string;
  userPhone: string;
  userInitials: string;
};

type OrderRetrievalType = {
  _id: string;
  contactDetails: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    getEmailsWithOffers: boolean;
  };
  tourId: string;
  tourTitle: string;
  extraDetails: {
    refund: {
      available: boolean;
      requested: boolean;
    };
    cancellation: {
      available: boolean;
      requested: boolean;
    };
  }
};

export async function toggleOrderRequest(type: `Refund` | `Cancellation`,
                                         orderId: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  // Check if the order exists
  const order = await db.collection(`orders`)
    .findOne({ _id: new ObjectId(orderId) }) as OrderRetrievalType | null;


  if (!order) {
    return {
      error: true,
      message: `The order with the ID ${orderId} does not exist.`,
      status: 404
    };
  }

  if (type === `Refund`) {

    // Check if the extraDetails.refund.available is true
    // or if extraDetails.refund.requested is true
    if (!order.extraDetails.refund.available || order.extraDetails.refund.requested) {
      return {
        error: true,
        message: `The refund is not available for this order.`,
        status: 400
      };
    }

    // Update the order with the refund request
    // by making extraDetails.refund.available false and
    // extraDetails.refund.requested true
    const response = await db.collection(`orders`).updateOne({ _id: new ObjectId(orderId) }, {
      $set: {
        'extraDetails.refund.available': false,
        'extraDetails.refund.requested': true
      }
    });

    if (!response.acknowledged) {
      return {
        error: true,
        message: `Failed to request a refund for the order.`,
        status: 500
      };
    } else {
      revalidatePath(`/account-settings`, `layout`);


      // push a document to the orderRefunds collection
      const response = await db.collection(`orderRefunds`).insertOne({
        orderId: order._id,
        status: `pending`,
        // @ts-ignore
        userEmail: order.contactDetails.email,
        // @ts-ignore
        userPhone: order.contactDetails.phone,
        // @ts-ignore
        userInitials: `${order.contactDetails.firstName} ${order.contactDetails.lastName}`
      });

      // push notification to the user
      const user = await getUser({ email: order.contactDetails.email }, { _id: 0 }) as UserType[] | [];

      if (user && user.length > 0) {

        console.log(`Order coming from server function:`, order);

        const transformedTourTitle = order.tourTitle.length > 40 ? order.tourTitle.slice(0, 40) + `...` : order.tourTitle;
        // silently push a notification to the user
        const response = await db.collection(`users`).updateOne({ email: order.contactDetails.email }, {
          // @ts-ignore
          $push: {
            notifications: {
              type: `orange`,
              icon: `map`,
              addedAt: new Date(),
              timestamp: Timestamp.fromNumber(Date.now()),
              text: `You requested a refund for 
              <a target="_blank" class="highlighted text-decoration-none" href="tours/${order.tourId}">${transformedTourTitle}</a> tour.`
            }
          }

        });
        revalidatePath(`/account-settings`, `layout`);
      }

      return {
        error: false,
        message: `The refund request was successfully sent.`,
        status: 200
      };
    }
  }

  if (type === `Cancellation`) {

    //  Check if the extraDetails.cancellation.available is true
    // or if extraDetails.cancellation.requested is true

    if (!order.extraDetails.cancellation.available || order.extraDetails.cancellation.requested) {
      return {
        error: true,
        message: `The cancellation is not available for this order.`,
        status: 400
      };
    }

    const response = await db.collection(`orders`).updateOne({ _id: new ObjectId(orderId) }, {
      $set: {
        'extraDetails.cancellation.available': false,
        'extraDetails.cancellation.requested': true
      }
    });

    if (!response.acknowledged) {
      return {
        error: true,
        message: `Failed to request a cancellation for the order.`,
        status: 500
      };
    } else {
      revalidatePath(`/account-settings`, `layout`);

      // push a document to the orderRefunds collection
      const response = await db.collection(`orderCancellations`).insertOne({
        orderId: order._id,
        status: `pending`,
        // @ts-ignore
        userEmail: order.contactDetails.email,
        // @ts-ignore
        userPhone: order.contactDetails.phone,
        // @ts-ignore
        userInitials: `${order.contactDetails.firstName} ${order.contactDetails.lastName}`
      });


      // push notification to the user

      // User can exist or not, even if he made an order.
      // I have access to contactDetails in the order document, and
      // the point is, the user cannot use someone else's email I have in
      // my db to make an order when he's not authenticated.

      // So, we can assume that if the user exists, then he used his email to make an order and was
      // authenticated directly. If the user does not exist, then he was not authenticated and
      // used the email to make an order which is not in the db.

      const user = await getUser({ email: order.contactDetails.email }, { _id: 0 }) as UserType[] | [];

      if (user && user.length > 0) {

        console.log(`Order coming from server function:`, order);

        const transformedTourTitle = order.tourTitle.length > 40 ? order.tourTitle.slice(0, 40) + `...` : order.tourTitle;
        // silently push a notification to the user
        const response = await db.collection(`users`).updateOne({ email: order.contactDetails.email }, {
          // @ts-ignore
          $push: {
            notifications: {
              type: `orange`,
              icon: `map`,
              addedAt: new Date(),
              timestamp: Timestamp.fromNumber(Date.now()),
              text: `You requested a cancellation for 
              <a class="highlighted text-decoration-none" href="tours/${order.tourId}">${transformedTourTitle}</a> tour.`
            }
          }

        });
        revalidatePath(`/account-settings`, `layout`);
      }

      return {
        error: false,
        message: `The cancellation request was successfully sent.`,
        status: 200
      };
    }


  }
}

///////////////////////////////////////

/* IMPORTANT: TOKENS */

type pushChangeEmailVerificationTokenType = {
  userEmail: string;
  sessionEmail: string;
}

export async function pushChangeEmailVerificationToken(userEmail: string, sessionEmail: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  /* INFO: if error, then return error:  true, message: 'short message'
  *   if success: error: false, message: `short message`  */

  // if, by any means, a user enters an email he wants to update already exists in my
  // db, the operation will be stopped.
  const userExists = await db.collection(`users`).findOne({ email: userEmail });

  if (userExists) {
    return {
      error: true,
      message: `Error. User already exists.`
    };
  }

  const sessionUserExists = await db.collection(`users`).findOne({ email: sessionEmail });

  if (!sessionUserExists) {
    return {
      error: true,
      message: `Error. User does not exist.`
    };
  }

  const sessionExists = await db.collection(`changeEmailTokens`).findOne({ email: sessionEmail });

  if (sessionExists) {
    await db.collection(`changeEmailTokens`).deleteOne({ email: sessionEmail });
  }

  const token = await generateVerificationToken();
  const encryptedToken = await bcrypt.hash(token, 12);

  const response = await db.collection(`changeEmailTokens`).insertOne({
    email: sessionEmail,
    token: encryptedToken,
    createdAt: new Date()
  });

  if (!response.acknowledged) {
    return {
      error: true,
      message: `Failed to insert a token.`
    };
  } else {

    await sendVerificationCode(userEmail, token, `emailVerification`);

    return {
      error: false,
      message: `The token was successfully inserted.`
    };
  }


}

export type validateChangeEmailOperationType = {
  userToken: string;
  sessionEmail: string;
  userEmail: string;
};

export async function validateChangeEmailOperation(userToken: string, sessionEmail: string, userEmail: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);


  /* INFO: if error, then return error:  true, message: 'short message'
  *   if success: error: false, message: `short message`  */

  const tokenExists = await db.collection(`changeEmailTokens`).findOne({
    email: sessionEmail
  });

  if (!tokenExists) {
    return {
      error: true,
      message: `Error. Token expired/doesn't exist.`
    };
  }

  const tokenMatch = await bcrypt.compare(userToken, tokenExists.token);

  if (tokenMatch) {
    await changeUserEmail(tokenExists.email, userEmail);

    return {
      error: false,
      message: `Tokens do match.`
    };
  } else {
    return {
      error: true,
      message: `Invalid Token.`
    };
  }

}

type ChangeUserEmailType = {
  sessionEmail: string;
  userEmail: string;
}

export async function changeUserEmail(sessionEmail: string, userEmail: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const userExists = await db.collection(`users`).findOne({ email: sessionEmail });

  if (!userExists) {
    return {
      error: true,
      message: `Error. User does not exist.`
    };
  }

  const response = await db.collection(`users`).updateOne({ email: sessionEmail }, {
    $set: {
      email: userEmail
    },
    // @ts-ignore
    $push: {
      notifications: {
        type: `orange`,
        icon: `letter`,
        addedAt: new Date(),
        timestamp: Timestamp.fromNumber(Date.now()),
        text: `You successfully changed your email to ${userEmail}.`

      }
    }
  });

  if (response.acknowledged) {

    revalidatePath(`/account-settings`, `layout`);

    // delete the token from the collection
    await db.collection(`changeEmailTokens`).deleteOne({ email: sessionEmail });


    return {
      error: false,
      message: `The email was successfully updated.`
    };
  } else {
    return {
      error: true,
      message: `Failed to update the email.`
    };
  }

}

export async function sendRegisterEmailVerification(email: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const userExists = await db.collection(`users`).findOne({ email: email });

  if (userExists) {
    return {
      error: true,
      message: `Error. User already exists.`
    };
  }

  const token = await generateVerificationToken();
  const encryptedToken = await bcrypt.hash(token, 12);

  const tokenExists = await db.collection(`registerEmailTokens`).findOne({ email: email });

  if (tokenExists) {
    const response = await db.collection(`registerEmailTokens`).deleteOne({ email: email });

    if (!response.acknowledged) {
      return {
        error: true,
        message: `Failed to delete the token.`
      };
    }

  }

  const response = await db.collection(`registerEmailTokens`).insertOne({
    email: email,
    token: encryptedToken,
    createdAt: new Date()
  });

  if (!response.acknowledged) {
    return {
      error: true,
      message: `Failed to insert the token.`
    };
  } else {
    await sendVerificationCode(email, token, `registerEmailVerification`);
    return {
      error: false,
      message: `The token was successfully inserted.`
    };
  }

}

export async function validateRegisterEmailToken(userToken: string, email: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const tokenObject = await db.collection(`registerEmailTokens`).findOne({ email: email });

  if (!tokenObject) {
    return {
      error: true, message: `Error. Token expired/doesn't exist.`
    };
  }

  const tokenMatch = await bcrypt.compare(userToken, tokenObject.token);

  if (!tokenMatch) {
    return {
      error: true,
      message: `Invalid Token.`
    };
  }
  // delete the token from the collection
  await db.collection(`registerEmailTokens`).deleteOne({ email: email });

  return {
    error: false,
    message: `Tokens do match.`
  };

}

///////////////////////////////////////

/* IMPORTANT: TWO-FACTOR AUTH */
export async function toggleTwoFactorAuth(userEmail: string, value: boolean) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const userExists = await db.collection(`users`).findOne({ email: userEmail });

  if (!userExists) {
    return {
      error: true,
      message: `Error. User does not exist.`
    };
  }

  if (!userExists.registeredManually) {
    return {
      error: true,
      message: `Users logged in via provider cannot enable two-factor authentication.`
    };
  }

  const response = await db.collection(`users`).updateOne({ email: userEmail }, {
    $set: {
      twoFactorAuthEnabled: value
    }
  });

  if (!response.acknowledged) {
    return {
      error: true,
      message: `Failed to update the user.`
    };
  } else {
    /* PUSH NOTIFICATION */
    await db.collection(`users`).updateOne({ email: userEmail }, {
      // @ts-ignore
      $push: {
        notifications: {
          type: value ? `green` : `red`,
          icon: `key`,
          addedAt: new Date(),
          timestamp: Timestamp.fromNumber(Date.now()),
          text: `Two-factor authentication is ${value ? `enabled.` : `disabled.`}`
        }
      }
    });

    return {
      error: false,
      message: `The user was successfully updated.`
    };
  }

}

export async function isTwoFactorAuthEnabled(userEmail: string, userPassword: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const user = await db.collection(`users`).findOne({ email: userEmail }) as UserType | null;

  if (!user) {
    return {
      error: true,
      message: `Error. User does not exist.`
    };
  }
  const passwordMatch = await bcrypt.compare(userPassword, user.password!);

  if (!passwordMatch) {
    return {
      error: true,
      message: `Invalid credentials.`
    };
  }

  if (userEmail === user.email && passwordMatch && user.registeredManually && user.twoFactorAuthEnabled) {
    return {
      error: false,
      twoFactorAuthEnabled: user.twoFactorAuthEnabled,
      message: `Two-factor authentication is enabled.`
    };
  } else {
    return {
      error: false,
      twoFactorAuthEnabled: user.twoFactorAuthEnabled,
      message: `Two-factor authentication is disabled.`
    };
  }

}

export async function send2FACodeVerification(userEmail: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const user = await db.collection(`users`).findOne({ email: userEmail }) as UserType | null;

  if (!user || !user.registeredManually || !user.twoFactorAuthEnabled) {
    return {
      error: true,
      message: `Error. User does not exist or not allowed to use 2FA Auth.`
    };
  }

  const token = await generateVerificationToken();

  const encryptedToken = await bcrypt.hash(token, 12);

  const tokenAlreadyExists = await db.collection(`twoFactorAuthTokens`).findOne({ email: userEmail });

  // delete token silently if it already exists
  if (tokenAlreadyExists) {
    await db.collection(`twoFactorAuthTokens`).deleteOne({ email: userEmail });
  }

  const response = await db.collection(`twoFactorAuthTokens`).insertOne({
    email: userEmail,
    token: encryptedToken,
    createdAt: new Date()
  });

  await sendVerificationCode(userEmail, token, `twoFactorAuth`);

  if (response.acknowledged) {
    return {
      error: false,
      message: `The token was successfully inserted.`
    };
  } else {
    return {
      error: true,
      message: `Failed to insert the token.`
    };
  }
}

export async function validate2FAToken(userEmail: string, userToken: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const user = await db.collection(`users`).findOne({ email: userEmail }) as UserType | null;

  if (!user) {
    return {
      error: true,
      message: `Error! User does not exist.`
    };
  }

  const tokenObject = await db.collection(`twoFactorAuthTokens`).findOne({ email: userEmail });

  if (!tokenObject) {
    return {
      error: true,
      message: `Error! Token expired/doesn't exist.`
    };
  }
  const tokenMatch = await bcrypt.compare(userToken, tokenObject.token);

  if (!tokenMatch) {
    return {
      error: true,
      message: `Invalid Token.`
    };
  }

  await db.collection(`twoFactorAuthTokens`).deleteOne({
    email: userEmail
  });

  return {
    error: false,
    message: `Tokens do match.`
  };


}

///////////////////////////////////////

