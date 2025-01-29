import { get } from './utils/httpClient.js';
import { displayError, displayMessage } from './utils/dom.js';
const courseDetailsContainer = document.querySelector('#course-details');
const bookingForm = document.querySelector('#booking-form');
const displayCourseDetails = (course) => {
    const detailsHtml = `
    <div class="course-details">
        <h1>${course.title}</h1>
        <div class="course-info">
            <p class="course-number">Kursnummer: ${course.courseNumber}</p>
            <p class="course-length">Längd: ${course.length} dagar</p>
            <p class="course-price">Pris: ${course.price} kr</p>
            <div class="course-type">
                ${course.isClassroom
        ? '<span class="badge">Klassrum</span>'
        : ''}
                ${course.isDistance ? '<span class="badge">Distans</span>' : ''}
            </div>
            <div class="course-description">
                <h2>Kursbeskrivning</h2>
                <p>${course.description}</p>
            </div>
            <button id="show-booking" class="btn btn-primary">Boka kurs</button>
        </div>
    `;
    courseDetailsContainer.innerHTML = detailsHtml;
    // Lägger till eventlyssnare för bokningsknappen
    const bookingButton = document.querySelector('#show-booking');
    bookingButton?.addEventListener('click', () => {
        bookingForm?.classList.remove('hidden');
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
        const course = (await get(`courses/${courseId}`));
        displayCourseDetails(course);
    }
    catch (error) {
        displayError('Kunde inte ladda kursdetaljer');
    }
};
// Hantera bokningsformuläret ...
const handleBooking = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    try {
        // Senare implementera bokning via API:et ...
        displayMessage('Bokning mottagen! Vi återkommer med bekräftelse.', 'success');
        form.reset();
        bookingForm?.classList.add('hidden');
    }
    catch (error) {
        displayError('Kunde inte genomföra bokningen. Försök igen senare.');
    }
};
// Event listeners ...
document.addEventListener('DOMContentLoaded', initializeDetails);
document
    .querySelector('#book-course')
    ?.addEventListener('submit', handleBooking);
