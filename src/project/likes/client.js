import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
const USERS_API = `${API_BASE}/api/users`;
const LIKES_API = `${API_BASE}/api/likes`;

export const findAllLikes = async () => {
    const response = await axios.get(LIKES_API);
    return response.data;
    }

export const createUserLikesMovie = async (userId, gameId) => {
    const response = await axios.post(`${USERS_API}/${userId}/likes/${gameId}`);
    return response.data;
}

export const deleteUserLikesMovie = async (userId, gameId) => {
    const response = await axios.delete(`${USERS_API}/${userId}/likes/${gameId}`);
    return response.data;
}

export const findUsersThatLikeMovie = async (gameId) => {
    const response = await axios.get(`${LIKES_API}/${gameId}/users`);
    return response.data;
}

export const findMoviesLikedByUser = async (userId) => {
    const response = await axios.get(`${USERS_API}/${userId}/likes`);
    return response.data;
}