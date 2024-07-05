import axios from "axios";

const BACKEND_API = "http://localhost:8080/api/v1";

export const registerAPI = async ({ username, email, password }) => {
  const response = await axios.post(
    `${BACKEND_API}/users/register`,
    {
      username,
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(
    `${BACKEND_API}/users/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const checkAuthAPI = async () => {
  const response = await axios.get(`${BACKEND_API}/users/auth/check`, {
    withCredentials: true,
  });

  return response.data;
};

export const logoutAPI = async () => {
  const response = await axios.post(
    `${BACKEND_API}/users/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const profileAPI = async () => {
  const response = await axios.get(`${BACKEND_API}/users/profile`, {
    withCredentials: true,
  });

  return response.data;
};
