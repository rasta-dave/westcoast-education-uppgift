import { get } from './utils/httpClient.js';
import { displayCourseList, displayLoading, displayError, clearCourseList, createCourseElement, } from './utils/dom.js';
let allCourses = []; // Store all courses for filtering
const initializeApp = async () => {
    try {
        displayLoading();
        allCourses = await get('courses');
        displayCourses(allCourses);
    }
    catch (error) {
        console.error(error);
        displayError('Kunde inte hämta kurser från API:et');
    }
};
const displayCourses = (courses) => {
    clearCourseList();
    courses.forEach((course) => {
        const courseElement = createCourseElement(course);
        displayCourseList(courseElement);
    });
};
// Search functionality
const handleSearch = (searchTerm) => {
    const filteredCourses = allCourses.filter((course) => {
        const searchString = searchTerm.toLowerCase();
        return (course.title.toLowerCase().includes(searchString) ||
            course.description.toLowerCase().includes(searchString) ||
            course.courseNumber.toLowerCase().includes(searchString));
    });
    displayCourses(filteredCourses);
};
// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    // Add search functionality
    const searchInput = document.getElementById('course-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const target = e.target;
            handleSearch(target.value);
        });
    }
    // Add filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const target = e.target;
            const filterType = target.dataset.filter;
            // Remove active class from all buttons
            filterButtons.forEach((btn) => btn.classList.remove('active'));
            // Add active class to clicked button
            target.classList.add('active');
            let filteredCourses = allCourses;
            if (filterType === 'classroom') {
                filteredCourses = allCourses.filter((course) => course.isClassroom);
            }
            else if (filterType === 'distance') {
                filteredCourses = allCourses.filter((course) => course.isDistance);
            }
            displayCourses(filteredCourses);
        });
    });
});
