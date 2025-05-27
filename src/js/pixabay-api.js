import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50399235-368a9bb0a02fac6949df8b962';

export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Помилка запиту до Pixabay API:', error);
    throw error;
  }
}
