const URL = 'https://swapi.dev/api/planets';

export const fetchApi = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};
