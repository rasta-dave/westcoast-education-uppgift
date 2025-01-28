// Funktioner som Hanterar all interaktion med webbsidans DOM

export const courseList = document.querySelector('#course-list');

// Funktion för att lägga till ett element i kurslistan ...
export const displayCourseList = (courseElement: HTMLDivElement): void => {
  courseList?.appendChild(courseElement);
};

// Funktion för att skapa ett kurskort ...
export const createCourseElement = (course: any): HTMLDivElement => {
  // Skapa ett nytt div-element
  const div = document.createElement('div');

  // Lägga till CSS-klassen 'course-card
  div.className = 'course-card';

  // Skapar HTML-innehållet för kurskortet ...
  const courseHtml = `
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
  messageDiv.textContent = message;

  document.body.appendChild(messageDiv);

  // Ta bort meddelandet efter 3 sekunder ...
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
};
