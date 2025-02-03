import { BookingService } from './services/booking-services.js';
import { CourseService } from './services/course-services.js'; // För att kommunicera med servern ...
import { displayMessage, displayError } from './utils/dom.js';
const courseService = new CourseService();
const courseForm = document.getElementById('course-form');
const adminCourseList = document.getElementById('admin-course-list');
const bookingService = new BookingService();
const courseSelect = document.getElementById('course-select');
const courseBookings = document.getElementById('course-bookings');
const initializeAdmin = async () => {
    loadCourses();
    setupEventListeners();
};
const loadCourses = async () => {
    try {
        const courses = await courseService.getAllCourses();
        displayAdminCourses(courses);
        updateCourseSelect(courses);
    }
    catch (error) {
        console.error('Error loading courses:', error);
        displayError('Kunde inte ladda kurser. Vänligen försök igen senare.');
    }
};
const displayAdminCourses = (courses) => {
    if (!adminCourseList) {
        console.error('Admin course list element not found');
        return;
    }
    /*html*/
    adminCourseList.innerHTML = courses
        .map((course) => `
        <div class="admin-course-card">
            <h3>${course.title}</h3>
            <p>Kursnummer: ${course.courseNumber}</p>
            <p>Kurslängd: ${course.length}</p>
            <p>Pris: ${course.price}</p>
            <p>Start: ${new Date(course.startDate).toLocaleDateString()}</p>
            <div class="course-type">
                ${course.isClassroom
        ? '<span class="badge">Klassrum</span>'
        : ''}
                ${course.isDistance ? '<span class="badge">Distans</span>' : ''}
            </div>
            <button class="btn" onclick="editCourse('${course.id}')">Redigera</button>
        </div>
        `)
        .join('');
};
const setupEventListeners = () => {
    courseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleCourseSubmit(e);
    });
    if (adminCourseList) {
        adminCourseList.addEventListener('click', (e) => { });
    }
    if (courseSelect) {
        courseSelect.addEventListener('change', async (e) => {
            const courseId = e.target.value;
            if (courseId) {
                await loadBookingsForCourse(courseId);
            }
        });
    }
};
const updateCourseSelect = (courses) => {
    if (!courseSelect)
        return;
    courseSelect.innerHTML = `
        <option value="">Välj en kurs ...</option>
        ${courses
        .map((course) => `
            <option value="${course.id}">${course.title} (${course.courseNumber})</option>
        `)
        .join('')}
    `;
};
const loadBookingsForCourse = async (courseId) => {
    if (!courseBookings)
        return;
    try {
        const bookings = await bookingService.getBookingsByCourseId(courseId);
        displayBookings(bookings);
    }
    catch (error) {
        console.error('Error loading bookings:', error);
        displayError('Kunde inte ladda bokningar. Vänligen försök igen senare.');
    }
};
const displayBookings = (bookings) => {
    if (!courseBookings)
        return;
    if (bookings.length === 0) {
        courseBookings.innerHTML = '<p>Inga bokingar för denna kurs.</p>';
        return;
    }
    courseBookings.innerHTML = `
  <div class="bookings-list">
    <table>
        <thead>
            <tr>
                <th>Namn</th>
                <th>Email</th>
                <th>Telefon</th>
            </tr>
        </thead>
        <tbody>
            ${bookings
        .map((booking) => `
                <tr>
                    <td>${booking.name}</td>
                    <td>${booking.email}</td>
                    <td>${booking.phone}</td>
                </tr>
                `)
        .join('')}
        </tbody>
    </table>
  </div>
  `;
};
const handleCourseSubmit = async (event) => {
    const form = event.target;
    const formData = new FormData(form);
    const courseData = {
        title: formData.get('title'),
        courseNumber: formData.get('courseNumber'),
        length: Number(formData.get('length')),
        description: formData.get('description'),
        price: Number(formData.get('price')),
        startDate: formData.get('startDate'),
        imageUrl: 'default.jpg',
        isClassroom: formData.get('isClassroom') === 'on',
        isDistance: formData.get('isDistance') === 'on',
    };
    try {
        await courseService.createCourse(courseData);
        displayMessage('Kurs skapad!', 'success');
        form.reset();
        await loadCourses();
    }
    catch (error) {
        console.error('Error creating course:', error);
        displayError('Kunde inte skapa kurs. Vänligen försök igen senare.');
    }
};
document.addEventListener('DOMContentLoaded', initializeAdmin);
