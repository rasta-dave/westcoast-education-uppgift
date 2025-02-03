import { get, post } from '../utils/httpClient.js';
import { ScheduleService } from './schedule-services.js';
export class BookingService {
    constructor() {
        this.baseUrl = 'bookings';
        this.scheduleService = new ScheduleService();
    }
    // Skapar en bokning och skickar den till servern ...
    async createBooking(bookingData) {
        try {
            // Hämta aktuellt schema för att kolla tillgängliga platser
            const schedule = await get(`schedules/${bookingData.scheduleId}`);
            if (schedule.availableSeats <= 0) {
                throw new Error('No available seats for this course schedule');
            }
            // Skapa bokningen
            const booking = await post(this.baseUrl, bookingData);
            // Uppdatera antalet tillgängliga platser
            await this.scheduleService.updateAvailableSeats(bookingData.scheduleId, schedule.availableSeats - 1);
            return booking;
        }
        catch (error) {
            console.error('Error creating booking:', error);
            throw new Error('Failed to create booking');
        }
    }
    // Hämtar alla bokningar för en specifik kurs ...
    async getBookingsByCourseId(courseId) {
        try {
            const bookings = await get(`${this.baseUrl}?courseId=${courseId}`);
            return bookings;
        }
        catch (error) {
            console.error('Error fetching bookings:', error);
            throw new Error('Failed to fetch bookings');
        }
    }
    // Privat hjälpmetod för att kontrollera om en kurs är tillgänglig ...
    async checkCourseAvailability(courseId) {
        try {
            const bookings = await this.getBookingsByCourseId(courseId);
            return bookings.length < 20;
        }
        catch (error) {
            console.error('Error checking course availability:', error);
            throw new Error('Failed to check course availability');
        }
    }
}
