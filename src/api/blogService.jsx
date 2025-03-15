import * as axiosClient from "../utils/axiosClient";

export const getBlogs = async () => {
	try {
		const response = await axiosClient.get("Blog");
		return response;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getBlogById = async (blogId) => {
	try {
		const response = await axiosClient.get(`Blog/${blogId}`);
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const createBlog = async (values) => {
	try {
		const response = await axiosClient.post("Blog/create", values);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const updateBlog = async (blogId, values) => {
	try {
		const response = await axiosClient.put(`Blog/update/${blogId}`, values);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};

export const deleteBlog = async (blogId) => {
	try {
		const response = await axiosClient.remove(`Blogs/delete/${blogId}`);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};
