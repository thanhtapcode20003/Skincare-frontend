import { useState, useEffect } from "react";
import { decode } from "./axiosClient";
// import { redirect } from "react-router-dom";

export const useAuth = () => {
	const [userId, setUserId] = useState(null);
	const [username, setUsername] = useState(null);
	const [email, setEmail] = useState(null);
	const [phoneNumber, setPhoneNumber] = useState(null);
	const [address, setAddress] = useState(null);
	const [role, setRole] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		// console.log("Token from localStorage:", token);

		if (token && typeof token === "string" && token.trim().length > 0) {
			try {
				const decodedToken = decode(token);

				setUserId(decodedToken.UserId || decodedToken["UserId"] || null);
				setUsername(decodedToken.UserName || decodedToken["UserName"] || null);
				setEmail(decodedToken.Email || decodedToken["email"] || null);
				setPhoneNumber(
					decodedToken.PhoneNumber || decodedToken["phoneNumber"] || null
				);
				setAddress(decodedToken.Address || decodedToken["address"] || null);

				// Extract the role from the token
				const roleClaim =
					decodedToken[
						"http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
					];
				//
				const mappedRole =
					roleClaim === "Manager" ? "Manager" : roleClaim || "Customer";
				setRole(mappedRole);
				setIsAuthenticated(true);
				// console.log("Decoded Token:", decodedToken);
			} catch (error) {
				console.error("Error decoding token:", error);
				setUserId(null);
				setUsername(null);
				setEmail(null);
				setPhoneNumber(null);
				setAddress(null);
				setRole(null);

				setIsAuthenticated(false);
			}
		} else {
			console.log("No valid token found in localStorage");
			setUserId(null);
			setUsername(null);
			setEmail(null);
			setPhoneNumber(null);
			setAddress(null);
			setRole(null);

			setIsAuthenticated(false);
		}
		setLoading(false);
	}, []);

	const logout = () => {
		localStorage.removeItem("token");
		setUserId(null);
		setUsername(null);
		setEmail(null);
		setPhoneNumber(null);
		setAddress(null);
		setRole(null);

		setIsAuthenticated(false);
		setLoading(false);
		window.location = "/";
	};

	return {
		userId,
		username,
		email,
		phoneNumber,
		address,
		role,
		isAuthenticated,
		loading,
		logout,
	};
};
