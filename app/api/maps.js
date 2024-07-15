// pages/api/maps.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { lat, lng } = req.query;

  const googleMapsAPIURL = `https://maps.googleapis.com/maps/api/someEndpoint?lat=${lat}&lng=${lng}&key=${process.env.GOOGLE_MAP_API_KEY}`;

  try {
    const response = await fetch(googleMapsAPIURL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch data from Google Maps API', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Maps API' });
  }
}