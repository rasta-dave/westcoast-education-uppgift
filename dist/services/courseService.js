import { get } from '../utils/httpClient';
export class CourseService {
    async getAllCourses() {
        try {
            const courses = await get('courses');
            return courses;
        }
        catch (error) {
            console.error('Error fetching courses:', error);
            throw error;
        }
    }
    async getCourseById(id) {
        try {
            const course = await get(`courses/${id}`);
            return course;
        }
        catch (error) {
            console.error(`Error fetching course with id ${id}:`, error);
            throw error;
        }
    }
}
