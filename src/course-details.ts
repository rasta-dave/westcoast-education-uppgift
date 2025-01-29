import { ICourse } from './models/ICourses.js';
import { get, post } from './utils/httpClient.js';
import { displayError, displayMessage } from './utils/dom.js';

const courseDetailsContainer = document.querySelector('#course-details');
const bookingFormContainer = document.querySelector('#booking-form');

const displayCourseDetails = (course: ICourse) => {
  const detailsHtml = `
    <div class="course-details">
        <h1>${course.title}</h1>
        <div class="course-info">
            <p class="course-number">Kursnummer: ${course.courseNumber}</p>
            <p class="course-length">Längd: ${course.length} dagar</p>
            <p class="course-price">Pris: ${course.price} kr</p>
            <div class="course-type">
                ${
                  course.isClassroom
                    ? '<span class="badge">Klassrum</span>'
                    : ''
                }
                ${course.isDistance ? '<span class="badge">Distans</span>' : ''}
            </div>
            <div class="course-description">
                <h2>Kursbeskrivning</h2>
                <p>${course.description}</p>
            </div>
            <button id="show-booking" class="btn btn-primary">Boka kurs</button>
        </div>
    `;

  courseDetailsContainer!.innerHTML = detailsHtml;

  // Lägger till eventlyssnare för bokningsknappen
  const bookingButton = document.querySelector('#show-booking');
  bookingButton?.addEventListener('click', () => {
    bookingFormContainer?.classList.remove('hidden');
  });
};

const initializeDetails = async () => {
  try {
    // Hämtar kurs-ID från URL:en ...
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    if (!courseId) {
      throw new Error('Inget kurs-ID specificerat');
    }

    // Hämtar kurs-detaljer från API:et ...
    const course = (await get(`courses/${courseId}`)) as ICourse;
    displayCourseDetails(course);
  } catch (error) {
    displayError('Kunde inte ladda kursdetaljer');
  }
};

const handleBooking = async (event: Event, courseId: string) => {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const bookingData = {
    courseId,
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
  };

  try {
    await post('bookings', bookingData);
    displayMessage(
      'Bokning mottagen! Vi återkommer med bekräftelse.',
      'success'
    );
    form.reset();

    // Använder bookingFormContainer här istället
    if (bookingFormContainer) {
      bookingFormContainer.classList.add('hidden');
    }
  } catch (error) {
    console.error('Fel vid bokning:', error);
    displayMessage(
      'Ett fel uppstod vid bokningen. Försök igen senare.',
      'error'
    );
  }
};

// Event listeners ...
document.addEventListener('DOMContentLoaded', initializeDetails);
const bookingForm = document.getElementById('book-course');
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('id');

if (bookingForm && courseId) {
  bookingForm.addEventListener('submit', (e) => handleBooking(e, courseId));
}
