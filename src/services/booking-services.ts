import { get, post } from '../utils/httpClient.js';

interface IBooking {
  id?: string;
  courseId: string;
  name: string;
  email: string;
  phone: string;
}

export class BookingService {}
