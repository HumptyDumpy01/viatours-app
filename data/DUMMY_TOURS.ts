import tourCard1 from '@/assets/images/homepage/topTrending/tourCard_image_5.svg';
import tourCard2 from '@/assets/images/homepage/topTrending/tourCard_image_6.svg';
import tourCard6 from '../assets/images/homepage/topTrending/tourCard_image_6.svg';
import tourCard3 from '../assets/images/homepage/topTrending/tourCard_image_7.svg';
import tourCard7 from '../assets/images/homepage/topTrending/tourCard_image_7.svg';
import tourCard4 from '../assets/images/homepage/topTrending/tourCard_image_8.svg';
import tourCard8 from '../assets/images/homepage/topTrending/tourCard_image_8.svg';
import tourCard5 from '../assets/images/homepage/topTrending/tourCard_image_9.svg';
import tourCard10 from '../assets/images/homepage/topTrending/tourCard_image_10.svg';

// import tourCard9 from '@/assets/images/topTrending/tourCard_image_9.svg';

export interface TourInterface {
  id: string;
  title: string;
  overview: string;
  country: string;
  city: string;
  reviewed: number;
  views: number;
  rating: {
    overall: number;
    location: number;
    amenities: number;
    food: number;
    price: number;
    rooms: number;
    tour_operator: number;
  };
  type: string[];
  price: {
    adult: number;
    youth: number;
    children: number;
  };
  price_for_extra: {
    service_per_booking: number;
    service_per_person: number;
  };
  tag: string[];
  booked: number;
  images: string[];
  duration: string[];
  group_size: number;
  ages: string[];
  languages: string[];
  tour_highlights: string[];
  what_included: {
    green: string[];
    red: string[];
  };
  itinerary: {};
  tour_map: { lat: number; long: number }[];
  comments: { id: string }[];
}

export const DUMMY_TOURS: TourInterface[] = [
  {
    id: `e1`,
    title: `Eiffel Tower Tour`,
    overview: `The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.`,
    country: 'France',
    city: 'Paris',
    reviewed: 179,
    views: 999,
    //////////////////////////////////////
    rating: {
      // depending on the total number of reviews, assuming 5 is 100% we need to calculate the total rating
      // in this math way: total rating = (5 * 100) / reviewed
      overall: 4.33,
      location: 5,
      amenities: 5,
      food: 5,
      price: 5,
      rooms: 5,
      tour_operator: 5
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
      service_per_person: 20
    },
    //////////////////////////////////////
    tag: [
      // INFO: MANY OF THESE
      'new',
      // '5-off',
      // '20-off',
      // '60-off',
      // '90-off',
      'price:100-300',
      // 'price:300-700',
      // 'price:700-1299'
      'duration:1-3'
    ],
    //////////////////////////////////////
    booked: 1009,
    //////////////////////////////////////
    images: [
      // INFO: TO SEVEN IMAGES. MIN - 4
      tourCard1
    ],
    //////////////////////////////////////
    duration: [
      // INFO: ONE OF THESE
      '3 days'
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
      'red': [
        'Tips',
        'Towel',
        'Personal expenses',
        'Hotel transfer',
        'Alcoholic drinks'
        // INFO: AND SO ON....
      ]
    },
    //////////////////////////////////////
    itinerary: {
      day_1: 'Here is the first day itinerary',
      day_2: 'Here is the second day itinerary',
      day_3: 'Here is the third day itinerary',
      day_4: 'Here is the fourth day itinerary',
      day_5: 'Here is the fifth day itinerary',
      day_6: 'Here is the sixth day itinerary'
    },
    //////////////////////////////////////
    tour_map: [
      { lat: 48.8566, long: 2.3522 }, // Central Paris
      { lat: 48.8602, long: 2.3508 }, // Louvre Museum
      { lat: 48.8584, long: 2.2945 }, // Eiffel Tower
      { lat: 48.8738, long: 2.2950 }, // Arc de Triomphe
      { lat: 48.8606, long: 2.3376 }  // Musée d'Orsay
    ],
    //////////////////////////////////////
    comments: [
      // INFO: INJECT COMMENT SCHEMA
      {
        id: `c1`
      }
    ]
  },
  {
    id: `e2`,
    title: `Louvre Museum Discovery`,
    overview: `Explore the world-renowned Louvre Museum in Paris, home to thousands of classic and modern masterpieces. This tour offers an intimate look at the highlights of the museum, including the Mona Lisa and the Venus de Milo.`,
    country: 'Spain',
    city: 'Barcelona',
    reviewed: 215,
    views: 1500,
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
      service_per_person: 15
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
      'red': [
        'Hotel pickup and drop-off',
        'Food and drinks',
        'Gratuities'
      ]
    },
    itinerary: {
      day_1: 'Meet at the designated point and start the tour',
      day_2: 'Continue exploring the museum with your guide',
      day_3: 'Free time to explore the museum on your own'
    },
    tour_map: [
      { lat: 48.8606, long: 2.3376 }, // Louvre Museum
      { lat: 48.8566, long: 2.3522 }, // Central Paris
      { lat: 48.8602, long: 2.3508 }, // Eiffel Tower
      { lat: 48.8738, long: 2.2950 } // Arc de Triomphe
    ],
    comments: [
      {
        id: `c2`
      }
    ]
  },
  {
    id: `e3`,
    title: `Seine River Cruise`,
    overview: `Enjoy a scenic cruise on the Seine River in Paris. This tour offers breathtaking views of the city's most famous landmarks from the water, including the Eiffel Tower, Notre Dame, and the Louvre Museum.`,
    country: 'Italy',
    city: 'Roma',
    reviewed: 300,
    views: 2000,
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
      service_per_person: 50
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
      'red': [
        'Hotel pickup and drop-off',
        'Food and drinks',
        'Gratuities'
      ]
    },
    itinerary: {
      day_1: 'Board the cruise at the designated point',
      day_2: 'Enjoy the scenic views of Paris from the water',
      day_3: 'Learn about the city’s landmarks from the guide'
    },
    tour_map: [
      { lat: 48.8566, long: 2.3522 }, // Central Paris
      { lat: 48.8606, long: 2.3376 } // Seine River
    ],
    comments: [
      {
        id: `c3`
      }
    ]
  },
  {
    id: `e4`,
    title: `Kyiv Pechersk Lavra Tour`,
    overview: `Explore the historic Kyiv Pechersk Lavra, a UNESCO World Heritage Site. This tour offers an intimate look at the Orthodox Christian monastery's caves, churches, and museum collections.`,
    country: 'Ukraine',
    city: 'Kyiv',
    reviewed: 89,
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
      service_per_person: 5
    },
    tag: [
      'new',
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
      'red': [
        'Hotel pickup and drop-off',
        'Food and drinks',
        'Gratuities'
      ]
    },
    itinerary: {
      day_1: 'Meet at the Lavra\'s main entrance and start the guided tour',
      day_2: 'Continue exploring the Lavra\'s museums and churches',
      day_3: 'Free time to explore the monastery and surrounding area on your own'
    },
    tour_map: [
      { lat: 50.4345, long: 30.5592 }, // Kyiv Pechersk Lavra
      { lat: 50.4501, long: 30.5234 } // Central Kyiv
    ],
    comments: [
      {
        id: `c4`
      }
    ]
  },
  {
    id: `e5`,
    title: `Montmartre Walking Tour`,
    overview: `Discover the bohemian heart of Paris on a walking tour of Montmartre. Explore the winding streets, the bustling Place du Tertre, and the stunning Sacré-Cœur Basilica.`,
    country: 'France',
    city: 'Paris',
    reviewed: 142,
    views: 850,
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
      service_per_person: 40
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
      'red': [
        'Hotel pickup and drop-off',
        'Food and drinks',
        'Gratuities'
      ]
    },
    itinerary: {
      day_1: 'Meet at Blanche Metro Station and start the walking tour',
      day_2: 'Continue exploring Montmartre’s hidden gems',
      day_3: 'Conclude the tour at the Sacré-Cœur Basilica with free time to explore'
    },
    tour_map: [
      { lat: 48.8867, long: 2.3431 }, // Montmartre
      { lat: 48.8869, long: 2.3372 } // Sacré-Cœur Basilica
    ],
    comments: [
      {
        id: `c5`
      }
    ]
  },
  {
    id: `e6`,
    title: `Cappadocia Hot Air Balloon Experience`,
    overview: `Embark on an unforgettable adventure with a hot air balloon ride over the magical landscapes of Cappadocia. Witness the sunrise over the unique rock formations and fairy chimneys from the sky.`,
    country: 'Turkey',
    city: 'Cappadocia',
    reviewed: 256,
    views: 1200,
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
      service_per_person: 15
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
      'red': [
        'Gratuities',
        'Personal expenses',
        'Breakfast'
      ]
    },
    itinerary: {
      day_1: 'Early morning pickup from your hotel and transfer to the launch site',
      day_2: 'Safety briefing and balloon inflation',
      day_3: 'Hot air balloon flight at sunrise',
      day_4: 'Champagne toast and certificate presentation',
      day_5: 'Transfer back to hotel'
    },
    tour_map: [
      { lat: 38.6436, long: 34.8286 } // Cappadocia
    ],
    comments: [
      {
        id: `c6`
      }
    ]
  },
  {
    id: `e7`,
    title: `Cappadocia Underground City & Fairy Chimneys`,
    overview: `Dive deep into the heart of Cappadocia with a guided tour of its ancient underground cities and iconic fairy chimneys. Learn about the historical significance of these unique landscapes.`,
    country: 'Turkey',
    city: 'Cappadocia',
    reviewed: 312,
    views: 1345,
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
      service_per_person: 10
    },
    tag: [
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
      'red': [
        'Hotel pickup and drop-off',
        'Gratuities',
        'Personal expenses'
      ]
    },
    itinerary: {
      day_1: 'Departure from Göreme and visit to Derinkuyu Underground City',
      day_2: 'Visit to the fairy chimneys in Pasabag and Monks Valley',
      day_3: 'Lunch in Avanos and visit to pottery workshops',
      day_4: 'Return to Göreme and end of the tour'
    },
    tour_map: [
      { lat: 38.6270, long: 34.7129 }, // Derinkuyu Underground City
      { lat: 38.6419, long: 34.8444 }, // Pasabag Monks Valley
      { lat: 38.7191, long: 34.8486 }  // Avanos
    ],
    comments: [
      {
        id: `c7`
      }
    ]
  },
  {
    id: `e8`,
    title: `Paris Louvre and Seine River Combo Tour`,
    overview: `Experience the best of Paris with a combined tour of the iconic Louvre Museum and a relaxing cruise on the Seine River. See world-famous art and enjoy stunning views of Parisian landmarks.`,
    country: 'France',
    city: 'Paris',
    reviewed: 198,
    views: 1025,
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
      service_per_person: 10
    },
    tag: [
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
      'red': [
        'Hotel pickup and drop-off',
        'Meals and drinks',
        'Gratuities'
      ]
    },
    itinerary: {
      day_1: 'Meet at the Louvre Museum for a guided tour',
      day_2: 'Board the cruise at Pont Neuf and enjoy a scenic ride on the Seine River',
      day_3: 'Tour concludes at the Eiffel Tower, with free time to explore'
    },
    tour_map: [
      { lat: 48.8606, long: 2.3376 }, // Louvre Museum
      { lat: 48.8575, long: 2.3408 }, // Pont Neuf
      { lat: 48.8584, long: 2.2945 }  // Eiffel Tower
    ],
    comments: [
      {
        id: `c8`
      }
    ]
  },
  {
    id: `e9`,
    title: `London Eye & Thames River Sightseeing Cruise`,
    overview: `Experience breathtaking views of London from the iconic London Eye followed by a scenic cruise on the Thames River, showcasing the city's historical sites and modern architecture.`,
    country: 'United Kingdom',
    city: 'London',
    reviewed: 289,
    views: 1150,
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
      service_per_person: 5
    },
    tag: [
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
      'All ages'
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
      'red': [
        'Hotel pickup and drop-off',
        'Meals and drinks',
        'Gratuities'
      ]
    },
    itinerary: {
      day_1: 'Start with the London Eye experience, including the 4D cinema',
      day_2: 'Board the Thames River cruise at the London Eye Pier',
      day_3: 'Enjoy the cruise with live commentary, ending at Tower Bridge'
    },
    tour_map: [
      { lat: 51.5033, long: -0.1195 }, // London Eye
      { lat: 51.5044, long: -0.0769 }  // Tower Bridge
    ],
    comments: [
      {
        id: `c9`
      }
    ]
  }

];