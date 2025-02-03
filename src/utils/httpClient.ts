const BASE_URL = 'http://localhost:3000';

// GET
export const get = async (endPoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${endPoint}`);

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
  const response = await fetch(`${BASE_URL}/${endPoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// PUT
// DELETE
// ETC

// PATCH
export const patch = async (endPoint: string, data: any) => {
  const response = await fetch(`${BASE_URL}/${endPoint}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
