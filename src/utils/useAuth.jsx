import { useState, useEffect } from "react";
import { decode } from "./axiosClient";
// import { redirect } from "react-router-dom";

export const useAuth = () => {
	const [userId, setUserId] = useState(null);
	const [username, setUsername] = useState(null);
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
				setUsername(decodedToken.UserName || decodedToken["UserName"]);
				setUserId(decodedToken.UserId || decodedToken["UserId"]);
				setPhoneNumber(decodedToken.PhoneNumber || decodedToken["PhoneNumber"]);
				setAddress(decodedToken.Address || decodedToken["Address"]);
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
				setIsAuthenticated(false);
			}
		} else {
			console.log("No valid token found in localStorage");
			setIsAuthenticated(false);
		}
		setLoading(false);
	}, []);

	const logout = () => {
		localStorage.removeItem("token");
		window.location = "/";
		setUsername(null);
		setRole(null);
		setIsAuthenticated(false);
		setLoading(false);
	};

	return {
		userId,
		username,
		phoneNumber,
		address,
		role,
		isAuthenticated,
		loading,
		logout,
	};
};
