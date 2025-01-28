var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { get } from './utils/httpClient.js';
import { displayCourseList, displayLoading, displayError, clearCourseList, createCourseElement, } from './utils/dom.js';
const initializeApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Visa laddningsindikatorn ...
        displayLoading();
        // Hämta kurser från API:et ...
        const courses = (yield get('courses'));
        // Rensa laddningsindikatorn ...
        clearCourseList();
        // Visa alla kurser..
        courses.forEach((course) => {
            const courseElement = createCourseElement(course);
            displayCourseList(courseElement);
        });
    }
    catch (error) {
        console.error(error);
        displayError('Kunde inte hämta kurser från API:et');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});
