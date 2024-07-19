export type MeetingPointType = {
  id: string;
  title: string;
  location: { lat: number; lng: number };
  city: string;
  state: string;
  country: string;
};


export const USA_MEETING_POINTS: MeetingPointType[] = [
  {
    id: 'mp1',
    title: 'Statue of Liberty National Monument',
    location: { lat: 40.6892, lng: -74.0445 },
    city: 'New York',
    state: 'NY',
    country: 'USA'
  },
  {
    id: 'mp2',
    title: 'Golden Gate Bridge',
    location: { lat: 37.8199, lng: -122.4783 },
    city: 'San Francisco',
    state: 'CA',
    country: 'USA'
  },
  {
    id: 'mp3',
    title: 'The White House',
    location: { lat: 38.8977, lng: -77.0365 },
    city: 'Washington D.C.',
    state: 'DC',
    country: 'USA'
  },
  {
    id: 'mp4',
    title: 'Grand Canyon National Park',
    location: { lat: 36.1069, lng: -112.1129 },
    city: 'Grand Canyon',
    state: 'AZ',
    country: 'USA'
  },
  {
    id: 'mp5',
    title: 'Walt Disney World Resort',
    location: { lat: 28.3852, lng: -81.5639 },
    city: 'Orlando',
    state: 'FL',
    country: 'USA'
  },
  {
    id: 'mp6',
    title: 'Las Vegas Strip',
    location: { lat: 36.1147, lng: -115.1728 },
    city: 'Las Vegas',
    state: 'NV',
    country: 'USA'
  },
  {
    id: 'mp7',
    title: 'Mount Rushmore National Memorial',
    location: { lat: 43.8791, lng: -103.4591 },
    city: 'Keystone',
    state: 'SD',
    country: 'USA'
  },
  {
    id: 'mp8',
    title: 'Space Needle',
    location: { lat: 47.6205, lng: -122.3493 },
    city: 'Seattle',
    state: 'WA',
    country: 'USA'
  }
];