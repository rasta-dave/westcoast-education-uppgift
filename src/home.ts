import { CourseService } from './services/course-services.js';
import { ICourse } from './models/ICourses.js';

const courseService = new CourseService();

const displayFeaturedCourses = async () => {
  try {
    const courseList = document.getElementById('course-list');
    if (!courseList) return;

    const courses = await courseService.getAllCourses();
    // Display only the first 3 courses on the home page
    const featuredCourses = courses.slice(0, 3);

    courseList.innerHTML = featuredCourses
      .map(
        (course: ICourse) => `
        <div class="course-card">
          <div class="course-image">
            <img src="${course.imageUrl}" alt="${course.title}">
          </div>
          <div class="course-content">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <p>Längd: ${course.length} dagar</p>
            <p>Pris: ${course.price} kr</p>
            <a href="/src/pages/course-details.html?id=${course.id}" class="btn">Läs mer</a>
          </div>
        </div>
      `
      )
      .join('');
  } catch (error) {
    console.error('Error loading featured courses:', error);
  }
};

document.addEventListener('DOMContentLoaded', displayFeaturedCourses);
