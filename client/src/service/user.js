import axios from "axios";

const BASE_URI = import.meta.env.VITE_API_URL + "/auth";

/* ---------------- SIGNUP ---------------- */
export async function signup(newUser) {
  try {
    const response = await axios.post(`${BASE_URI}/signup`, newUser, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Signup failed");
    }
    throw error;
  }
}

/* ---------------- LOGIN ---------------- */
export async function login(userData) {
  try {
    const response = await axios.post(`${BASE_URI}/login`, userData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw error;
  }
}

/* ---------------- LOGOUT ---------------- */
export async function logout() {
  try {
    const response = await axios.post(
      `${BASE_URI}/logout`,
      {},
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Logout failed");
    }
    throw error;
  }
}

/* ---------------- GET CURRENT USER ---------------- */
export async function getMe(signal) {
  try {
    const response = await axios.get(`${BASE_URI}/me`, {
      withCredentials: true,
      signal,
    });
    return response.data;
  } catch (error) {
    return null; // user not logged in
  }
}
