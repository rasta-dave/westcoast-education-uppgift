var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseUrl = 'http://localhost:3000';
// GET
export const get = (endPoint) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${baseUrl}/${endPoint}`);
        // Kontrollera att svaret är OK
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        // Hämta data
        const result = yield response.json();
        return result;
        // Övergripande felhantering
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
// POST
export const post = (endPoint, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${baseUrl}/${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Konverterar JS-objektet till JSON
        });
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const result = yield response.json();
        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
// PUT
// DELETE
// ETC
