export const BASE_URL = location.hostname === 'localhost'
  ? 'http://localhost:7777' // Development
  : 'https://devtinder-backend-8ruc.onrender.com'; // Production (INCORRECT for Socket.io)
