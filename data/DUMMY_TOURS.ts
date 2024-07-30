import tourCard2 from '@/assets/images/homepage/topTrending/tourCard_image_6.svg';
import tourCard6 from '../assets/images/homepage/topTrending/tourCard_image_6.svg';
import tourCard3 from '../assets/images/homepage/topTrending/tourCard_image_7.svg';
import tourCard7 from '../assets/images/homepage/topTrending/tourCard_image_7.svg';
import tourCard4 from '../assets/images/homepage/topTrending/tourCard_image_8.svg';
import tourCard8 from '../assets/images/homepage/topTrending/tourCard_image_8.svg';
import tourCard5 from '../assets/images/homepage/topTrending/tourCard_image_9.svg';
import tourCard10 from '../assets/images/homepage/topTrending/tourCard_image_10.svg';

import eiffelImage1 from '@/assets/images/homepage/topTrending/Eiffel/Eiffel-1.png';
import eiffelImage2 from '@/assets/images/homepage/topTrending/Eiffel/Eiffel-2.png';
import eiffelImage3 from '@/assets/images/homepage/topTrending/Eiffel/Eiffel-3.png';
import eiffelImage4 from '@/assets/images/homepage/topTrending/Eiffel/Eiffel-4.png';
import eiffelImage5 from '@/assets/images/homepage/topTrending/Eiffel/Eiffel-5.png';
import eiffelImage6 from '@/assets/images/homepage/topTrending/Eiffel/Eiffel-6.png';
import { MeetingPointType, USA_MEETING_POINTS } from '@/data/DUMMY_MEETING_POINTS';


// import tourCard9 from '@/assets/images/topTrending/tourCard_image_9.svg';

export interface TourInterface {
  _id: string;
  title: string;
  overview: string;
  country: string;
  city: string;
  reviews: number;
  views: number;
  time: string[];
  type: string[];
  price: {
    adult: number;
    youth: number;
    children: number;
    extra: {
      servicePerBooking: number,
      servicePerPerson: number;
      adult: number;
      youth: number;
    }
  };
  tags: string[];
  booked: number;
  images: string[];
  duration: string;
  groupSize: number;
  ages: string;
  tourHighlights: string[];
  whatsIncluded: {
    green: string[];
    orange: string[];
  };
  itinerary: {
    title: string;
    description: string;
  }[];
  tourMap: {
    label: string,
    location: { type: `Point` | `Polygon`, coordinates: [number, number] },
    googleMap: { key: string, location: google.maps.LatLngLiteral }
  }[];
  meetingPoint: MeetingPointType;
  searchIndex: string;
  available: boolean;
  onSale: false | {
    newPrice: {
      adult: number,
      youth: number,
      children: number,
      extra: { servicePerBooking: number, servicePerPerson: number, adult: number, youth: number }
    }
  };
  languages: string[];
  rating: {
    overall: number;
    location: number;
    amenities: number;
    food: number;
    price: number;
    rooms: number;
    tourOperator: number;
  };
  comments: { id: string }[] | [];
  tourComments: {
    _id: string;
    user: string;
    rating: number;
    title: string;
    text: string;
    images: string[];
    addedAt: string;
    likes: number;
    dislikes: number;
  }[];
}

export const DUMMY_TOURS: TourInterface[] = [
  {
    id: `e1`,
    title: `Explore the Eiffel Tower to the Fullest!`,
    overview: `The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.`,
    country: 'France',
    city: 'Paris',
    reviewed: 179,
    views: 999,
    time: [
      '6:30',
      '10:30',
      '14:30',
      '18:30'
    ],
    //////////////////////////////////////
    rating: {
      // depending on the total number of reviews, assuming 5 is 100% we need to calculate the total rating
      // in this math way: total rating = (5 * 100) / reviewed
      overall: 4.33,
      location: 3.77,
      amenities: 4,
      food: 4.7,
      price: 3.8,
      rooms: 4.5,
      tour_operator: 4.2
    },
    //////////////////////////////////////
    type: [
      'Nature Tours'
      // 'Adventure tours',
      // 'Cultural Tours',
      // 'Food Tours',
      // 'City Tours',
      // 'Cruises Tours',
      // 'Family',
      // 'Relaxing',
      // 'Nightlife'
    ],
    //////////////////////////////////////
    price: {
      adult: 231.99,
      youth: 199.99,
      children: 99.99
    },
    //////////////////////////////////////
    price_for_extra: {
      service_per_booking: 40,
      service_per_person: 20,
      adult: 30,
      youth: 20
    },
    //////////////////////////////////////
    tag: [
      // INFO: MANY OF THESE
      'new',
      `popular`,
      // '5-off',
      // '20-off',
      // '60-off',
      // '90-off',
      'price:100-300',
      // 'price:300-700',
      // 'price:700-1299'
      'duration:7-14'
    ],
    //////////////////////////////////////
    booked: 1009,
    //////////////////////////////////////
    images: [
      // INFO: TO SEVEN IMAGES. MIN - 4
      eiffelImage1,
      eiffelImage2,
      eiffelImage3,
      eiffelImage4,
      eiffelImage5,
      eiffelImage6
    ],
    //////////////////////////////////////
    duration: [
      // INFO: ONE OF THESE
      '7 days'
    ],
    //////////////////////////////////////
    group_size: 10,
    //////////////////////////////////////
    ages: [
      // INFO: ONE OF THESE
      '6-99'
      // '14-99',
      // '18-99'
    ],
    //////////////////////////////////////
    languages: [
      // INFO: ONE OF THESE
      // 'Ukrainian',
      'English',
      'French'
      // 'Spanish'
    ],
    //////////////////////////////////////
    tour_highlights: [
      'Experience the thrill of a speedboat to the stunning Phi Phi Islands',
      'Swim and snorkel in the crystal clear waters of Maya Bay',
      'Marvel at the limestone karst formations of Viking Cave',
      'Enjoy a delicious buffet lunch on Phi Phi Don Island',
      'Visit the famous Monkey Beach and feed the friendly monkeys',
      'Relax on the white sand beach of Bamboo Island',
      'Cool off with a swim in the Andaman Sea',
      'Snorkel among colorful fish and coral reefs'
      // INFO: AND SO ON....
    ],
    //////////////////////////////////////
    what_included: {
      'green': [
        'Beverages, drinking water, morning tea and buffet lunch',
        'Snorkeling equipment and life jacket',
        'National park entrance fee',
        'Professional guide',
        'Life insurance'
        // INFO: AND SO ON....
      ],
      'orange': [
        'Tips',
        'Towel',
        'Personal expenses',
        'Hotel transfer',
        'Alcoholic drinks'
        // INFO: AND SO ON....
      ]
    },
    //////////////////////////////////////
    itinerary: [
      {
        title: 'Day 1: Airport Pickup',
        description: `Our team will be waiting for you at the airport to
         take you to your hotel. You can rest after your flight and start exploring the city at your own pace.`
      },
      {
        title: `Day 2: Temples & River Cruise`,
        description: `We will visit the most iconic temples in the city in the morning. In the
                afternoon, we will take a relaxing river cruise and enjoy the city's skyline.`
      },
      {
        title: `Day 3: Massage & Overnight Train`,
        description: `Like on all of our trips, we can
         collect you from the airport when you land and take you directly
          to your hotel. The first Day is just a check-in Day so you have this freedom to explore the city and get settled in.`
      },
      {
        title: `Day 4: Khao Sok National Park`,
        description: `We will spend the day exploring Khao Sok National Park, one of the country's most beautiful nature reserves. You will see a variety of wildlife and enjoy the stunning scenery.`
      },
      {
        title: `Day 5: Travel to Koh Phangan`,
        description: `We will travel to the beautiful island of Koh Phangan. You can spend the day at the beach, try water sports, or just relax and enjoy the island's laid-back atmosphere.`
      },
      {
        title: `Day 6: Morning Chill & Muay Thai Lesson`,
        description: `Start the day with a relaxing morning at your leisure. In the afternoon, we will take you to a local gym for a Muay Thai lesson with a professional instructor.`
      },
      {
        title: `Day 7: Island Boat Trip`,
        description: `We will take a boat trip to the nearby islands, where you can snorkel, swim, and relax on the beach. You will have the opportunity to see colorful fish, coral reefs, and other marine life.`
      }
    ],
    //////////////////////////////////////
    tour_map: [
      {
        location: { lat: 48.8566, lng: 2.3522 },
        key: 'operaHouse'
      }, // Central Paris
      {
        location: { lat: 48.8602, lng: 2.3508 },
        key: 'louvreMuseum'
      },
      {
        location: { lat: 48.8738, lng: 2.2950 },
        key: 'arcDeTriomphe'
      },
      {
        location: { lat: 48.8606, lng: 2.3376 },
        key: 'museeDOrsay'
      },
      {
        location: { lat: 48.8566, lng: 2.3522 },
        key: 'eiffelTower'
      }
    ],
    meeting_point: USA_MEETING_POINTS[0]
    //////////////////////////////////////
    // comments: [
    //   // INFO: INJECT COMMENT SCHEMA
    //   {
    //     id: `c1`
    //   }
    // ]
  },
  {
    id: `e2`,
    title: `Louvre Museum Discovery`,
    overview: `Explore the world-renowned Louvre Museum in Paris, home to thousands of classic and modern masterpieces. This tour offers an intimate look at the highlights of the museum, including the Mona Lisa and the Venus de Milo.`,
    country: 'Spain',
    city: 'Barcelona',
    reviewed: 215,
    views: 1500,
    time: [
      '9:30',
      '13:30',
      '17:30'],
    rating: {
      overall: 4.5,
      location: 5,
      amenities: 4,
      food: 4,
      price: 4,
      rooms: 4,
      tour_operator: 4.5
    },
    type: [
      'Cultural Tours',
      'City Tours'
    ],
    price: {
      adult: 115.50,
      youth: 85.99,
      children: 45.99
    },
    price_for_extra: {
      service_per_booking: 30,
      service_per_person: 15,
      adult: 20,
      youth: 10
    },
    tag: [
      'new',
      'price:100-300',
      'duration:7-14'
    ],
    booked: 780,
    images: [
      tourCard2
    ],
    duration: [
      '12 days'
    ],
    group_size: 15,
    ages: [
      '14-99'
    ],
    languages: [
      'English',
      'French',
      'Spanish'
    ],
    tour_highlights: [
      'Skip-the-line access to the Louvre Museum',
      'Guided tour of the museum’s most famous artworks',
      'Learn about the history and secrets of the museum',
      'Personalized attention in a small group setting'
    ],
    what_included: {
      'green': [
        'Skip-the-line entrance ticket',
        'Professional guide',
        'Headsets to hear the guide clearly',
        'Small group tour'
      ],
      'orange': [
        'Hotel pickup and drop-off',
        'Food and drinks',
        'Gratuities'
      ]
    },
    itinerary: [
      {
        title: 'Day 1: Louvre Museum Tour',
        description: `Meet your guide at the museum entrance and skip the long lines to enter the Louvre. Explore the museum's highlights, including the Mona Lisa, the Venus de Milo, and the Winged Victory of Samothrace.`
      },
      {
        title: 'Day 2 Free Time',
        description: `Enjoy a free day to explore Paris at your own pace. You can visit other museums, go shopping, or relax in a café.`
      },
      {
        title: 'Day 3: Breakfast',
        description: `Start the day with a delicious breakfast at a local café. You can try croissants, pain au chocolat, and other French pastries.`
      }
    ],
    tour_map: [
      {
        location: { lat: 48.8606, lng: 2.3376 },
        key: 'louvreMuseum'
      },
      {
        location: { lat: 48.8566, lng: 2.3522 },
        key: 'centralParis'
      },
      {
        location: { lat: 48.8602, lng: 2.3508 },
        key: 'eiffelTower'
      },
      {
        location: { lat: 48.8738, lng: 2.2950 },
        key: 'arcDeTriomphe'
      }
    ],
    meeting_point: USA_MEETING_POINTS[5]
    // comments: [
    //   {
    //     id: `c2`
    //   }
    // ]
  },
  {
    id: `e3`,
    title: `Seine River Cruise`,
    overview: `Enjoy a scenic cruise on the Seine River in Paris. This tour offers breathtaking views of the city's most famous landmarks from the water, including the Eiffel Tower, Notre Dame, and the Louvre Museum.`,
    country: 'Italy',
    city: 'Roma',
    reviewed: 300,
    views: 2000,
    time: [
      '10:30',
      '14:30',
      '18:30'
    ],
    rating: {
      overall: 4.8,
      location: 5,
      amenities: 5,
      food: 4.5,
      price: 4.5,
      rooms: 4,
      tour_operator: 5
    },
    type: [
      'Cruises Tours',
      'City Tours',
      'Relaxing'
    ],
    price: {
      adult: 475.99,
      youth: 655.99,
      children: 330.99
    },
    price_for_extra: {
      service_per_booking: 30,
      service_per_person: 50,
      adult: 20,
      youth: 30
    },
    tag: [
      'new',
      'price:300-700',
      'duration:3-7'
    ],
    booked: 1200,
    images: [
      tourCard3
    ],
    duration: [
      '7 days'
    ],
    group_size: 20,
    ages: [
      '6-99'
    ],
    languages: [
      'English',
      'French'
    ],
    tour_highlights: [
      'Scenic cruise on the Seine River',
      'Panoramic views of Paris from the water',
      'Pass by famous landmarks like the Eiffel Tower and Notre Dame',
      'Live commentary in multiple languages'
    ],
    what_included: {
      'green': [
        'Seine River cruise',
        'Live commentary in multiple languages',
        'Professional guide',
        'Life insurance'
      ],
      'orange': [
        'Hotel pickup and drop-off',
        'Food and drinks',
        'Gratuities'
      ]
    },
    itinerary: [
      {
        title: 'Day 1: Seine River Cruise',
        description: `Board the boat at the designated pier and set sail on the Seine River. Enjoy panoramic views of Paris from the water and pass by famous landmarks like the Eiffel Tower, Notre Dame, and the Louvre Museum.`
      },
      {
        title: 'Day 2: Free Time',
        description: `Spend the day exploring Paris at your own pace. You can visit other attractions, go shopping, or relax in a café.`
      },
      {
        title: 'Day 3: Breakfast',
        description: `Start the day with a delicious breakfast at a local café. You can try croissants, pain au chocolat, and other French pastries.`
      }
    ],
    tour_map: [
      {
        location: { lat: 48.8566, lng: 2.3522 },
        key: 'centralParis'
      },
      {
        location: { lat: 48.8606, lng: 2.3376 },
        key: 'seineRiver'
      }
    ],
    meeting_point: USA_MEETING_POINTS[1]
    // comments: [
    //   {
    //     id: `c3`
    //   }
    // ]
  },
  {
    id: `e4`,
    title: `Kyiv Pechersk Lavra Tour`,
    overview: `Explore the historic Kyiv Pechersk Lavra, a UNESCO World Heritage Site. This tour offers an intimate look at the Orthodox Christian monastery's caves, churches, and museum collections.`,
    country: 'Ukraine',
    city: 'Kyiv',
    reviewed: 89,
    time: [
      '10:30',
      '14:30',
      '17:00'
    ],
    views: 670,
    rating: {
      overall: 4.7,
      location: 5,
      amenities: 4.5,
      food: 4,
      price: 4.5,
      rooms: 4,
      tour_operator: 4.8
    },
    type: [
      'Cultural Tours',
      'Family'
    ],
    price: {
      adult: 150.00,
      youth: 330.00,
      children: 120.00
    },
    price_for_extra: {
      service_per_booking: 10,
      service_per_person: 5,
      adult: 10,
      youth: 5
    },
    tag: [
      'price:100-300',
      'duration:1-3'
    ],
    booked: 320,
    images: [
      tourCard4
    ],
    duration: [
      '2 days'
    ],
    group_size: 15,
    ages: [
      '6-99'
    ],
    languages: [
      'English',
      'Ukrainian'
    ],
    tour_highlights: [
      'Guided tour of the Kyiv Pechersk Lavra',
      'Visit the monastery\'s caves and see mummified monks',
      'Explore the Lavra\'s museums and their sacred artifacts',
      'Enjoy breathtaking views of the Dnieper River',
      'Learn about the history of Orthodoxy in Ukraine'
    ],
    what_included: {
      'green': [
        'Entrance tickets to all Lavra\'s parts',
        'Professional guide',
        'Headsets to hear the guide clearly',
        'Small group tour for a more personalized experience'
      ],
      'orange': [
        'Hotel pickup and drop-off',
        'Food and drinks',
        'Gratuities'
      ]
    },
    itinerary: [
      {
        title: 'Day 1: Kyiv Pechersk Lavra Tour',
        description: `Meet at the Lavra's main entrance and start the guided tour. Visit the monastery's caves, churches, and museums to learn about its history and significance.`
      },
      {
        title: 'Day 2: Free Time',
        description: `Spend the day exploring Kyiv at your own pace. You can visit other attractions, go shopping, or relax in a café.`
      },
      {
        title: 'Day 3: Breakfast',
        description: `Start the day with a delicious breakfast at a local café. You can try traditional Ukrainian dishes like borscht, varenyky, and salo.`
      }
    ],
    tour_map: [
      {
        location: { lat: 50.4345, lng: 30.5592 },
        key: 'pecherskLavra'
      },
      {
        location: { lat: 50.4547, lng: 30.5238 },
        key: 'dnieperRiver'
      }
    ],
    meeting_point: USA_MEETING_POINTS[3]
    // comments: [
    //   {
    //     id: `c4`
    //   }
    // ]
  },
  {
    id: `e5`,
    title: `Montmartre Walking Tour`,
    overview: `Discover the bohemian heart of Paris on a walking tour of Montmartre. Explore the winding streets, the bustling Place du Tertre, and the stunning Sacré-Cœur Basilica.`,
    country: 'France',
    city: 'Paris',
    reviewed: 142,
    views: 850,
    time: [
      '10:30',
      '14:30',
      '17:00'
    ],
    rating: {
      overall: 4.6,
      location: 5,
      amenities: 4,
      food: 4.5,
      price: 4.2,
      rooms: 4,
      tour_operator: 4.7
    },
    type: [
      'Nightlife',
      'Cultural Tours'
    ],
    price: {
      adult: 435.00,
      youth: 625.00,
      children: 315.00
    },
    price_for_extra: {
      service_per_booking: 45,
      service_per_person: 40,
      adult: 30,
      youth: 20
    },
    tag: [
      'featured',
      'price:300-700',
      'duration:1-3'
    ],
    booked: 412,
    images: [
      tourCard5
    ],
    duration: [
      '3 days'
    ],
    group_size: 20,
    ages: [
      '6-99'
    ],
    languages: [
      'English',
      'French'
    ],
    tour_highlights: [
      'Stroll through the historic streets of Montmartre',
      'Visit the iconic Sacré-Cœur Basilica',
      'Explore the artists\' square, Place du Tertre',
      'Discover the spots that inspired famous artists like Picasso and Van Gogh'
    ],
    what_included: {
      'green': [
        'Professional guide',
        'Headsets to hear the guide clearly',
        'Small group tour for a more personalized experience'
      ],
      'orange': [
        'Hotel pickup and drop-off',
        'Food and drinks',
        'Gratuities'
      ]
    },
    itinerary: [
      {
        title: 'Day 1: Montmartre Walking Tour',
        description: `Meet at Blanche Metro Station and start the walking tour. Explore the winding streets of Montmartre, visit the Place du Tertre, and learn about the area's artistic history.`
      },
      {
        title: 'Day 2: Sacré-Cœur Basilica',
        description: `Visit the stunning Sacré-Cœur Basilica and enjoy panoramic views of Paris from the hilltop. Learn about the basilica's history and significance.`
      },
      {
        title: 'Day 3: Free Time',
        description: `Spend the day exploring Paris at your own pace. You can visit other attractions, go shopping, or relax in a café.`
      }
    ],
    tour_map: [
      {
        location: { lat: 48.8867, lng: 2.3431 },
        key: 'montmartre'
      },
      {
        location: { lat: 48.8869, lng: 2.3372 },
        key: 'sacreCoeur'
      }
    ],
    meeting_point: USA_MEETING_POINTS[2]
    // comments: [
    //   {
    //     id: `c5`
    //   }
    // ]
  },
  {
    id: `e6`,
    title: `Cappadocia Hot Air Balloon Experience`,
    overview: `Embark on an unforgettable adventure with a hot air balloon ride over the magical landscapes of Cappadocia. Witness the sunrise over the unique rock formations and fairy chimneys from the sky.`,
    country: 'Turkey',
    city: 'Cappadocia',
    reviewed: 256,
    views: 1200,
    time: [
      '6:30',
      '10:30',
      '14:30',
      '18:30'
    ],
    rating: {
      overall: 4.9,
      location: 5,
      amenities: 4.5,
      food: 4,
      price: 4.8,
      rooms: 4.5,
      tour_operator: 5
    },
    type: [
      'Adventure Tours',
      'Nature Tours'
    ],
    price: {
      adult: 250.00,
      youth: 200.00,
      children: 150.00
    },
    price_for_extra: {
      service_per_booking: 30,
      service_per_person: 15,
      adult: 20,
      youth: 10
    },
    tag: [
      'featured',
      'price:100-300',
      'duration:7-14'
    ],
    booked: 890,
    images: [
      tourCard6
    ],
    duration: [
      '13 days'
    ],
    group_size: 16,
    ages: [
      '14-99'
    ],
    languages: [
      'English',
      'Turkish'
    ],
    tour_highlights: [
      'Experience the thrill of a hot air balloon ride at sunrise',
      'Enjoy panoramic views of Cappadocia’s stunning landscapes',
      'Capture breathtaking photos of the fairy chimneys',
      'Celebrate your flight with a champagne toast upon landing'
    ],
    what_included: {
      'green': [
        'Hot air balloon ride',
        'Professional pilot and guide',
        'Champagne toast',
        'Transfer from and to hotel',
        'Flight certificate'
      ],
      'orange': [
        'Gratuities',
        'Personal expenses',
        'Breakfast'
      ]
    },
    itinerary: [
      {
        title: 'Day 1: Hotel Pickup',
        description: `Early morning pickup from your hotel and transfer to the launch site`
      },
      {
        title: 'Day 2: Hot Air Balloon Ride',
        description: `Enjoy a thrilling hot air balloon ride over Cappadocia at sunrise`
      },
      {
        title: 'Day 3: Return to Hotel',
        description: `Transfer back to your hotel after the flight`
      }
    ],
    tour_map: [
      {
        location: { lat: 38.6434, lng: 34.8303 }, // Launch site
        key: 'launchSite'
      },
      {
        location: { lat: 38.6434, lng: 34.8303 }, // Flight path
        key: 'flightPath'
      },
      {
        location: { lat: 38.6434, lng: 34.8303 },  // Landing site
        key: 'landingSite'
      }
    ],
    meeting_point: USA_MEETING_POINTS[3]
    // comments: [
    //   {
    //     id: `c6`
    //   }
    // ]
  },
  {
    id: `e7`,
    title: `Cappadocia Underground City & Fairy Chimneys`,
    overview: `Dive deep into the heart of Cappadocia with a guided tour of its ancient underground cities and iconic fairy chimneys. Learn about the historical significance of these unique landscapes.`,
    country: 'Turkey',
    city: 'Cappadocia',
    reviewed: 312,
    views: 1345,
    time: [
      '6:30',
      '10:30',
      '14:30',
      '18:30'
    ],
    rating: {
      overall: 4.8,
      location: 5,
      amenities: 4.3,
      food: 4.2,
      price: 4.7,
      rooms: 4.4,
      tour_operator: 4.9
    },
    type: [
      'Cultural Tours',
      'Adventure Tours'
    ],
    price: {
      adult: 180.00,
      youth: 120.00,
      children: 90.00
    },
    price_for_extra: {
      service_per_booking: 25,
      service_per_person: 10,
      adult: 20,
      youth: 10
    },
    tag: [
      'new',
      'popular',
      'price:100-200',
      'duration:7-14'
    ],
    booked: 725,
    images: [
      tourCard7
    ],
    duration: [
      '10 days'
    ],
    group_size: 15,
    ages: [
      '14-99'
    ],
    languages: [
      'English',
      'Turkish'
    ],
    tour_highlights: [
      'Explore the ancient underground cities of Cappadocia',
      'Marvel at the natural beauty of the fairy chimneys',
      'Learn about the historical and cultural significance of the sites',
      'Enjoy a traditional Turkish lunch in a local restaurant'
    ],
    what_included: {
      'green': [
        'Guided tour of underground cities and fairy chimneys',
        'Professional guide',
        'Lunch',
        'Entrance fees to all sites'
      ],
      'orange': [
        'Hotel pickup and drop-off',
        'Gratuities',
        'Personal expenses'
      ]
    },
    itinerary: [
      {
        title: 'Day 1: Departure from Göreme',
        description: `Meet your guide in Göreme and depart for the Derinkuyu Underground City`
      },
      {
        title: 'Day 2: Pasabag Monks Valley',
        description: `Visit the Pasabag Monks Valley and see the unique fairy chimneys`
      },
      {
        title: 'Day 3: Avanos',
        description: `Explore the town of Avanos and learn about its pottery traditions`
      }
    ],
    tour_map: [
      {
        location: { lat: 38.6434, lng: 34.8303 }, // Göreme
        key: 'goreme'
      },
      {
        location: { lat: 38.6270, lng: 34.7129 }, // Derinkuyu Underground City
        key: 'derinkuyuUndergroundCity'
      },
      {
        location: { lat: 38.6419, lng: 34.8444 }, // Pasabag Monks Valley
        key: 'pasabagMonksValley'
      },
      {
        location: { lat: 38.7191, lng: 34.8486 }, // Avanos
        key: 'avanos'
      }
    ],
    meeting_point: USA_MEETING_POINTS[6]
    // comments: [
    //   {
    //     id: `c7`
    //   }
    // ]
  },
  {
    id: `e8`,
    title: `Paris Louvre and Seine River Combo Tour`,
    overview: `Experience the best of Paris with a combined tour of the iconic Louvre Museum and a relaxing cruise on the Seine River. See world-famous art and enjoy stunning views of Parisian landmarks.`,
    country: 'France',
    city: 'Paris',
    reviewed: 198,
    views: 1025,
    time: [
      '9:30',
      '13:30',
      '17:30'
    ],
    rating: {
      overall: 4.7,
      location: 5,
      amenities: 4.5,
      food: 4.3,
      price: 4.6,
      rooms: 4.5,
      tour_operator: 4.8
    },
    type: [
      'Cultural Tours',
      'City Tours',
      'Cruises Tours'
    ],
    price: {
      adult: 210.00,
      youth: 160.00,
      children: 100.00
    },
    price_for_extra: {
      service_per_booking: 20,
      service_per_person: 10,
      adult: 15,
      youth: 10
    },
    tag: [
      'new',
      'exclusive',
      'price:200-300',
      'duration:7-14'
    ],
    booked: 530,
    images: [
      tourCard8
    ],
    duration: [
      '8 days'
    ],
    group_size: 25,
    ages: [
      '6-99'
    ],
    languages: [
      'English',
      'French',
      'Spanish'
    ],
    tour_highlights: [
      'Skip-the-line access to the Louvre Museum',
      'Guided tour of the museum’s key masterpieces',
      'Scenic cruise on the Seine River with panoramic views',
      'Pass by iconic landmarks like the Eiffel Tower and Notre Dame'
    ],
    what_included: {
      'green': [
        'Louvre Museum entrance ticket',
        'Seine River cruise ticket',
        'Professional guide',
        'Headsets to hear the guide clearly'
      ],
      'orange': [
        'Hotel pickup and drop-off',
        'Meals and drinks',
        'Gratuities'
      ]
    },
    itinerary: [
      {
        title: 'Day 1: Louvre Museum Tour',
        description: `Meet at the Louvre Museum for a guided tour of its key masterpieces, including the Mona Lisa and the Venus de Milo`
      },
      {
        title: 'Day 2: Seine River Cruise',
        description: `Board the boat at the Seine River and enjoy a scenic cruise with live commentary, passing by iconic landmarks like the Eiffel Tower and Notre Dame`
      },
      {
        title: 'Day 3: Departure',
        description: `Check out of your hotel and depart for the airport for your return flight`
      }
    ],
    tour_map: [
      {
        location: { lat: 48.8602, lng: 2.3508 }, // Central Paris
        key: 'centralParis'
      },
      {
        location: { lat: 48.8606, lng: 2.3376 }, // Louvre Museum
        key: 'louvreMuseum'
      },
      {
        location: { lat: 48.8575, lng: 2.3408 }, // Pont Neuf
        key: 'pontNeuf'
      },
      {
        location: { lat: 48.8584, lng: 2.2945 },  // Eiffel Tower
        key: 'eiffelTower'
      }
    ],
    meeting_point: USA_MEETING_POINTS[7]
    // comments: [
    //   {
    //     id: `c8`
    //   }
    // ]
  },
  {
    id: `e9`,
    title: `London Eye & Thames River Sightseeing Cruise`,
    overview: `Experience breathtaking views of London from the iconic London Eye followed by a scenic cruise on the Thames River, showcasing the city's historical sites and modern architecture.`,
    country: 'United Kingdom',
    city: 'London',
    reviewed: 289,
    views: 1150,
    time: [
      '9:30',
      '13:30',
      '17:30'
    ],
    rating: {
      overall: 4.8,
      location: 5,
      amenities: 4.4,
      food: 4.3,
      price: 4.5,
      rooms: 4.6,
      tour_operator: 4.9
    },
    type: [
      'City Tours',
      'Cruises Tours'
    ],
    price: {
      adult: 120.00,
      youth: 90.00,
      children: 60.00
    },
    price_for_extra: {
      service_per_booking: 10,
      service_per_person: 5,
      adult: 10,
      youth: 5
    },
    tag: [
      `popular`,
      'featured',
      'price:100-300',
      'duration:3-7'
    ],
    booked: 650,
    images: [
      tourCard10
    ],
    duration: [
      '4 days'
    ],
    group_size: 30,
    ages: [
      '12-99'
    ],
    languages: [
      'English'
    ],
    tour_highlights: [
      'Panoramic views of London from the London Eye',
      'Scenic Thames River cruise past iconic landmarks',
      'Live commentary providing insights into London’s rich history',
      'Opportunities for stunning photographs at every turn'
    ],
    what_included: {
      'green': [
        'Fast-track entry to the London Eye',
        'Thames River cruise ticket',
        'Live commentary on the cruise',
        'Access to the London Eye 4D cinema experience'
      ],
      'orange': [
        'Hotel pickup and drop-off',
        'Meals and drinks',
        'Gratuities'
      ]
    },
    itinerary: [
      {
        title: 'Day 1: London Eye Experience',
        description: `Start your London adventure with a visit to the London Eye, including the 4D cinema experience`
      },
      {
        title: 'Day 2: Thames River Cruise',
        description: `Board the Thames River cruise at the London Eye Pier and enjoy a scenic journey with live commentary`
      },
      {
        title: 'Day 3: Tower Bridge',
        description: `End your cruise at Tower Bridge, where you can explore the area and take in the sights`
      }
    ],
    tour_map: [
      {
        location: { lat: 51.5033, lng: -0.1195 }, // London Eye
        key: 'londonEye'
      },
      {
        location: { lat: 51.5044, lng: -0.0769 }, // Tower Bridge
        key: 'towerBridge'
      }
    ],
    meeting_point: USA_MEETING_POINTS[4]
    // comments: [
    //   {
    //     id: `c9`
    //   }
    // ]
  }

];