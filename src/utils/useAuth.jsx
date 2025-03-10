import { useState, useEffect } from "react";
import { decode } from "./axiosClient";
// import { redirect } from "react-router-dom";

export const useAuth = () => {
	const [username, setUsername] = useState(null);
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

	return { username, role, isAuthenticated, loading, logout };
};
