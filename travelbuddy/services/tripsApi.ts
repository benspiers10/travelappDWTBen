import { Trip } from '@/types/trip';
import axios from 'axios';

const BASE_URL = 'http://192.168.0.26:4000';

export async function sendTripToServer(trip: Trip) {
  const response = await axios.post(`${BASE_URL}/trips`, trip);
  return response.data;
}