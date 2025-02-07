import { ICourse } from './models/ICourses.js';
import { get } from './utils/httpClient.js';
import {
  displayCourseList,
  displayLoading,
  displayError,
  clearCourseList,
  createCourseElement,
} from './utils/dom.js';

const initializeApp = async () => {
  try {
    // Visa laddningsindikatorn ...
    displayLoading();

    // Hämta kurser från API:et ...
    const courses = (await get('courses')) as ICourse[];

    // Rensa laddningsindikatorn ...
    clearCourseList();

    // Visa alla kurser..
    courses.forEach((course) => {
      const courseElement = createCourseElement(course);
      displayCourseList(courseElement);
    });
  } catch (error) {
    console.error(error);
    displayError('Kunde inte hämta kurser från API:et');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});
