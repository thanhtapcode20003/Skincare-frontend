import * as axiosClient from "../utils/axiosClient";

export const getOrders = async () => {
	try {
		const response = await axiosClient.get("orders/my-orders");
		return response;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getOrderDetails = async () => {
	try {
		const response = await axiosClient.get("orders/my-order-details");
		return response;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const addToCart = async (values) => {
	try {
		const response = await axiosClient.post("orders/add-to-cart", values);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const updateOrder = async (orderDetailId, values) => {
	try {
		const response = await axiosClient.put(
			`orders/${orderDetailId}/quantity`,
			values
		);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};

export const deleteOrder = async (orderDetailId) => {
	try {
		const response = await axiosClient.remove(`orders/${orderDetailId}`);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};

export const paymentVnPay = async (orderId) => {
	try {
		const response = await axiosClient.post(
			`orders/${orderId}/create-vnpay-payment`
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const paymentCOD = async (orderId) => {
	try {
		const response = await axiosClient.post(
			`orders/${orderId}/create-cod-payment`
		);
		return response;
	} catch (error) {
		return error.response;
	}
};
