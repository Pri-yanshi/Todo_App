export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://todo-app-osou.onrender.com/api/items'  // Production URL
  : '/api/items';  // Development URL