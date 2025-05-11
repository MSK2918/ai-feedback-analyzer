import axios from "axios"
import { BASE_URL } from "./baseUrl"
import toast from "react-hot-toast";


export const sendFeedbackToSpringBootAndFastApi = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/feedback`, data, { withCredentials: true })
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getRecentFeedbacks = async (pageNo, pageSize, sentimentType) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/feedback`, {
            params: {
                pageNo: pageNo,
                pageSize: pageSize,
                sentiment: sentimentType
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getFeedbacksCount = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/feedback/count`, { withCredentials: true })
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const deleteFeedbackById = async (feedbackId) => {
    try {
        await axios.delete(`${BASE_URL}/api/v1/feedback/${feedbackId}`, { withCredentials: true });
        return true;
    } catch (error) {
        throw error;
    }
}

export const removeAllFeedbacks = async () => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/v1/feedback`, { withCredentials: true });
        if (response.status === 204)
            return true;
        else
            return false;
    } catch (error) {
        throw error;
    }
}


export const getAllFeedbacksMonthCount = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/feedback/monthly`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
}














