const baseUrl = 'http://localhost:3000';

// GET
export const get = async (endPoint: string) => {
  try {
    const response = await fetch(`${baseUrl}/${endPoint}`);

    // Kontrollera att svaret är OK
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    // Hämta data
    const result = await response.json();
    return result;
    // Övergripande felhantering
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// POST
export const post = async (endPoint: string, data: any) => {
  try {
    const response = await fetch(`${baseUrl}/${endPoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Konverterar JS-objektet till JSON
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// PUT
// DELETE
// ETC
