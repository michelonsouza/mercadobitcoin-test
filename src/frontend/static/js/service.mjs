export async function registrationService(body) {
  try {
    const result = fetch('http://localhost:3000/registration', {
      method: 'POST',
      body: JSON.stringify(body),
    }).then(response => response.json());

    return result;
  } catch (error) {
    throw new Error(error);
  }
}