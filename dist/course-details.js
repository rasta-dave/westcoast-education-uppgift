import { displayError, displayMessage } from './utils/dom.js';
// Imlmentererar mina 3 services ...
// Service Layer Pattern ...
import { CourseService } from './services/course-services.js';
import { BookingService } from './services/booking-services.js';
import { ScheduleService } from './services/schedule-services.js';
const courseDetailsContainer = document.querySelector('#course-details');
const bookingFormContainer = document.querySelector('#booking-form');
const bookingForm = document.getElementById('book-course');
const courseService = new CourseService();
const bookingService = new BookingService();
const scheduleService = new ScheduleService();
const displayCourseDetails = async (course) => {
    try {
        // Fetcha schema för denna kurs ...
        const schedules = await scheduleService.getSchedulesByCourseId(course.id);
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

            <div class="course-schedule">
                <h2>Tillgängliga kurstillfällen</h2>
                <div class="schedule-list">
                  ${schedules
            .map((schedule) => `
                    <div class="schedule-item">
                      <p>Datum: ${new Date(schedule.startDate).toLocaleDateString()} - ${new Date(schedule.endDate).toLocaleDateString()}</p>
                    <p>Typ: ${schedule.type === 'classroom' ? 'Klassrum' : 'Distans'}</p>
                  ${schedule.location
            ? `<p>Plats: ${schedule.location}</p>`
            : ''}
                  <p>Lediga platser: ${schedule.availableSeats}</p>
            <button class="btn btn-primary book-btn" 
              data-schedule-id="${schedule.id}"
              ${schedule.availableSeats === 0 ? 'disabled' : ''}>
                  ${schedule.availableSeats === 0 ? 'Fullbokad' : 'Boka'}
            </button>
          </div>`)
            .join('')}
                </div>
              </div>
            </div>
          </div>
        `;
        if (courseDetailsContainer) {
            courseDetailsContainer.innerHTML = detailsHtml;
        }
        // ----------------------------------------------
        // Adding event listeners to booking buttons ...
        const bookButtons = document.querySelectorAll('.book-btn');
        bookButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const scheduleId = button.dataset.scheduleId;
                if (scheduleId) {
                    showBookingForm(course.id, scheduleId);
                }
            });
        });
    }
    catch (error) {
        console.error('Error displaying course details:', error);
        displayError('Kunde inte ladda kursdetaljer');
    }
};
const showBookingForm = (courseId, scheduleId) => {
    if (!bookingFormContainer)
        return;
    bookingFormContainer.classList.remove('hidden');
    const form = document.getElementById('book-course');
    if (form) {
        form.dataset.courseId = courseId;
        form.dataset.scheduleId = scheduleId;
    }
};
const handleBooking = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const courseId = form.dataset.courseId;
    const scheduleId = form.dataset.scheduleId;
    if (!courseId || !scheduleId) {
        displayError('Felaktig kurs - eller schemaläggningsinformation');
        return;
    }
    try {
        const bookingData = {
            courseId,
            scheduleId,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
        };
        await bookingService.createBooking(bookingData);
        displayMessage('Bokning mottagen! Vi återkommer med bekräftelse.', 'success');
        form.reset();
        bookingFormContainer?.classList.add('hidden');
        // Uppdatera sidan för att visa nya antalet tillgängliga platser
        const course = await courseService.getCourseById(courseId);
        await displayCourseDetails(course);
    }
    catch (error) {
        console.error('Error creating booking:', error);
        if (error instanceof Error) {
            displayMessage(error.message, 'error');
        }
        else {
            displayMessage('Ett fel uppstod vid bokningen. Försök igen senare.', 'error');
        }
    }
};
const initializeDetails = async () => {
    try {
        // Hämtar kurs-ID från URL:en ...
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('id');
        if (!courseId) {
            throw new Error('Inget kurs-ID specificerat');
        }
        const course = await courseService.getCourseById(courseId);
        await displayCourseDetails(course);
    }
    catch (error) {
        console.error('Error initializing course details:', error);
        displayError('Kunde inte ladda kursdetaljer');
    }
};
// Event listeners ...
document.addEventListener('DOMContentLoaded', initializeDetails);
if (bookingForm) {
    bookingForm.addEventListener('submit', handleBooking);
}
