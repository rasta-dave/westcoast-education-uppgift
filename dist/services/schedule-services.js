import { get, patch } from '../utils/httpClient.js';
export class ScheduleService {
    constructor() {
        this.baseUrl = 'schedules';
    }
    async getSchedulesByCourseId(courseId) {
        try {
            const schedules = await get(`${this.baseUrl}?courseId=${courseId}`);
            return schedules;
        }
        catch (error) {
            console.error('Error fetching schedules:', error);
            throw new Error('Failed to fetch schedules');
        }
    }
    async checkAvailability(scheduleId) {
        try {
            const schedule = await get(`${this.baseUrl}/${scheduleId}`);
            return schedule.availableSeats > 0;
        }
        catch (error) {
            console.log(`Error checking availability for schedule ${scheduleId}:`, error);
            throw new Error('Failed to check schedule availability');
        }
    }
    async updateAvailableSeats(scheduleId, newSeatsCount) {
        try {
            await patch(`${this.baseUrl}/${scheduleId}`, {
                availableSeats: newSeatsCount,
            });
        }
        catch (error) {
            console.error('Error updating available seats:', error);
            throw new Error('Failed to update available seats');
        }
    }
}
