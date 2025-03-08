import * as axiosClient from "../utils/axiosClient";

export const getSkinTypes = async () => {
	try {
		const response = await axiosClient.get("skin-types");
		return response;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getSkinTypeById = async (id) => {
	try {
		const response = await axiosClient.get(`skin-types/${id}`);
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const createSkinType = async (values) => {
	try {
		const response = await axiosClient.post("skin-types/create", values);
		return response;
	} catch (error) {
		return error;
	}
};

export const updateSkinType = async (id, values) => {
	try {
		const response = await axiosClient.put(`skin-types/edit/${id}`, values);
		return response;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const deleteSkinType = async (id) => {
	try {
		const response = await axiosClient.remove(`skin-types/delete/${id}`);
		return response;
	} catch (error) {
		console.log(error);
		return error;
	}
};

// Path: src/api/skinTypeService.jsx
