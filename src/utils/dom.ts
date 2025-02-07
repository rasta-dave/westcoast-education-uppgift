// Funktioner som Hanterar all interaktion med webbsidans DOM
import { ICourse } from '../models/ICourses.js';

export const courseList = document.querySelector('#course-list');

// Funktion för att lägga till ett element i kurslistan ...
export const displayCourseList = (courseElement: HTMLDivElement): void => {
  courseList?.appendChild(courseElement);
};

// Funktion för att skapa ett kurskort ...
export const createCourseElement = (course: ICourse): HTMLDivElement => {
  // Skapa ett nytt div-element
  const div = document.createElement('div');
  div.className = 'course-card';

  // Lägger till bilder i kurskortet ...
  const getImagePath = (course: ICourse): string => {
    if (course.title.toLowerCase().includes('javascript')) {
      return '../assets/images/javascript.jpg';
    } else if (course.title.toLowerCase().includes('typescript')) {
      return '../assets/images/typescript.jpg';
    }
    return '../assets/images/coding.jpg';
  };

  // Skapar HTML-innehållet för kurskortet ...
  /*html*/
  const courseHtml = `

  <div class="course-image">
    <img src="${getImagePath(course)}" alt="${course.title}" /> 
  </div>
  <div class="course-content">
    <h3>${course.title}</h3>
    <p>Kursnummer: ${course.courseNumber}</p>
    <p>Längd: ${course.length} dagar</p>
    <p>Pris: ${course.price} kr</p>
    <div class="course-type">
        ${course.isClassroom ? '<span class="badge">Klassrum</span>' : ''}
        ${course.isDistance ? '<span class="badge">Distans</span>' : ''}
    </div>
    <button class="btn" data-course-id="${course.id}">Visa mer</button>
  </div>
  `;

  // Sätt innehållet i div-elementet
  div.innerHTML = courseHtml;

  // Fix: Select the correct button and add event listener
  const detailsButton = div.querySelector(
    `button[data-course-id="${course.id}"]`
  );
  detailsButton?.addEventListener('click', () => {
    console.log('Klickade på Visa mer för kurs:', course.id);
    // Fix: Correct the path to course-details.html
    window.location.href = `/src/pages/course-details.html?id=${course.id}`;
  });
  return div;
};

// ================================
// Ytterliggare Användbara hjälpfunktioner ...

// Visa laddningsindikator ...
export const displayLoading = (): void => {
  if (courseList) {
    courseList.innerHTML = '<div class="loading">Laddar kurser...</div>';
  }
};

// Visa felmeddelande
export const displayError = (message: string): void => {
  if (courseList) {
    courseList.innerHTML = `<div class="error">${message}</div>`;
  }
};

// Rena innehållet i kurslistan ...
export const clearCourseList = (): void => {
  if (courseList) {
    courseList.innerHTML = '';
  }
};

// Visa ett tillfälligt meddelande ...
export const displayMessage = (
  message: string,
  type: 'success' | 'error'
): void => {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.innerHTML = message;

  document.body.appendChild(messageDiv);

  // Ta bort meddelandet efter 3 sekunder ...
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
};
