import axios from "axios";
import baseURL from "../constants/baseURL";

export const createBlog = async (payload, token) => {
    return await axios.post(`${baseURL}/blog/create`, payload, { headers: { Authorization: token } });
};