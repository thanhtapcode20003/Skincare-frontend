import * as axiosClient from "../utils/axiosClient";

export const loginUser = async (loginData) => {
	try {
		const response = await axiosClient.post("auth/login", loginData);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const registerUser = async (userData) => {
	try {
		const response = await axiosClient.post("auth/register", userData);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};
