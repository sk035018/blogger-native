import axios from 'axios';
import BASE_URL from '../constants/baseURL';

export const login = async payload => {
    return await axios.post(`${BASE_URL}/login`, payload);
};