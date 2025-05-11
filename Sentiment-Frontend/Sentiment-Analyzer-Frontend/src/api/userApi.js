import axios from 'axios';
import { BASE_URL } from './baseUrl';



export const getUser = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/user`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
}












