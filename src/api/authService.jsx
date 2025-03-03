import * as axiosClient from "../utils/axiosClient";

export const loginUser = async (loginData) => {
	try {
		const res = await axiosClient.post("auth/login", loginData);
		return res;
	} catch (err) {
		return err.res;
	}
};

export const registerUser = async (userData) => {
	try {
		const res = await axiosClient.post("auth/register", userData);
		return res;
	} catch (err) {
		console.log(err);
		return err.response;
	}
};
