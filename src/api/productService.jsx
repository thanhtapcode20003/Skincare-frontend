import * as axiosClient from "../utils/axiosClient";

export const getProducts = async () => {
	try {
		const response = await axiosClient.get("products");
		return response;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getProductById = async (id) => {
	try {
		const response = await axiosClient.get(`products/${id}`);
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
};
