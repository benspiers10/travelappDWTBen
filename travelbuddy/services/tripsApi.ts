import axios from 'axios';
import { Trip } from '@/types/trip';

// Replace this with your computer's local IP address when testing on a real phone.
const BASE_URL = 'http://192.168.0.26:4000';

export async function sendTripToServer(trip: Trip) {
  const response = await axios.post(`${BASE_URL}/trips`, trip);
  return response.data;
}