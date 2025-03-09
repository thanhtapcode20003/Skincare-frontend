import * as axiosClient from "../utils/axiosClient";

export const getCategories = async () => {
	try {
		const response = await axiosClient.get("categories");
		return response;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getCategoryById = async (id) => {
	try {
		const response = await axiosClient.get(`categories/${id}`);
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const createCategory = async (values) => {
	try {
		const response = await axiosClient.post("categories/create", values);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const updateCategory = async (id, values) => {
	try {
		const response = await axiosClient.put(`categories/edit/${id}`, values);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};

export const deleteCategory = async (id) => {
	try {
		const response = await axiosClient.remove(`categories/delete/${id}`);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};

// Path: src/api/categoryService.jsx
