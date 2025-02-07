import { get, post } from '../utils/httpClient.js';
export class CourseService {
    constructor() {
        this.baseUrl = 'courses';
        this.defaultImageUrl = 'src/assets/images/coding.jpg';
    }
    async getAllCourses() {
        try {
            const courses = await get(this.baseUrl);
            return courses;
        }
        catch (error) {
            console.error('Error fetching courses:', error);
            throw error;
        }
    }
    async getCourseById(id) {
        try {
            const course = await get(`${this.baseUrl}/${id}`);
            if (!course) {
                throw new Error('Course not found');
            }
            return course;
        }
        catch (error) {
            console.log(`Error fetching course with id ${id}:`, error);
            throw error;
        }
    }
    async createCourse(courseData) {
        try {
            const newCourse = await post(this.baseUrl, {
                ...courseData,
                imageUrl: courseData.imageUrl || this.defaultImageUrl,
            });
            // Create default schedule for the new course
            const defaultSchedule = {
                courseId: newCourse.id,
                startDate: courseData.startDate,
                endDate: this.calculateEndDate(courseData.startDate, courseData.length),
                type: courseData.isDistance ? 'distance' : 'classroom',
                availableSeats: 25,
                location: courseData.isClassroom ? 'Göteborg' : undefined,
            };
            await post('schedules', defaultSchedule);
            return newCourse;
        }
        catch (error) {
            console.error('Error creating course:', error);
            throw error;
        }
    }
    calculateEndDate(startDate, lengthInDays) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + lengthInDays);
        return date.toISOString().split('T')[0];
    }
}
