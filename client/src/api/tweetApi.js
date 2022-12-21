import axios from "axios";

export const postTweet = async (data) => {
    const response = await axios.post("/api/tweet/", data);

    return response.data;
};

export const likeTweet = async (id) => {
    const response = await axios.post(`/api/tweet/${id}/like`);

    return response.data;
};

export const unlikeTweet = async (id) => {
    const response = await axios.post(`/api/tweet/${id}/unlike`);

    return response.data;
};

export const commentOnTweet = async (id, data) => {
    const response = await axios.post(`/api/tweet/${id}/comment`, data);

    return response.data;
};

export const getTweetDetails = async (id) => {
    const response = await axios.get(`/api/tweet/${id}`);

    return response.data;
};

export const deleteTweet = async (id) => {
    const response = await axios.delete(`/api/tweet/${id}`);

    return response.data;
};

export const getAllTweets = async () => {
    const response = await axios.get(`/api/tweet/`);

    return response.data;
};
