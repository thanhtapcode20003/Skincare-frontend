import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../../../api/authService";
import { decode } from "../../../../../utils/axiosClient";

import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";

function Login({ onLoginSuccess, onSignUpClick, onClose }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState({ email: "", password: "", general: "" });
	const [success, setSuccess] = useState("");
	const [touch, setTouch] = useState({ email: false, password: false });
	const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission
	const toast = useRef(null);

	const navigate = useNavigate();

	const validateFields = useCallback(() => {
		let valid = true;
		const newErrors = { email: "", password: "", general: "" };

		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		if (!email) {
			newErrors.email = "Email is required.";
			valid = false;
		} else if (!emailRegex.test(email)) {
			newErrors.email = "Please enter a valid email address.";
			valid = false;
		}

		const passwordRegex =
			/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
		if (!password) {
			newErrors.password = "Password is required.";
			valid = false;
		} else if (!passwordRegex.test(password)) {
			newErrors.password =
				"Password must be at least 8 characters long and include 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
			valid = false;
		}

		setError(newErrors);
		return valid;
	}, [email, password]);

	useEffect(() => {
		validateFields();
		console.log("mounted");
	}, [email, password, validateFields]);

	// Handle form submission
	const handleSubmit = async (e) => {
		console.log("submit");

		e.preventDefault();
		setError({ email: "", password: "", general: "" });
		setSuccess("");

		if (!validateFields()) return;
		setIsSubmitting(true);
		try {
			const loginData = { email, password };
			const response = await loginUser(loginData);

			if (response.status === 200) {
				toast.current.show({
					severity: "success",
					summary: "Successful",
					detail: "Login successfully",
					life: 2000,
				});
				await new Promise((resolve) => setTimeout(resolve, 2000));
				setSuccess("Login successful!");
				onLoginSuccess(response.data.token);
				console.log(response.status);
				setEmail("");
				setPassword("");
				setTouch({ email: false, password: false });
				setError({ email: "", password: "", general: "" });
				setSuccess("");
				// Decode the token to get the roles
				const token = response.data.token;
				const decodeToken = decode(token);
				const roleClaim =
					decodeToken[
						"http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
					];
				const mappedRole =
					roleClaim === "Manager" ? "Manager" : roleClaim || "Customer";

				// Redirect based on role
				if (mappedRole === "Manager") {
					navigate("/user");
				} else if (mappedRole === "Staff") {
					navigate("/product");
				}
			} else {
				toast.current.show({
					severity: "error",
					summary: "Error",
					detail: response.status + ": " + response.data,
					life: 3000,
				});
			}
		} catch (error) {
			console.log(error);

			if (error.response) {
				// Server responded with a status code other than 2xx
				setError((prev) => ({
					...prev,
					general:
						error.response.data.error || "Login failed. Please try again.",
				}));
			} else if (error.request) {
				// Request was made but no response received
				setError((prev) => ({
					...prev,
					general: "No response from server. Please try again later.",
				}));
			} else {
				// Something else happened
				setError((prev) => ({
					...prev,
					general: "Something went wrong. Please try again later.",
				}));
			}
		}
	};

	return (
		<div className="fixed min-w-120 h-screen">
			<Toast ref={toast} />
			<section className="fixed inset-0 flex items-center justify-center m-100 z-100">
				<div className="w-full min-w-[320px] bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="relative p-6 space-y-4 md:space-y-6 sm:p-8">
						<i
							className="absolute top-2 right-2 p-2 pi pi-times cursor-pointer"
							style={{ fontSize: "1.5rem", color: "black" }}
							onClick={onClose}
						></i>
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Sign in to your account
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
							{/* Email */}
							<div>
								<FloatLabel>
									<label htmlFor="email">Email</label>
									<InputText
										name="email"
										id="email"
										className="w-full"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										onBlur={() =>
											setTouch((prev) => ({ ...prev, email: true }))
										}
										invalid={touch.email && !!error.email}
									/>
								</FloatLabel>
								{touch.email && error.email && (
									<p className="text-sm text-red-500">{error.email}</p>
								)}
							</div>

							{/* Password */}
							<div>
								<FloatLabel>
									<label htmlFor="password">Password</label>
									<InputText
										type="password"
										name="password"
										id="password"
										className="w-full"
										value={password}
										onChange={(e) => setPassword(() => e.target.value)}
										onBlur={() =>
											setTouch((prev) => ({ ...prev, password: true }))
										}
										invalid={touch.password && !!error.password}
									/>
								</FloatLabel>
								{touch.password && error.password && (
									<p className="text-sm text-red-500">{error.password}</p>
								)}
							</div>

							{/* Announce Status */}
							{error.general && (
								<p className="text-sm text-red-500">{error.general}</p>
							)}
							{success && <p className="text-sm text-green-500">{success}</p>}

							{/* Remember and Forgot Password */}
							<div className="flex items-center justify-between">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="remember"
											aria-describedby="remember"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="remember"
											className="text-gray-500 dark:text-gray-300"
										>
											Remember me
										</label>
									</div>
								</div>
								<a
									href="#"
									className="text-gray-500 text-sm dark:text-gray-300"
								>
									Forgot password?
								</a>
							</div>
							<div className="flex justify-center">
								<Button
									className="bg-global"
									label="Submit"
									type="submit"
									loading={isSubmitting} // Show spinner when submitting
									disabled={isSubmitting} // Disable button during submission
								/>
							</div>

							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet?{" "}
								<Link
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
									onClick={onSignUpClick}
								>
									Sign up
								</Link>
							</p>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Login;

Login.propTypes = {
	onLoginSuccess: PropTypes.func.isRequired,
	onSignUpClick: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};
