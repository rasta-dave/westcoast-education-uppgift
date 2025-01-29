import { ICourse } from '../models/ICourses.js';
import { get } from '../utils/httpClient.js';

export class CourseService {
  private readonly baseUrl = 'courses';

  async getAllCourses(): Promise<ICourse[]> {
    try {
      const courses = await get(this.baseUrl);
      return courses;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }

  async getCourseById(id: string): Promise<ICourse> {
    try {
      const course = await get(`${this.baseUrl}/${id}`);
      if (!course) {
        throw new Error('Course not found');
      }
      return course;
    } catch (error) {
      console.log(`Error fetching course with id ${id}:`, error);
      throw error;
    }
  }
}
