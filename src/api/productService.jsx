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

export const createProduct = async (values) => {
	try {
		const response = await axiosClient.post("products/create", values);
		return response;
	} catch (error) {
		return error;
	}
};

export const updateProduct = async (id, values) => {
	try {
		const response = await axiosClient.put(`products/edit/${id}`, values);
		return response;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const deleteProduct = async (id) => {
	try {
		const response = await axiosClient.remove(`products/delete/${id}`);
		return response;
	} catch (error) {
		console.log(error);
		return error;
	}
};

// Path: src/api/productService.jsx
