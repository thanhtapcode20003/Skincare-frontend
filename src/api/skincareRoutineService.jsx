import * as axiosClient from "../utils/axiosClient";

export const getSkincareRoutines = async () => {
	try {
		const response = await axiosClient.get("skin-care-routines");
		return response;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getSkincareRoutineById = async (id) => {
	try {
		const response = await axiosClient.get(`skin-care-routines/${id}`);
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const createSkincareRoutine = async (values) => {
	try {
		const response = await axiosClient.post(
			"skin-care-routines/create",
			values
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const updateSkincareRoutine = async (id, values) => {
	try {
		const response = await axiosClient.put(
			`skin-care-routines/edit/${id}`,
			values
		);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};

export const deleteSkincareRoutine = async (id) => {
	try {
		const response = await axiosClient.remove(
			`skin-care-routines/delete/${id}`
		);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};

// Path: src/api/skincareRoutineService.jsx
