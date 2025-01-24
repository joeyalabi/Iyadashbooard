import axios from 'axios';

const GLOBUS_TOKEN_URL = process.env.VITE_GLOBUS_TOKEN_URL;
const GLOBUS_BASE_URL = process.env.VITE_GLOBUS_BASE_URL;

let accessToken = null;
let tokenExpiry = null;

const refreshToken = async () => {
  try {
    const response = await axios.post(GLOBUS_TOKEN_URL, {
      client_id: process.env.VITE_GLOBUS_CLIENT_ID,
      client_secret: process.env.VITE_GLOBUS_CLIENT_SECRET,
      grant_type: 'password',
      username: process.env.VITE_GLOBUS_USERNAME,
      password: process.env.VITE_GLOBUS_PASSWORD,
      scope: process.env.VITE_GLOBUS_SCOPE
    });

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000);
    return accessToken;
  } catch (error) {
    console.error('Failed to refresh Globus token:', error);
    throw error;
  }
};

export const globusRequest = async (method, endpoint, data) => {
  if (!accessToken || Date.now() >= tokenExpiry) {
    await refreshToken();
  }

  return axios({
    method,
    url: `${GLOBUS_BASE_URL}${endpoint}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    data
  });
};