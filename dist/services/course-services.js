import { get, post } from '../utils/httpClient.js';
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
    async createCourse(courseData) {
        try {
            const newCourse = await post(this.baseUrl, courseData);
            return newCourse;
        }
        catch (error) {
            console.error('Error creating course:', error);
            throw error;
        }
    }
}
