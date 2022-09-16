import axios from 'axios';
import BASE_URL from '../constants/baseURL';

export const createUser = async payload => {
    return await axios.post(`${BASE_URL}/user/create`, payload);
};