const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

async function request(path, options) {
  const response = await fetch(`${BASE_URL}/${path}`, options);

  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao acessar ${path}.`);
  }

  return response.json();
}

export const api = {
  get(path) {
    return request(path);
  },
  create(path, body) {
    return request(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(body),
    });
  },
};
