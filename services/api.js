// api.js
import axios from 'axios';

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}:3000`;

export const verifyUser = async (email) => {
  const response = await axios.post(`${API_URL}/verify-user`, { email });
  return response.data;
};
