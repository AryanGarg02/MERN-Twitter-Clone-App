import axios from "axios";

export const getUserDetails = async (id) => {
    const response = await axios.get(`/api/user/${id}`);

    return response.data;
};

export const uploadUserProfile = async (id, data) => {
    const response = await axios.post(
        `/api/user/${id}/uploadProfilePic`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const unFollowUser = async (id) => {
    const response = await axios.post(`/api/user/${id}/unfollow`);

    return response.data;
};

export const followUser = async (id) => {
    const response = await axios.post(`/api/user/${id}/follow`);

    return response.data;
};

export const editUser = async (id, data) => {
    const response = await axios.put(`/api/user/${id}/`, data);

    return response.data;
};
