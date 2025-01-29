import { get } from '../utils/httpClient.js';
export class CourseService {
    constructor() {
        this.baseUrl = 'courses';
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
}
