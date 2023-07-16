const API_ROOT = 'https://jsonplaceholder.typicode.com/';

export const API_URLS = {
  getTasks: (limit) => `${API_ROOT}todos/?_limit=${limit}`,
  addTask: () => `${API_ROOT}todos`,
  deleteTask: (taskId) => `${API_ROOT}todos/${taskId}`,
  updateTask: (taskId) => `${API_ROOT}todos/${taskId}`
}