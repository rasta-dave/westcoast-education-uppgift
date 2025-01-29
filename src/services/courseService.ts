import { ICourse } from '../models/ICourses';
import { get } from '../utils/httpClient';

export class CourseService {
  async getAllCourses(): Promise<ICourse[]> {
    try {
      const courses = await get('courses');
      return courses as ICourse[];
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }

  async getCourseById(id: string): Promise<ICourse> {
    try {
      const course = await get(`courses/${id}`);
      return course as ICourse;
    } catch (error) {
      console.error(`Error fetching course with id ${id}:`, error);
      throw error;
    }
  }
}
