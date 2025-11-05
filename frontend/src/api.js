import axios from 'axios';

// ✅ Include /api so all axios calls go to correct backend path
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

const instance = axios.create({
  baseURL: API_BASE,
});

// Function to set auth token
export function setToken(token) {
  if (token) instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete instance.defaults.headers.common['Authorization'];
}

export default instance;
