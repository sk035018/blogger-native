import axios from 'axios';
import baseURL from '../constants/baseURL';

export const createBlog = async (payload, token) => {
    return await axios.post(`${baseURL}/blog/create`, payload, { headers: { Authorization: token } });
};

export const fetchBlogs = async (query, token) => {
    const { skip = 0, limit = 20 } = query;
    return await axios.get(`${baseURL}/blog/getAll?skip=${skip}&limit=${limit}`, { headers: { Authorization: token } });
};

export const deleteBlog = async (id, token) => {
    return await axios.delete(`${baseURL}/blog/delete/${id}`, { headers: { Authorization: token } });
};

export const updateBlog = async (payload, token) => {
    return await axios.put(`${baseURL}/blog/update/${payload._id}`, payload, { headers: { Authorization: token } });
};
