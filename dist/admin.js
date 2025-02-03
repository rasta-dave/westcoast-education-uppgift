import { CourseService } from './services/course-services.js'; // För att kommunicera med servern ...
import { displayMessage, displayError } from './utils/dom.js';
const courseService = new CourseService();
const courseForm = document.getElementById('course-form');
const adminCourseList = document.getElementById('admin-course-list');
const initializeAdmin = async () => {
    loadCourses();
    setupEventListeners();
};
const loadCourses = async () => {
    try {
        const courses = await courseService.getAllCourses();
        displayAdminCourses(courses);
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
