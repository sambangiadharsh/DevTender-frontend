export const BASE_URL = location.hostname === 'localhost'
  ? 'http://localhost:7777' // Development
  : '/api'; // Production (INCORRECT for Socket.io)
