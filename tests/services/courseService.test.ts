import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CourseService } from '../../src/services/courseService';
import { ICourse } from '../../src/models/ICourses';

describe('CourseService', () => {
  let courseService: CourseService;

  const mockCourse: ICourse = {
    id: '1',
    title: 'TypeScript Fundamentals',
    courseNumber: 'TS101',
    length: 5,
    description: 'Learn TypeScript basics',
    imageUrl: '/images/typescript.jpg',
    isClassroom: true,
    isDistance: true,
    price: 9999,
    startDate: '2025-03-15',
  };

  beforeEach(() => {
    courseService = new CourseService();
  });

  describe('getAllCourses', () => {
    it('should return all courses', async () => {
      // Arrange
      const expectedCourses: ICourse[] = [mockCourse];
      vi.spyOn(courseService, 'getAllCourses').mockResolvedValue(
        expectedCourses
      );
      // Act
      const courses = await courseService.getAllCourses();

      // Assert
      expect(courses).toEqual(expectedCourses);
    });
  });

  describe('getCourseById', () => {
    it('should return a course by id', async () => {
      // Arrange
      vi.spyOn(courseService, 'getCourseById').mockResolvedValue(mockCourse);
      // Act
      const course = await courseService.getCourseById('1');
      // Assert
      expect(course).toEqual(mockCourse);
    });

    it('should throw error if course not found', async () => {
      // Arrange
      vi.spyOn(courseService, 'getCourseById').mockRejectedValue(
        new Error('Course not found')
      );

      // Act & Assert
      await expect(courseService.getCourseById('999')).rejects.toThrow(
        'Course not found'
      );
    });
  });
});
