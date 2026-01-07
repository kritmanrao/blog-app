import axios from "axios";
const BASE_URI = import.meta.env.VITE_API_URL + "/posts";

/* ---------- PUBLIC POSTS ---------- */
export async function getPublicPosts() {
  try {
    const res = await axios.get(`${BASE_URI}/public`);
    return res.data.data;
  } catch {
    return null;
  }
}

/* ---------- MY POSTS ---------- */
export async function getMyPosts(signal) {
  try {
    const res = await axios.get(`${BASE_URI}/`, {
      withCredentials: true,
      signal,
    });
    return res.data.data;
  } catch {
    return null;
  }
}

/* ---------- ADD POST ---------- */
export async function addPost(newPost) {
  try {
    const res = await axios.post(`${BASE_URI}/`, newPost, {
      withCredentials: true,
    });
    return res.data.data;
  } catch {
    return null;
  }
}

/* ---------- LIKE / UNLIKE ---------- */
export async function toggleLike(postId) {
  try {
    const res = await axios.post(
      `${BASE_URI}/${postId}/like`,
      {},
      { withCredentials: true },
    );
    return res.data;
  } catch {
    return null;
  }
}

/* ---------- DELETE POST ---------- */
export async function deletePost(postId) {
  try {
    const res = await axios.delete(`${BASE_URI}/${postId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch {
    return null;
  }
}

/* ---------- EDIT POST ---------- */
export async function editPost(postId, newData) {
  try {
    const res = await axios.put(`${BASE_URI}/${postId}`, newData, {
      withCredentials: true,
    });
    return res.data.data;
  } catch {
    return null;
  }
}

/* ---------- SEARCH ---------- */

export async function searchPost(query) {
  try {
    const res = await axios.get(`${BASE_URI}/search`, {
      params: { q: query },
      withCredentials: true,
    });
    return res.data.data;
  } catch {
    return null;
  }
}
/* ---------- Favorite / UnFavorite ---------- */

export async function toggleFavorite(postId) {
  try {
    const res = await axios.post(
      `${BASE_URI}/favorite/${postId}`,
      {},
      { withCredentials: true },
    );
    return res.data;
  } catch {
    return null;
  }
}

/* ---------- Favorite Post ---------- */
export async function getFavoritePosts() {
  try {
    const res = await axios.get(`${BASE_URI}/favorite`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch {
    return null;
  }
}
