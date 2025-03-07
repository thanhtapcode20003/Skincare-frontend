import * as axiosClient from "../utils/axiosClient";

export const getUser = async () => {
	try {
		const response = await axiosClient.get("users");
		return response;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getUserById = async (id) => {
	try {
		const response = await axiosClient.get(`users/${id}`);
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateUser = async (id, values) => {
	try {
		const response = await axiosClient.put(`users/${id}`, values);
		return response;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const deleteUser = async (id) => {
	try {
		const response = await axiosClient.remove(`users/${id}`);
		return response;
	} catch (error) {
		console.log(error);
		return error;
	}
};
