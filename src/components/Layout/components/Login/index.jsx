import { useState } from "react";
import PropTypes from "prop-types";

import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import "primeicons/primeicons.css";

function Login({ onLoginSuccess, onSignUpClick, onClose }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		try {
			const response = await fetch("https://localhost:7007/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			console.log(response);

			if (response.ok) {
				const data = await response.json();
				setSuccess("Login successful! Token: " + data.token);
				onLoginSuccess(data.token);
				console.log(data);
			} else {
				const errorData = await response.json();
				setError(errorData.error || "Login failed. Please try again.");
			}
		} catch (err) {
			setError("Something went wrong. Please try again later.", err);
		}
	};

	return (
		<div className="fixed min-w-120 h-screen">
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
									<label htmlFor="email">Your email</label>
									<InputText
										type="email"
										name="email"
										id="email"
										className="w-full"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</FloatLabel>
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
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</FloatLabel>
							</div>

							{/* Announce Status */}
							{error && <p className="text-sm text-red-500">{error}</p>}
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
								<Button className="bg-global" label="Submit" type="submit" />
							</div>

							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet?{" "}
								<a
									href="#"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
									onClick={onSignUpClick}
								>
									Sign up
								</a>
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
