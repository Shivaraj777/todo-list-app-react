const API_ROOT = 'https://jsonplaceholder.typicode.com/';

export const API_URLS = {
  getTasks: (limit) => `${API_ROOT}posts/?_limit=${limit}`,
}