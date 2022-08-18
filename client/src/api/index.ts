import axios from 'axios';

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

const api = {
  socialLogin: (authorizationCode: string) =>
    apiInstance.post(
      '/social-login',
      { authorizationCode },
      { withCredentials: true }
    ),

  socialLoginTest: () =>
    apiInstance.get('/social-login', { withCredentials: true }),
};

export default api;
