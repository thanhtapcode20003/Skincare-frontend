import * as axiosClient from "../utils/axiosClient";

export const createRatingFeedback = async (values) => {
	try {
		const response = await axiosClient.post("ratings-feedback/create", values);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};

export const getRatingFeedbackById = async (feedbackID) => {
	try {
		const response = await axiosClient.get(`ratings-feedback/${feedbackID}`);
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateRatingFeedback = async (feedbackID, values) => {
	try {
		const response = await axiosClient.put(
			`ratings-feedback/${feedbackID}`,
			values
		);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};

export const deleteRatingFeedback = async (feedbackID) => {
	try {
		const response = await axiosClient.remove(`ratings-feedback/${feedbackID}`);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};

// Get all ratings/feedback for a specific product
export const getRatingsFeedbackByProduct = async (productID) => {
	try {
		const response = await axiosClient.get(
			`ratings-feedback/product/${productID}`
		);
		return response;
	} catch (error) {
		console.log(error);
		return [];
	}
};

// Get all ratings/feedback by a specific user
export const getRatingsFeedbackByUser = async (userID) => {
	try {
		const response = await axiosClient.get(`ratings-feedback/user/${userID}`);
		return response;
	} catch (error) {
		console.log(error);
		return [];
	}
};
