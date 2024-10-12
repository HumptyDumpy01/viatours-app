'use server';
import { MongoClient, ObjectId, Timestamp } from 'mongodb';
import { TourInterface } from '@/app/tours/[id]/page';
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
import { FormResultsType } from '@/components/article-description/leave-reply/ArticleDescrLeaveReply';
import { SessionType } from '@/components/UI/Comment/Comment';

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
    return {
      error: `Oops! We were unable to save this comment! Sorry for the inconvenience. We are working on it.`
    };
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
      return {
        error: `Oops! We were unable to save this comment! Sorry for the inconvenience. We are working on it.`
      };
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
        return {
          error: `Oops! We were unable to save this comment! Failed to add comment id to a tour array. We are working on it...`
        };
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
        return {
          error: `Oops! We were unable to save this comment! Failed to update the tour rating...  We are working on it`
        };
      }

    }

  } catch (e) {
    return {
      error: `Oops! We were unable to save this comment! Sorry for the inconvenience. We are working on it.`
    };
  }
  // revalidate all the paths
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
    return {
      error: `Failed to get form details!`
    };
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
    return {
      error: `Failed to create an order!`,
      acknowledged: false
    };
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
        return {
          error: `Failed to find the order with the id ${id}`
        };
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
        return {
          error: `Failed to find the order with the id ${id}`
        };
      }

      const updatedTour =
        await db.collection(`tours`).updateOne({ _id: new ObjectId(order!.tourId) }, { $inc: { booked: 1 } });

      if (updatedTour) {
        return {
          error: `Failed to update the tour with the id ${order!.tourId}`
        };
      }

      revalidatePath(`/`, `layout`);
      return updatedOrder;

    }

    if (perform === `deletion`) {
      const deleteOrder = await db.collection(`orders`).deleteOne({ _id: new ObjectId(id) });

      if (!deleteOrder) {
        return {
          error: `Failed to delete the order with the id ${id}`
        };
      }
    }

  } catch (e) {
    return {
      error: `Failed to handle the order! ${e}`
    };
  }
}

///////////////////////////////////////
// IMPORTANT: USER

export async function getUser(filter: {}, options?: {}, unwind: boolean = false) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  if (!unwind) {
    const user = await db.collection(`users`).aggregate([{ $match: filter }, { $project: options }]).toArray();


    // console.log(`Executing user: `, user);

    return JSON.parse(JSON.stringify(user));
  } else {
    console.log(`User Email`, filter);


    /* IMPORTANT: if user's wishlist/savedArticles/orders is empty, an empty arr would be returned
    *   from this pipeline. It is done by a condition in the end of the pipeline.
    *   without  this condition the format in which data gets returned would be horrible.*/

    // Unwind an entire user document, particularly talking about wishlisted tours,
    // saved articles, orders
    const unwoundUser = await db.collection('users').aggregate([
      {
        $match: filter
      },
      // Ensure wishlist, notifications, and savedArticles have default values
      {
        $addFields: {
          wishlist: {
            $ifNull: ['$wishlist', []]
          },
          notifications: {
            $ifNull: ['$notifications', []]
          },
          savedArticles: {
            $ifNull: ['$savedArticles', []]
          }
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
      {
        $unwind: {
          path: '$wishlistedTours',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$_id',
          email: {
            $first: '$email'
          },
          image: {
            $first: '$image'
          },
          firstName: {
            $first: '$firstName'
          },
          lastName: {
            $first: '$lastName'
          },
          password: {
            $first: '$password'
          },
          phone: {
            $first: '$phone'
          },
          orders: {
            $first: '$orders'
          },
          registeredManually: {
            $first: '$registeredManually'
          },
          twoFactorAuthEnabled: {
            $first: '$twoFactorAuthEnabled'
          },
          notifications: {
            $first: '$notifications'
          },
          savedArticles: {
            $first: '$savedArticles'
          },
          wishlist: {
            $push: {
              _id: {
                $ifNull: [
                  '$wishlistedTours._id',
                  null
                ]
              },
              // Push null-safe values
              title: {
                $ifNull: [
                  '$wishlistedTours.title',
                  null
                ]
              },
              image: {
                $ifNull: [
                  {
                    $arrayElemAt: [
                      '$wishlistedTours.images',
                      0
                    ]
                  },
                  null
                ]
              },
              location: {
                $cond: {
                  if: {
                    $and: [
                      '$wishlistedTours.city',
                      '$wishlistedTours.country'
                    ]
                  },
                  then: {
                    $concat: [
                      '$wishlistedTours.city',
                      ', ',
                      '$wishlistedTours.country'
                    ]
                  },
                  else: null
                }
              },
              rating: {
                $ifNull: [
                  '$wishlistedTours.rating.overall',
                  0
                ]
              },
              reviews: {
                $ifNull: [
                  '$wishlistedTours.reviews',
                  0
                ]
              },
              duration: {
                $ifNull: [
                  '$wishlistedTours.duration',
                  null
                ]
              },
              fromPrice: {
                $ifNull: [
                  '$wishlistedTours.price.children',
                  null
                ]
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: 'orders',
          localField: 'orders',
          foreignField: '_id',
          as: 'userOrders'
        }
      },
      {
        $unwind: {
          path: '$userOrders',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$_id',
          email: {
            $first: '$email'
          },
          firstName: {
            $first: '$firstName'
          },
          lastName: {
            $first: '$lastName'
          },
          image: {
            $first: '$image'
          },
          password: {
            $first: '$password'
          },
          phone: {
            $first: '$phone'
          },
          registeredManually: {
            $last: '$registeredManually'
          },
          twoFactorAuthEnabled: {
            $last: '$twoFactorAuthEnabled'
          },
          notifications: {
            $first: '$notifications'
          },
          savedArticles: {
            $first: '$savedArticles'
          },
          wishlist: {
            $last: '$wishlist'
          },
          orders: {
            $push: {
              _id: {
                $ifNull: ['$userOrders._id', null]
              },
              tourId: {
                $ifNull: ['$userOrders.tourId', null]
              },
              date: {
                $ifNull: [
                  '$userOrders.booking.date',
                  null
                ]
              },
              contactDetails: {
                $ifNull: [
                  '$userOrders.contactDetails',
                  null
                ]
              },
              tickets: {
                $ifNull: [
                  '$userOrders.booking.tickets',
                  null
                ]
              },
              price: {
                $ifNull: [
                  '$userOrders.booking.totalPrice',
                  null
                ]
              },
              extraDetails: {
                $ifNull: [
                  '$userOrders.extraDetails',
                  null
                ]
              }
            }
          }
        }
      },
      {
        $unwind: {
          path: '$orders',
          preserveNullAndEmptyArrays: true
        }
      },
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
          email: {
            $first: '$email'
          },
          firstName: {
            $first: '$firstName'
          },
          lastName: {
            $first: '$lastName'
          },
          image: {
            $first: '$image'
          },
          password: {
            $first: '$password'
          },
          phone: {
            $first: '$phone'
          },
          registeredManually: {
            $last: '$registeredManually'
          },
          twoFactorAuthEnabled: {
            $last: '$twoFactorAuthEnabled'
          },
          notifications: {
            $first: '$notifications'
          },
          savedArticles: {
            $first: '$savedArticles'
          },
          wishlist: {
            $last: '$wishlist'
          },
          orders: {
            $push: {
              _id: '$orders._id',
              date: '$orders.date',
              totalPrice: '$orders.price',
              contactDetails: {
                $ifNull: [
                  '$orders.contactDetails',
                  null
                ]
              },
              tickets: '$orders.tickets',
              extraDetails: '$orders.extraDetails',
              tour: {
                _id: {
                  $arrayElemAt: ['$orderTours._id', 0]
                },
                title: {
                  $arrayElemAt: [
                    '$orderTours.title',
                    0
                  ]
                },
                location: {
                  $cond: {
                    if: {
                      $and: [
                        {
                          $arrayElemAt: [
                            '$orderTours.city',
                            0
                          ]
                        },
                        {
                          $arrayElemAt: [
                            '$orderTours.country',
                            0
                          ]
                        }
                      ]
                    },
                    then: {
                      $concat: [
                        {
                          $arrayElemAt: [
                            '$orderTours.city',
                            0
                          ]
                        },
                        ', ',
                        {
                          $arrayElemAt: [
                            '$orderTours.country',
                            0
                          ]
                        }
                      ]
                    },
                    else: null
                  }
                },
                image: {
                  $arrayElemAt: [
                    {
                      $arrayElemAt: [
                        '$orderTours.images',
                        0
                      ]
                    },
                    0
                  ]
                },
                rating: {
                  $arrayElemAt: [
                    '$orderTours.rating.overall',
                    0
                  ]
                },
                reviews: {
                  $arrayElemAt: [
                    '$orderTours.reviews',
                    0
                  ]
                },
                duration: {
                  $arrayElemAt: [
                    '$orderTours.duration',
                    0
                  ]
                }
              }
            }
          }
        }
      },

      // Unwind the savedArticles field
      {
        $unwind: {
          path: '$savedArticles',
          preserveNullAndEmptyArrays: true
        }
      },
      // Lookup articles from the articles collection
      {
        $lookup: {
          from: 'articles',
          localField: 'savedArticles',
          foreignField: '_id',
          as: 'savedArticles'
        }
      },
      // Unwind the article's savedArticles array
      {
        $unwind: {
          path: '$savedArticles',
          preserveNullAndEmptyArrays: true
        }
      },
      // Lookup the author of each article
      {
        $lookup: {
          from: 'travelArticlesAuthors',
          localField: 'savedArticles.author',
          foreignField: '_id',
          as: 'authorDetails'
        }
      },
      // Add author details into the savedArticles
      {
        $addFields: {
          'savedArticles.author': { $arrayElemAt: ['$authorDetails', 0] }
        }
      },
// Group the savedArticles again with the fully populated authors
      {
        $group: {
          _id: '$_id',
          email: { $first: '$email' },
          firstName: { $first: '$firstName' },
          lastName: { $first: '$lastName' },
          image: { $first: '$image' },
          password: { $first: '$password' },
          phone: { $first: '$phone' },
          registeredManually: { $last: '$registeredManually' },
          notifications: { $first: '$notifications' },
          twoFactorAuthEnabled: {
            $last: '$twoFactorAuthEnabled'
          },
          wishlist: { $first: '$wishlist' },
          orders: { $first: '$orders' },
          savedArticles: {
            $push: {
              _id: '$savedArticles._id',
              title: '$savedArticles.title',
              type: '$savedArticles.type',
              image: { $arrayElemAt: ['$savedArticles.images', 0] },
              createdAt: '$savedArticles.createdAt',
              rating: {
                $cond: {
                  if: { $eq: ['$savedArticles.rating', []] },
                  then: 0,
                  else: { $avg: '$savedArticles.rating' }
                }
              }, author: {
                $concat: ['$savedArticles.author.firstName', ' ',
                  '$savedArticles.author.lastName']
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
              if: {
                $ne: [
                  {
                    $arrayElemAt: ['$wishlist._id', 0]
                  },
                  null
                ]
              },
              then: '$wishlist',
              else: []
            }
          },
          orders: {
            $cond: {
              if: {
                $ne: [
                  {
                    $arrayElemAt: ['$orders._id', 0]
                  },
                  null
                ]
              },
              then: '$orders',
              else: []
            }
          },
          savedArticles: {
            $cond: {
              if: {
                $eq: [
                  {
                    $arrayElemAt: ['$savedArticles.author', 0]
                  },
                  null
                ]
              },
              then: [],
              else: '$savedArticles'
            }
          }
        }
      }


    ]).toArray();

    console.log(`Executing unwoundUser: `, unwoundUser);
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
    return {
      error: `An error occurred while creating a user. Please try again later.`,
      acknowledged: false
    };
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
    return {
      error: `An error occurred while creating a user. Please try again later.`
    };
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
    return {
      error: true,
      message: `No order id or user email provided.`,
      acknowledged: false
    };
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
      return {
        error: true,
        acknowledged: false,
        message: `Failed to insert email to the newsletter collection`
      };
    }

    const updateUser = await db.collection(`users`)
      .updateOne({ email: userEmail }, { $set: { 'extra.signedOnNewsletter': true } });

    if (!updateUser.acknowledged) {
      return {
        error: true,
        acknowledged: false,
        message: `Failed to update the user document.`
      };
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
      return {
        error: true,
        acknowledged: false,
        message: `Failed to add an order id to the user document`
      };
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
      return {
        error: true,
        acknowledged: false,
        message: `Failed to add an order id to the user document`
      };
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
    return {
      error: true,
      message: `The user with the email ${userEmail} does not exist.`,
      status: 404
    };
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
      return {
        acknowledged: false,
        error: `Failed to fetch the comment.`
      };
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
    return {
      acknowledged: false
    };
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
      return {
        error: true,
        acknowledged: false,
        message: `Failed to add the email to the newsletter.`
      };
    }

    return {
      acknowledged: insertEmailToNewsletter.acknowledged
    };
  }

  if (method === `REMOVE`) {

    const response = await db.collection(`newsletter`).deleteOne({ email: email });

    if (!response.acknowledged) {
      return {
        error: true,
        acknowledged: false,
        message: `Failed to remove the email from the newsletter.`
      };
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

/* INFO: Order Action means user can request a cancellation or refund for the tickets
*   he bought. He should confirm this action when he requests in via track-order page. */
export async function generateOrderActionConfirmationToken(orderId: string, type: `refund` | `cancellation`) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  if (!ObjectId.isValid(orderId)) {
    return {
      error: true,
      message: `Error. Invalid Order ID.`
    };
  }

  if (type !== `refund` && type !== `cancellation`) {
    return {
      error: true,
      message: `Error. Invalid type.`
    };
  }

  const order = await db.collection(`orders`).findOne({ _id: new ObjectId(orderId) });

  if (!order) {
    return {
      error: true,
      message: `Error. Order does not exist.`
    };
  }

  const userCanRequestRefund = order.extraDetails.refund.available;
  const userCanRequestCancellation = order.extraDetails.cancellation.available;

  if (type === `cancellation`) {

    if (!userCanRequestCancellation) {
      return {
        error: true,
        message: `Error. Cancellation is not available.`
      };
    }

    const token = await generateVerificationToken();
    const encryptedToken = await bcrypt.hash(token, 12);

    const tokenExists = await db.collection(`requestCancellationTokens`).findOne({ orderId: new ObjectId(orderId) });

    if (tokenExists) {
      await db.collection(`requestCancellationTokens`).deleteOne({ orderId: new ObjectId(orderId) });
    }

    const response = await db.collection(`requestCancellationTokens`).insertOne({
      orderId: new ObjectId(orderId),
      token: encryptedToken,
      createdAt: new Date()
    });

    if (!response.acknowledged) {
      return {
        error: true,
        message: `Failed to insert the token.`
      };
    }

    await sendVerificationCode(order.contactDetails.email, token, `verifyOrderCancellation`);

    return {
      error: false,
      message: `The token was successfully inserted.`
    };


  }

  if (type === `refund`) {
    if (!userCanRequestRefund) {
      return {
        error: true,
        message: `Error. Refund is not available.`
      };
    }

    const token = await generateVerificationToken();
    const encryptedToken = await bcrypt.hash(token, 12);

    const tokenExists = await db.collection(`requestRefundTokens`).findOne({ orderId: new ObjectId(orderId) });

    if (tokenExists) {
      await db.collection(`requestRefundTokens`).deleteOne({ orderId: new ObjectId(orderId) });
    }

    const response = await db.collection(`requestRefundTokens`).insertOne({
      orderId: new ObjectId(orderId),
      token: encryptedToken,
      createdAt: new Date()
    });

    if (!response.acknowledged) {
      return {
        error: true,
        message: `Failed to insert the token.`
      };
    }

    await sendVerificationCode(order.contactDetails.email, token, `verifyOrderRefund`);

    return {
      error: false,
      message: `The token was successfully inserted.`
    };

  }

}

export async function verifyOrderCancellationToken(orderId: string, userToken: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const tokenObject = await db.collection(`requestCancellationTokens`).findOne({ orderId: new ObjectId(orderId) });

  if (!tokenObject) {
    return {
      error: true,
      message: `Error. Token expired/doesn't exist.`
    };
  }

  const userTokenMatch = await bcrypt.compare(userToken, tokenObject.token);

  if (!userTokenMatch) {
    return {
      error: true,
      message: `Invalid Token.`
    };
  }

  await db.collection(`requestCancellationTokens`).deleteOne({ orderId: new ObjectId(orderId) });

  return {
    error: false,
    acknowledged: true,
    message: `Tokens do match.`
  };

}

export async function approveRequestForCancellation(orderId: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  if (!ObjectId.isValid(orderId)) {
    return {
      error: true,
      message: `Error. Invalid Order ID.`
    };
  }
  const order = await db.collection(`orders`).findOne({ _id: new ObjectId(orderId) });

  if (!order) {
    return {
      error: true,
      message: `Error. Order does not exist.`
    };
  }
  const cancellationAvailable = order.extraDetails.cancellation.available;

  if (!cancellationAvailable) {
    return {
      error: true,
      message: `Error. Cancellation is not available.`
    };
  }


  const newOrderForCancellation = {
    orderId: order._id,
    status: `pending`,
    userEmail: order.contactDetails.email,
    userPhone: order.contactDetails.phone,
    userInitials: `${order.contactDetails.firstName} ${order.contactDetails.lastName}`
  };

  const orderAlreadyExists = await db.collection(`orderCancellations`).findOne({ orderId: order._id });

  if (orderAlreadyExists) {
    return {
      error: true,
      message: `Error. Cancellation request already sent.`
    };
  }

  const response = await db.collection(`orderCancellations`).insertOne(newOrderForCancellation);

  if (!response.acknowledged) {
    return {
      error: true,
      message: `Failed to insert the order cancellation.`
    };

  } else {

    const userExists = await db.collection(`users`).findOne({ email: order.contactDetails.email });

    if (userExists) {
      // silently push a notification to the user
      const response = await db.collection(`users`).updateOne({ email: order.contactDetails.email }, {
        // @ts-ignore
        $push: {
          notifications: {
            type: `orange`,
            icon: `map`,
            addedAt: new Date(),
            timestamp: Timestamp.fromNumber(Date.now()),
            text: `Your cancellation request for the order ${orderId.slice(0, 10) + `..`} was sent.`
          }
        }
      });
    }

    await db.collection(`orders`).updateOne({ _id: new ObjectId(orderId) }, {
      $set: {
        'extraDetails.cancellation.available': false,
        'extraDetails.cancellation.requested': true
      }
    });

    return {
      error: false,
      message: `The order cancellation was successfully sent.`
    };
  }


}

export async function verifyOrderRefundToken(orderId: string, userToken: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const tokenObject = await db.collection(`requestRefundTokens`).findOne({ orderId: new ObjectId(orderId) });

  if (!tokenObject) {
    return {
      error: true,
      message: `Error. Token expired/doesn't exist.`
    };
  }

  const userTokenMatch = await bcrypt.compare(userToken, tokenObject.token);

  if (!userTokenMatch) {
    return {
      error: true,
      message: `Invalid Token.`
    };
  }

  await db.collection(`requestRefundTokens`).deleteOne({ orderId: new ObjectId(orderId) });

  return {
    error: false,
    acknowledged: true,
    message: `Tokens do match.`
  };

}

export async function approveRequestForRefund(orderId: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  if (!ObjectId.isValid(orderId)) {
    return {
      error: true,
      message: `Error. Invalid Order ID.`
    };
  }
  const order = await db.collection(`orders`).findOne({ _id: new ObjectId(orderId) });

  if (!order) {
    return {
      error: true,
      message: `Error. Order does not exist.`
    };
  }
  const refundAvailable = order.extraDetails.refund.available;

  if (!refundAvailable) {
    return {
      error: true,
      message: `Error. Refund is not available.`
    };
  }


  const newOrderForRefund = {
    orderId: order._id,
    status: `pending`,
    userEmail: order.contactDetails.email,
    userPhone: order.contactDetails.phone,
    userInitials: `${order.contactDetails.firstName} ${order.contactDetails.lastName}`
  };

  const orderAlreadyExists = await db.collection(`orderRefunds`).findOne({ orderId: order._id });

  if (orderAlreadyExists) {
    return {
      error: true,
      message: `Error. Refund request already sent.`
    };
  }

  const response = await db.collection(`orderRefunds`).insertOne(newOrderForRefund);

  if (!response.acknowledged) {
    return {
      error: true,
      message: `Failed to insert the order refund.`
    };

  } else {

    const userExists = await db.collection(`users`).findOne({ email: order.contactDetails.email });

    if (userExists) {
      // silently push a notification to the user
      const response = await db.collection(`users`).updateOne({ email: order.contactDetails.email }, {
        // @ts-ignore
        $push: {
          notifications: {
            type: `orange`,
            icon: `map`,
            addedAt: new Date(),
            timestamp: Timestamp.fromNumber(Date.now()),
            text: `Your refund request for the order ${orderId.slice(0, 10) + `..`} was sent.`
          }
        }
      });
    }

    await db.collection(`orders`).updateOne({ _id: new ObjectId(orderId) }, {
      $set: {
        'extraDetails.refund.available': false,
        'extraDetails.refund.requested': true
      }
    });

    return {
      error: false,
      message: `The order refund request was successfully sent.`
    };
  }


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

/* IMPORTANT: PASSWORD RECOVERY */
export async function generateRecoveryCodeToken(userEmail: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const userExists = await db.collection(`users`).findOne({ email: userEmail });

  if (!userExists) {
    return {
      error: true,
      message: `Error. User does not exist.`
    };
  }

  const userPasswordIsNull = userExists.password === null;

  if (userPasswordIsNull) {
    return {
      error: true,
      message: `Users logged in via provider cannot manually reset their password, till they set a password 
        via account settings.`
    };
  }

  const tokenAlreadyExists = await db.collection(`recoverPasswordTokens`).findOne({ email: userEmail });

  if (tokenAlreadyExists) {
    await db.collection(`recoverPasswordTokens`).deleteOne({ email: userEmail });
  }

  const token = await generateVerificationToken();

  const encryptedToken = await bcrypt.hash(token, 12);

  const response = await db.collection(`recoverPasswordTokens`).insertOne({
    email: userEmail,
    token: encryptedToken,
    createdAt: new Date()
  });

  if (response.acknowledged) {

    await sendVerificationCode(userEmail, token, `resetPassword`);

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

export async function verifyRecoverPasswordToken(userEmail: string, userToken: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const userExists = await db.collection(`users`).findOne({ email: userEmail });

  if (!userExists) {
    return {
      error: true,
      message: `Error. User does not exist.`
    };
  }

  const tokenObject = await db.collection(`recoverPasswordTokens`).findOne({ email: userEmail });

  if (!tokenObject) {
    return {
      error: true,
      message: `Error. Token expired/doesn't exist.`
    };
  }
  const tokensMatch = await bcrypt.compare(userToken, tokenObject.token);

  if (!tokensMatch) {
    return {
      error: true,
      message: `Invalid Token.`
    };
  }

  return {
    error: false,
    message: `Tokens do match.`
  };


}

export async function changeUserPassword(userEmail: string, password: string, confirmPassword: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const userExists = await db.collection(`users`).findOne({ email: userEmail });

  if (!userExists) {
    return {
      error: true,
      message: `Error. User does not exist.`
    };
  }

  if (password !== confirmPassword) {
    return {
      error: true,
      message: `Passwords do not match.`
    };
  }
  if (password.length < 6 || password.length > 100) {
    return {
      error: true,
      message: `The password must be between 6 and 100 characters long.`
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const response = await db.collection(`users`).updateOne({ email: userEmail }, {
    $set: {
      password: hashedPassword
    },
    // @ts-ignore
    $push: {
      notifications: {
        type: `green`,
        icon: `key`,
        addedAt: new Date(),
        timestamp: Timestamp.fromNumber(Date.now()),
        text: `You successfully reset your password.`
      }
    }
  });

  if (response.acknowledged) {

    return {
      error: false,
      message: `The password was successfully updated.`
    };
  } else {
    return {
      error: true,
      message: `Failed to update the password.`
    };
  }

}

///////////////////////////////////////

/* IMPORTANT: ACCOUNT DELETION */

export async function isPasswordCorrect(userEmail: string, userPassword: string) {
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

  if (passwordMatch) {
    return {
      error: false,
      message: `Correct password.`
    };
  } else {
    return {
      error: true,
      message: `Incorrect password!`
    };
  }

}

export async function createDeleteAccountToken(userEmail: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const user = await db.collection(`users`).findOne({ email: userEmail });

  if (!user) {
    return {
      error: true,
      message: `Error. User does not exist.`
    };
  }

  const tokenExists = await db.collection(`deleteAccountTokens`).findOne({ email: userEmail });

  if (tokenExists) {
    await db.collection(`deleteAccountTokens`).deleteOne({ email: userEmail });
  }

  const token = await generateVerificationToken();

  const encryptedToken = await bcrypt.hash(token, 12);

  const response = await db.collection(`deleteAccountTokens`).insertOne({
    email: userEmail,
    token: encryptedToken,
    createdAt: new Date()
  });

  if (response.acknowledged) {
    await sendVerificationCode(userEmail, token, `deleteAccount`);

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

export async function validateDeleteAccountToken(userEmail: string, userToken: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const user = await db.collection(`users`).findOne({ email: userEmail });

  if (!user) {
    return {
      error: true,
      message: `Error. User does not exist.`
    };
  }

  const tokenObject = await db.collection(`deleteAccountTokens`).findOne({ email: userEmail });

  if (!tokenObject) {
    return {
      error: true,
      message: `Error. Token expired/doesn't exist.`
    };
  }

  const tokensMatch = await bcrypt.compare(userToken, tokenObject.token);

  if (!tokensMatch) {
    return {
      error: true,
      message: `Invalid Token.`
    };
  } else {
    return {
      error: false,
      message: `Tokens do match.`
    };
  }
}

export async function deleteUserAccount(userEmail: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const user = await db.collection(`users`).findOne({ email: userEmail });

  if (!user) {
    return {
      error: true,
      message: `Error. User does not exist.`
    };
  }

  const tokenExists = await db.collection(`deleteAccountTokens`).findOne({ email: userEmail });

  if (!tokenExists) {
    return {
      error: true,
      message: `Error. Token has expired.`
    };
  } else {
    await db.collection(`deleteAccountTokens`).deleteOne({ email: userEmail });
  }

  const response = await db.collection(`users`).deleteOne({ email: userEmail });

  if (response.acknowledged) {

    return {
      error: false,
      message: `The user was successfully deleted.`
    };
  } else {
    return {
      error: true,
      message: `Failed to delete the user.`
    };
  }

}

///////////////////////////////////////

/* IMPORTANT: ARTICLES */

export async function getArticles(limit?: number, project?: any) {

  const limitVal = limit ? limit : 9999;
  const projectVal = project ? project : { searchTerm: 0 };

  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const articles = await db.collection(`articles`).aggregate([
    {
      $unwind: '$author'
    },
    {
      $lookup: {
        from: 'travelArticlesAuthors',
        localField: 'author',
        foreignField: '_id',
        as: 'authorDetails'
      }
    },
    {
      $group: {
        _id: '$_id',
        title: {
          $first: '$title'
        },
        createdAt: {
          $first: '$createdAt'
        },
        author: {
          $first: '$authorDetails'
        },
        type: {
          $first: '$type'
        },
        image: {
          $first: { $arrayElemAt: ['$images', 0] }
        },
        views: {
          $first: '$views'
        }
      }
    },
    {
      $unwind: '$author'
    },
    {
      $group: {
        _id: '$_id',
        title: {
          $first: '$title'
        },
        createdAt: {
          $first: '$createdAt'
        },
        author: {
          $first: {
            $concat: [
              '$author.firstName',
              ' ',
              '$author.lastName'
            ]
          }
        },
        type: {
          $first: '$type'
        },
        image: {
          $first: '$image'
        },
        views: {
          $first: '$views'
        }
      }
    },
    { $limit: limitVal },
    { $project: projectVal }
  ]).toArray();

  if (!articles) {
    return {
      error: true,
      message: `Failed to fetch articles.`,
      status: 500
    };
  }

  // transform the objectId to string
  const transformedArticles = articles.map((article: any) => {
    return {
      _id: article._id.toString(),
      title: article.title,
      createdAt: article.createdAt,
      author: article.author,
      type: article.type,
      image: article.image,
      views: article.views
    };
  });

  return {
    error: false,
    articles: transformedArticles,
    message: `Articles fetched successfully.`,
    status: 200
  };

}

export type TagsType = `new` | `featured` | `top` | `hot`

export async function fetchArticlesByTags(tags: TagsType[], limit?: number) {

  const limitVal = limit ? limit : 9999;

  // if no new or featured or top or hot tags are provided, return an error
  if (!tags.includes(`hot`) && !tags.includes(`new`) && !tags.includes(`featured`) && !tags.includes(`top`)) {
    return {
      error: true,
      message: `Tags provided are not correct. Please provide new, featured, top or hot tags.`,
      status: 400
    };
  }

  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  if (tags.length === 0) {
    return {
      error: true,
      message: `No tags provided.`,
      status: 400
    };
  }

  const response = await db.collection(`articles`).aggregate([
    {
      $unwind: '$author'
    },
    {
      $lookup: {
        from: 'travelArticlesAuthors',
        localField: 'author',
        foreignField: '_id',
        as: 'authorDetails'
      }
    },
    {
      $group: {
        _id: '$_id',
        title: {
          $first: '$title'
        },
        createdAt: {
          $first: '$createdAt'
        },
        author: {
          $first: '$authorDetails'
        },
        type: {
          $first: '$type'
        },
        tags: {
          $first: '$tags'
        },
        image: {
          $first: { $arrayElemAt: ['$images', 0] }
        },
        country: {
          $first: '$location.country'
        },
        readTime: {
          $first: '$readTime'
        },
        views: {
          $first: '$views'
        }
      }
    },
    {
      $unwind: '$author'
    },
    {
      $group: {
        _id: '$_id',
        title: {
          $first: '$title'
        },
        createdAt: {
          $first: '$createdAt'
        },
        author: {
          $first: {
            $concat: [
              '$author.firstName',
              ' ',
              '$author.lastName'
            ]
          }
        },
        type: {
          $first: '$type'
        },
        tags: {
          $first: '$tags'
        },
        image: {
          $first: '$image'
        },
        country: {
          $first: '$country'
        },
        readTime: {
          $first: '$readTime'
        },
        views: {
          $first: '$views'
        }
      }
    },
    // match the newest articles,
    {
      $match: {
        tags: {
          $in: tags
        }
      }
    },
    { $limit: limitVal }
  ]).toArray();

  if (response.length === 0) {
    return {
      error: true,
      message: `No articles found.`,
      status: 404
    };
  }

  // transform the objectId to string
  const transformedArticles = response.map((article: any) => {
    return {
      _id: article._id.toString(),
      title: article.title,
      createdAt: article.createdAt,
      author: article.author,
      type: article.type,
      tags: article.tags,
      image: article.image,
      country: article.country,
      readTime: article.readTime,
      views: article.views
    };
  });

  return {
    error: false,
    articles: transformedArticles,
    message: `Articles fetched successfully.`,
    status: 200
  };
}

export type TypesType = `culture` | `historic` | `nature` | `trips`;

export async function fetchArticlesByType(type: TypesType[], limit?: number) {

  const limitVal = limit ? limit : 9999;

  // if no new or featured or top or hot tags are provided, return an error
  if (!type.includes(`culture`) && !type.includes(`historic`) && !type.includes(`nature`) && !type.includes(`trips`)) {
    return {
      error: true,
      message: `Type provided are not correct. Please provide new, featured, top or hot type.`,
      status: 400
    };
  }

  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  if (type.length === 0) {
    return {
      error: true,
      message: `No tags provided.`,
      status: 400
    };
  }

  const response = await db.collection(`articles`).aggregate([
    {
      $unwind: '$author'
    },
    {
      $lookup: {
        from: 'travelArticlesAuthors',
        localField: 'author',
        foreignField: '_id',
        as: 'authorDetails'
      }
    },
    {
      $group: {
        _id: '$_id',
        title: {
          $first: '$title'
        },
        createdAt: {
          $first: '$createdAt'
        },
        author: {
          $first: '$authorDetails'
        },
        type: {
          $first: '$type'
        },
        tags: {
          $first: '$tags'
        },
        image: {
          $first: { $arrayElemAt: ['$images', 0] }
        },
        country: {
          $first: '$location.country'
        },
        readTime: {
          $first: '$readTime'
        },
        views: {
          $first: '$views'
        }
      }
    },
    {
      $unwind: '$author'
    },
    {
      $group: {
        _id: '$_id',
        title: {
          $first: '$title'
        },
        createdAt: {
          $first: '$createdAt'
        },
        author: {
          $first: {
            $concat: [
              '$author.firstName',
              ' ',
              '$author.lastName'
            ]
          }
        },
        type: {
          $first: '$type'
        },
        tags: {
          $first: '$tags'
        },
        image: {
          $first: '$image'
        },
        country: {
          $first: '$country'
        },
        readTime: {
          $first: '$readTime'
        },
        views: {
          $first: '$views'
        }
      }
    },
    // match the newest articles,
    {
      $match: {
        type: {
          $in: type
        }
      }
    },
    { $limit: limitVal }
  ]).toArray();

  // transform the objectId to string
  const transformedArticles = response.map((article: any) => {
    return {
      _id: article._id.toString(),
      title: article.title,
      createdAt: article.createdAt,
      author: article.author,
      type: article.type,
      tags: article.tags,
      image: article.image,
      country: article.country,
      readTime: article.readTime,
      views: article.views
    };
  });

  return {
    error: false,
    articles: transformedArticles,
    message: `Articles fetched successfully.`,
    status: 200
  };
}

export async function searchArticles(searchTerm: string) {
  try {
    const client = await clientPromise;
    const db = client.db(`viatoursdb`);

    const response = await db.collection(`articles`).aggregate([
      { $match: { $text: { $search: searchTerm } } },
      {
        $unwind: '$author'
      },
      {
        $lookup: {
          from: 'travelArticlesAuthors',
          localField: 'author',
          foreignField: '_id',
          as: 'authorDetails'
        }
      },
      {
        $group: {
          _id: '$_id',
          title: {
            $first: '$title'
          },
          createdAt: {
            $first: '$createdAt'
          },
          author: {
            $first: '$authorDetails'
          },
          type: {
            $first: '$type'
          },
          image: {
            $first: { $arrayElemAt: ['$images', 0] }
          },
          views: {
            $first: '$views'
          }
        }
      },
      {
        $unwind: '$author'
      },
      {
        $group: {
          _id: '$_id',
          title: {
            $first: '$title'
          },
          createdAt: {
            $first: '$createdAt'
          },
          author: {
            $first: {
              $concat: [
                '$author.firstName',
                ' ',
                '$author.lastName'
              ]
            }
          },
          type: {
            $first: '$type'
          },
          image: {
            $first: '$image'
          },
          views: {
            $first: '$views'
          }
        }
      }
    ]).toArray();

    const transformedArticles = response.map((article: any) => {
      return {
        _id: article._id.toString(),
        title: article.title,
        createdAt: article.createdAt,
        author: article.author,
        type: article.type,
        image: article.image,
        views: article.views
      };
    });

    // console.log(`Executing transformedArticles: `, transformedArticles);

    return {
      error: false,
      articles: transformedArticles,
      message: `Articles fetched successfully.`
    };

  } catch (e) {
    return {
      error: true,
      message: `Failed to search articles. ${e}`
    };
  }
}

export async function getArticleDetails(id: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);
  try {

    const article = await db.collection(`articles`).aggregate([
      {
        $match: {
          _id: new ObjectId(id) // change to your article ID
        }
      },
      {
        $unwind: '$author'
      },
      {
        $lookup: {
          from: 'travelArticlesAuthors',
          localField: 'author',
          foreignField: '_id',
          as: 'authorDetails'
        }
      },
      {
        $group: {
          _id: '$_id',
          subTitle: { $first: '$subTitle' },
          title: { $first: '$title' },
          images: { $first: '$images' },
          tags: { $first: '$tags' },
          type: { $first: '$type' },
          rating: { $first: '$rating' },
          views: { $first: '$views' },
          location: {
            $first: {
              $concat: [
                '$location.place',
                ', ',
                '$location.city',
                ', ',
                '$location.country'
              ]
            }
          },
          author: {
            $first: {
              name: {
                $concat: [
                  {
                    $arrayElemAt: [
                      '$authorDetails.firstName',
                      0
                    ]
                  },
                  ' ',
                  {
                    $arrayElemAt: [
                      '$authorDetails.lastName',
                      0
                    ]
                  }
                ]
              },
              _id: { $toString: { $arrayElemAt: ['$authorDetails._id', 0] } },
              employment: { $arrayElemAt: ['$authorDetails.employment', 0] },
              image: { $arrayElemAt: ['$authorDetails.image', 0] }

            }
          },
          readTime: { $first: '$readTime' },
          content: { $first: '$content' },
          createdAt: { $first: '$createdAt' },
          comments: { $first: '$comments' }
        }
      },
      {
        $lookup: {
          from: 'articleComments',
          localField: 'comments',
          foreignField: '_id',
          as: 'unwoundComments'
        }
      },

      {
        $unwind: {
          path: '$unwoundComments',
          preserveNullAndEmptyArrays: true // Handle articles with no comments
        }
      },
      {
        $group: {
          _id: '$_id',
          subTitle: { $first: '$subTitle' },
          title: { $first: '$title' },
          images: { $first: '$images' },
          tags: { $first: '$tags' },
          type: { $first: '$type' },
          rating: { $first: '$rating' },
          views: { $first: '$views' },
          location: { $first: '$location' },
          author: { $first: '$author' },
          readTime: { $first: '$readTime' },
          content: { $first: '$content' },
          createdAt: { $first: '$createdAt' },
          comments: {
            $push: {
              _id: '$unwoundComments._id',
              user: '$unwoundComments.user',
              rating: '$unwoundComments.rating',
              title: '$unwoundComments.title',
              text: '$unwoundComments.text',
              addedAt: '$unwoundComments.addedAt',
              likes: '$unwoundComments.likes',
              dislikes: '$unwoundComments.dislikes',
              abuseReports: '$unwoundComments.abuseReports'
            }
          }
        }
      },
      // that is, if at the end the comment prop equals to [{}], it means
      // this particular article does not have comments yet. I change its  structure
      // to an empty array instead.
      {
        $addFields: {
          comments: {
            $cond: {
              if: {
                $eq: [
                  { $arrayElemAt: ['$comments', 0] },
                  {}
                ]
              },
              then: [],
              else: {
                $sortArray: {
                  input: '$comments',
                  sortBy: { addedAt: -1 }
                }
              }
            }
          }
        }
      }
    ]).toArray();

    if (article.length === 0) {
      notFound();
    }

    const transformedArticle = article.map((article: any) => {
      return {
        _id: article._id.toString(),
        subTitle: article.subTitle,
        title: article.title,
        images: article.images,
        tags: article.tags,
        type: article.type,
        rating: article.rating,
        views: article.views,
        location: article.location,
        author: article.author,
        readTime: article.readTime,
        content: article.content,
        createdAt: article.createdAt,
        comments: article.comments
      };
    });

    return {
      error: false,
      article: transformedArticle,
      message: `Article fetched successfully.`,
      status: 200
    };

  } catch (e) {
    return {
      error: true,
      message: `Failed to fetch the article. ${e}`,
      status: 500
    };
  }

}

type ArticleCommentType = {
  _id: string,
  articleId: string,
  user: string,
  rating: number,
  title: string,
  text: string,
  addedAt: string,
  timestamp: Timestamp,
  likes: string[],
  dislikes: string[],
  abuseReports: string[],
  email: string
}

export async function addArticleComment(session: SessionType, formResults: FormResultsType, author: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  if (formResults.rating < 1 || formResults.rating > 5) {
    return {
      error: true,
      message: `Rating must be between 1 and 5.`
    };
  }

  if (formResults.user.length < 5 || formResults.user.length > 100) {
    return {
      error: true,
      message: `Name must be between 5 and 100 characters long.`
    };
  }

  if (formResults.title.length < 5 || formResults.title.length > 100) {
    return {
      error: true,
      message: `Title must be between 5 and 100 characters long.`
    };
  }
  if (formResults.text.length < 5 || formResults.text.length > 600) {
    return {
      error: true,
      message: `Text must be between 5 and 600 characters long.`
    };

  }
  if (formResults.user.trim() === ``) {
    return {
      error: true,
      message: `Name must not be empty.`
    };
  }

  if (formResults.email.trim() === ``) {
    return {
      error: true,
      message: `Email must not be empty.`
    };
  }

  const articleExists = await db.collection(`articles`).findOne({ _id: new ObjectId(formResults.articleId) });

  if (!articleExists) {
    return {
      error: true,
      message: `Error. Article does not exist.`
    };
  }

  if (session.user.email) {

    /* IMPORTANT: IF USER AUTHENTICATED  */
    //  If the session is active and user email is the same as the email provided in the form,
    //  use the email from the session and 1. push a new comment to the articleComments collection
    //  1. Push objectId of this comment to current article comments array,
    //  2. Push the rating number to the article ratings array
    //  3. Fetch the user
    //  Push notification about added comment to the user notifications array

    const user = await db.collection(`users`).findOne({ email: session.user.email });

    if (!user) {
      return {
        error: true,
        message: `Error. User does not exist.`
      };
    }

    if (session.user.email !== formResults.email) {
      return {
        error: true,
        message: `Error. User email does not match the email provided in the form.`
      };
    }

    const transformedData = {
      articleId: new ObjectId(formResults.articleId),
      user: formResults.user,
      rating: Number(formResults.rating),
      title: formResults.title,
      text: formResults.text,
      addedAt: new Date().toISOString(),
      timestamp: Timestamp.fromNumber(Date.now()),
      likes: [],
      dislikes: [],
      abuseReports: [],
      email: formResults.email
    };

    const newNotification = {
      type: `darkOrange`,
      icon: `letter`,
      addedAt: new Date(),
      timestamp: Timestamp.fromNumber(Date.now()),
      text: `You successfully added a comment to
       <a class="highlighted text-decoration-none" 
       href="/articles/${formResults.articleId}">${articleExists.title.length
      > 60 ? articleExists.title.slice(0, 60) : articleExists.title}</a> article!`
    };

    /*  extract the formResults, transform them in a needed form and push it to the articleComments */
    const response = await db.collection(`articleComments`).insertOne(transformedData);

    if (!response.acknowledged) {
      return {
        error: true,
        message: `Failed to insert the comment.`
      };
    } else {
      // silently push the comment to the article comments array and the rating to the article ratings array
      await db.collection(`articles`).updateOne({ _id: new ObjectId(formResults.articleId) }, {
        // @ts-ignore
        $push: {
          comments: new ObjectId(response.insertedId),
          rating: Number(formResults.rating)
        }
      });
      // silently push a notification to the user notifications array
      await db.collection(`users`).updateOne({ email: session.user.email }, {
        // @ts-ignore
        $push: {
          notifications: newNotification
        }
      });

      /* fetch author and push the rating value onto his rating array */
      await db.collection(`travelArticlesAuthors`).updateOne({ _id: new ObjectId(author) }, {
        // @ts-ignore
        $push: {
          rating: Number(formResults.rating)
        }
      });


      revalidatePath(`/articles`, `layout`);

      return {
        error: false,
        message: `The comment was successfully inserted.`
      };

    }


  } else {
    /* IMPORTANT: IF USER IS NOT AUTHENTICATED */

    // Check if the session is not active, then..
    // first, ensure that the email user entered is not already in the users collection
    // second, push a new comment to the articleComments collection
    const userExists = await db.collection(`users`).findOne({ email: formResults.email });

    if (userExists) {
      return {
        error: true,
        message: `Error. User with this email already exists.`
      };
    }


    const transformedData = {
      articleId: new ObjectId(formResults.articleId),
      user: formResults.user,
      rating: Number(formResults.rating),
      title: formResults.title,
      text: formResults.text,
      addedAt: new Date().toISOString(),
      timestamp: Timestamp.fromNumber(Date.now()),
      likes: [],
      dislikes: [],
      abuseReports: [],
      email: formResults.email
    };

    /*  extract the formResults, transform them in a needed form and push it to the articleComments */
    const response = await db.collection(`articleComments`).insertOne(transformedData);

    if (!response.acknowledged) {
      return {
        error: true,
        message: `Failed to insert the comment.`
      };
    } else {
      // silently push the comment to the article comments array and the rating to the article ratings array
      await db.collection(`articles`).updateOne({ _id: new ObjectId(formResults.articleId) }, {
        // @ts-ignore
        $push: {
          comments: new ObjectId(response.insertedId),
          rating: Number(formResults.rating)
        }
      });

      /* fetch author and push the rating value onto his rating array */
      await db.collection(`travelArticlesAuthors`).updateOne({ _id: new ObjectId(author) }, {
        // @ts-ignore
        $push: {
          rating: Number(formResults.rating)
        }
      });


      revalidatePath(`/articles`, `layout`);

      return {
        error: false,
        message: `The comment was successfully inserted.`
      };

    }

  }


}

export type handleArticleCommentActionType = {
  type: `like` | `dislike`,
  session: SessionType,
  commentId: string
}

export async function handleArticleCommentAction(type: `like` | `dislike`, session: SessionType, commentId: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const userExists = await db.collection(`users`).findOne({ email: session.user.email });

  if (!userExists) {
    return {
      error: true,
      message: `Error. User does not exist.`
    };
  }
  const comment = await db.collection(`articleComments`).findOne({ _id: new ObjectId(commentId) }) as ArticleCommentType | null;

  if (!comment) {
    return {
      error: true,
      message: `Error. Comment does not exist.`
    };
  }
  ///////////////////////////////////////

  if (type === `like`) {

    /* if user already liked comment, I should remove like. */
    if (comment.likes.includes(session.user.email) && !comment.dislikes.includes(session.user.email)) {
      const response = await db.collection(`articleComments`).updateOne({ _id: new ObjectId(commentId) }, {
        // @ts-ignore
        $pull: {
          likes: session.user.email
        }
      });
      if (!response.acknowledged) {
        return {
          error: true,
          message: `Failed to remove the like.`
        };
      } else {

        revalidatePath(`/articles`, `layout`);
        return {
          error: false,
          message: `The like was successfully removed.`
        };
      }

    }

    /* if user did not like comment but disliked it before, remove the dislike and like it. */
    if (!comment.likes.includes(session.user.email) && comment.dislikes.includes(session.user.email)) {
      const response = await db.collection(`articleComments`).updateOne({ _id: new ObjectId(commentId) }, {
        // @ts-ignore
        $pull: {
          dislikes: session.user.email
        },
        // @ts-ignore
        $push: {
          likes: session.user.email
        }
      });

      if (!response.acknowledged) {
        return {
          error: true,
          message: `Failed to remove the dislike and like the comment.`
        };
      } else {
        revalidatePath(`/articles`, `layout`);
        return {
          error: false,
          message: `The dislike was successfully removed and the comment was liked.`
        };
      }
    }

    /*  if user did not like comment yet and did not dislike it, then just like it. */
    if (!comment.likes.includes(session.user.email) && !comment.dislikes.includes(session.user.email)) {
      const response = await db.collection(`articleComments`).updateOne({ _id: new ObjectId(commentId) }, {
        // @ts-ignore
        $push: {
          likes: session.user.email
        }
      });

      if (!response.acknowledged) {
        return {
          error: true,
          message: `Failed to remove the dislike and like the comment.`
        };
      } else {
        revalidatePath(`/articles`, `layout`);
        return {
          error: false,
          message: `The dislike was successfully removed and the comment was liked.`
        };
      }

    }
  }

  if (type === `dislike`) {
    /*  if user did dislike comment before, remove dislike */
    if (comment.dislikes.includes(session.user.email) && !comment.likes.includes(session.user.email)) {
      const response = await db.collection(`articleComments`).updateOne({ _id: new ObjectId(commentId) }, {
        // @ts-ignore
        $pull: {
          dislikes: session.user.email
        }
      });
      if (!response.acknowledged) {
        return {
          error: true,
          message: `Failed to remove the dislike.`
        };
      } else {
        revalidatePath(`/articles`, `layout`);
        return {
          error: false,
          message: `The dislike was successfully removed.`
        };
      }
    }

    /*  if user did not dislike comment but he already liked it before, remove like and add dislike */
    if (!comment.dislikes.includes(session.user.email) && comment.likes.includes(session.user.email)) {
      const response = await db.collection(`articleComments`).updateOne({ _id: new ObjectId(commentId) }, {
        // @ts-ignore
        $pull: {
          likes: session.user.email
        },
        // @ts-ignore
        $push: {
          dislikes: session.user.email
        }
      });

      if (!response.acknowledged) {
        return {
          error: true,
          message: `Failed to remove the like and dislike the comment.`
        };
      } else {
        revalidatePath(`/articles`, `layout`);
        return {
          error: false,
          message: `The like was successfully removed and the comment was disliked.`
        };
      }
    }

    /* if user did not dislike nor liked comment, just dislike it. */
    if (!comment.dislikes.includes(session.user.email) && !comment.likes.includes(session.user.email)) {
      const response = await db.collection(`articleComments`).updateOne({ _id: new ObjectId(commentId) }, {
        // @ts-ignore
        $push: {
          dislikes: session.user.email
        }
      });

      if (!response.acknowledged) {
        return {
          error: true,
          message: `Failed to dislike the comment.`
        };
      } else {
        revalidatePath(`/articles`, `layout`);
        return {
          error: false,
          message: `The comment was successfully disliked.`
        };
      }
    }
  }

}

///////////////////////////////////////


/* IMPORTANT: ARTICLE CREATORS */

export async function fetchArticlesAuthors(project: {} = {}, limit?: number) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  // Create a flexible way to fetch authors, including conditions
  // for projection and limit
  const limitVal = limit ? limit : 9999;

  const response = await db.collection(`travelArticlesAuthors`).find({}, { projection: project }).limit(limitVal).toArray();

  if (!response) {
    return {
      error: true,
      message: `Failed to fetch authors.`,
      status: 500
    };
  }

  return {
    error: false,
    authors: response,
    message: `Authors fetched successfully.`,
    status: 200
  };

}

///////////////////////////////////////

/* IMPORTANT: ABUSE REPORTS */
export async function reportArticleCommentAbuse(commentId: string, session: SessionType) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const user = await db.collection(`users`).findOne({ email: session.user.email });

  if (!user) {
    return {
      error: true,
      message: `Error. User does not exist.`
    };
  }

  const comment = await db.collection(`articleComments`).findOne({ _id: new ObjectId(commentId) });

  if (!comment) {
    return {
      error: true,
      message: `Error. Comment does not exist.`
    };
  }

  const response = await db.collection(`articleComments`).updateOne({ _id: new ObjectId(commentId) }, {
    $addToSet: {
      abuseReports: session.user.email
    }
  });

  if (response.acknowledged) {
    revalidatePath('/articles', 'layout');
    return {
      error: false,
      message: `The comment was successfully reported.`
    };
  } else {
    return {
      error: true,
      message: `Failed to report the comment.`
    };
  }
}


///////////////////////////////////////

/* IMPORTANT: ARTICLE DESCRIPTION ACTIONS */

export async function isUserHaveArticleInList(session: SessionType, articleId: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const user = await db.collection(`users`).findOne({ email: session.user.email }) as UserType | null;

  if (!user) {
    return {
      error: true,
      message: `Error. User does not exist.`
    };
  }

  const article = await db.collection(`articles`).findOne({ _id: new ObjectId(articleId) });

  if (!article) {
    return {
      error: true,
      message: `Error. Article does not exist.`
    };
  }

  const articleObjectId = new ObjectId(articleId);
  // console.log(`Executing articleId`, articleObjectId);

  // @ts-ignore
  if (user.savedArticles.some((id: ObjectId) => id.equals(articleObjectId))) {
    return {
      error: false,
      status: true,
      message: `User has this article in the list.`
    };
  } else {
    return {
      error: false,
      status: false,
      message: `User does not have this article in the list.`
    };
  }
}

export async function handleAddOrRemoveArticleFromList(type: `add` | `remove`, session: SessionType, articleId: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const user = await db.collection(`users`).findOne({ email: session.user.email }) as UserType | null;

  if (!user) {
    return {
      error: true,
      message: `Error. User does not exist.`
    };
  }

  const article = await db.collection(`articles`).findOne({ _id: new ObjectId(articleId) });

  if (!article) {
    return {
      error: true,
      message: `Error. Article does not exist.`
    };
  }

  if (type === `add`) {
    /* TODO: Use "$addToSet" operator to push articleId to user's savedArticles array. */
    const response = await db.collection(`users`).updateOne({ email: session.user.email }, {
      // @ts-ignore
      $addToSet: {
        savedArticles: new ObjectId(articleId)
      }
    });
    if (!response.acknowledged) {
      return {
        error: true,
        message: `Failed to add article to the list.`
      };
    } else {
      return {
        error: false,
        message: `Article added to the list.`
      };
    }
  }

  if (type === `remove`) {
    /* TODO: remove article from user's savedArticles array. */
    const response = await db.collection(`users`).updateOne({ email: session.user.email }, {
      // @ts-ignore
      $pull: {
        savedArticles: new ObjectId(articleId)
      }
    });
    if (!response.acknowledged) {
      return {
        error: true,
        message: `Failed to remove article from the list.`
      };

    } else {
      return {
        error: false,
        message: `Article removed from the list.`
      };
    }
  }

}

///////////////////////////////////////

/* IMPORTANT: USER: SAVED ARTICLES */
export async function deleteAllUserSavedArticles(userEmail: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const user = await db.collection(`users`).findOne({ email: userEmail }) as UserType | null;

  if (!user) {
    return {
      error: true,
      message: `Error. User does not exist.`
    };
  }

  const response = await db.collection(`users`).updateOne({ email: userEmail }, {
    $set: {
      savedArticles: []
    }
  });

  if (!response.acknowledged) {
    return {
      error: true,
      message: `Failed to delete saved articles.`
    };
  } else {

    revalidatePath(`/account-settings`, `layout`);
    return {
      error: false,
      message: `All saved articles were successfully deleted.`
    };
  }

}

export async function deleteUserSavedArticle(userEmail: string, articleId: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  const user = await db.collection(`users`).findOne({ email: userEmail }) as UserType | null;

  if (!user) {
    return {
      error: true,
      message: `Error. User does not exist.`
    };
  }

  const article = await db.collection(`articles`).findOne({ _id: new ObjectId(articleId) });

  if (!article) {
    return {
      error: true,
      message: `Error. Article does not exist.`
    };
  }

  const response = await db.collection(`users`).updateOne({ email: userEmail }, {
    // @ts-ignore
    $pull: {
      savedArticles: new ObjectId(articleId)
    }
  });

  if (!response.acknowledged) {
    return {
      error: true,
      message: `Failed to delete saved article.`
    };
  } else {
    revalidatePath(`/account-settings`, `layout`);
    return {
      error: false,
      message: `The saved article was successfully deleted.`
    };
  }

}

///////////////////////////////////////


/* IMPORTANT: TRACK ORDER */

export async function fetchTrackedOrderData(orderId: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  console.log(`Executing orderId: `, orderId);

  // check if orderId is  a valid ObjectId
  if (!ObjectId.isValid(orderId)) {
    return {
      error: true,
      message: `Invalid order ID!`
    };
  }

  const orderDetails = await db.collection(`orders`).aggregate(
    [
      {
        $match: {
          _id: new ObjectId(orderId)
        }
      },
      {
        $project: {
          _id: 1,
          tourId: 1,
          tourTitle: 1,
          extraDetails: 1,
          meetingPoint: 1,
          'booking.tickets.overall': 1,
          contactDetails: 1
        }
      },
      {
        $group: {
          _id: '$_id',
          status: {
            $first: '$extraDetails.state.status'
          },
          tour: {
            $first: {
              _id: '$tourId',
              title: '$tourTitle'
            }
          },
          tickets: {
            $first: '$booking.tickets.overall'
          },
          refundAvailable: {
            $first: '$extraDetails.refund.available'
          },
          refundRequested: {
            $first: '$extraDetails.refund.requested'
          },
          cancellationAvailable: {
            $first:
              '$extraDetails.cancellation.available'
          },
          cancellationRequested: {
            $first: '$extraDetails.cancellation.requested'
          },
          createdAt: {
            $first: '$extraDetails.createdAt'
          },
          orderMadeBy: {
            $first: {
              $concat: [
                '$contactDetails.firstName',
                ' ',
                '$contactDetails.lastName'
              ]
            }
          },

          location: {
            $first: {
              googleMap: {
                key: '$meetingPoint.title',
                location: {
                  lat: {
                    $arrayElemAt: ['$meetingPoint.location.coordinates', 0]
                  },
                  lng: {
                    $arrayElemAt: ['$meetingPoint.location.coordinates', 1]
                  }
                }
              }
            }
          }
        }
      }
    ]).toArray();

  if (orderDetails.length === 0) {
    return {
      error: true,
      message: `Order does not exist, it seems!`
    };
  }

  if (!orderDetails) {
    return {
      error: true,
      message: `Failed to fetch order details.`
    };
  }


  if (orderDetails.length > 0) {
    return {
      error: false,
      order: orderDetails[0],
      message: `Order details fetched successfully.`
    };

  } else {
    return {
      error: true,
      message: `Failed to fetch order details.`
    };
  }

}

///////////////////////////////////////

/* IMPORTANT: ARTICLE NEWSLETTER */

export async function subscribeOnArticleNewsletter(email: string) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

  if (!email.trim() || !email.includes(`@`)) {
    return {
      error: true,
      message: `Invalid email address.`
    };
  }

  // upsert the email to the newsletter collection
  const response = await db.collection(`articlesNewsletter`).updateOne({ email: email }, {
    $set: {
      email: email
    }
  }, { upsert: true });

  if (!response.acknowledged) {
    return {
      error: true,
      message: `Failed to subscribe to the newsletter.`
    };
  }
  return {
    error: false,
    message: `You successfully subscribed to the newsletter.`
  };


}

///////////////////////////////////////
/* IMPORTANT: LAYLA AI */

export type LaylaResponseType = {
  response: string;
  status: number;
  query: string;
  date: string;
}

export async function saveLaylaResponse(response: LaylaResponseType) {
  const client = await clientPromise;
  const db = client.db(`viatoursdb`);

}

