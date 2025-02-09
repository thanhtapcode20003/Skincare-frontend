import { useState } from "react";
import PropTypes from "prop-types";

import { Button } from "primereact/button";
import "primeicons/primeicons.css";

import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";

function Register({ onRegisterSuccess, onLoginClick, onClose }) {
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		try {
			const response = await fetch("https://localhost:7007/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userName,
					email,
					password,
					phoneNumber,
					address,
					roleName: "Customer",
				}),
			});
			console.log(response.body);

			if (response.ok) {
				const data = await response.json();
				setSuccess("Registration successful! You can now log in.", data);
				onRegisterSuccess();
			} else {
				const errorData = await response.json();
				setError(errorData.error || "Registration failed. Please try again.");
			}
		} catch (err) {
			setError("Something went wrong. Please try again later.", err);
		}
	};

	return (
		<div className="fixed min-w-150 h-screen">
			<div className="fixed inset-0 flex items-center justify-center z-100">
				<div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-131 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="relative p-8 space-y-6">
						<i
							className="absolute top-2 right-2 p-2 pi pi-times cursor-pointer"
							style={{ fontSize: "1.5rem", color: "black" }}
							onClick={onClose}
						></i>
						<h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
							Sign up for an account
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
							{/* Email */}
							<div>
								<FloatLabel>
									<label>Email</label>
									<InputText
										className="p-inputtext-sm w-full"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</FloatLabel>
							</div>

							{/* Password */}
							<div className="flex gap-4">
								<FloatLabel className="w-1/2">
									<Password
										className="p-inputtext-sm"
										inputId="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										toggleMask
									/>
									<label htmlFor="password">Password</label>
								</FloatLabel>

								{/* Confirm Password */}
								<FloatLabel className="w-1/2">
									<Password
										className="p-inputtext-sm"
										inputId="confirmPassword"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										required
										toggleMask
									/>
									<label htmlFor="confirmPassword">Confirm Password</label>
								</FloatLabel>
							</div>

							{/* Full Name */}
							<div className="flex gap-4">
								<div>
									<FloatLabel>
										<label>Full Name</label>
										<InputText
											className="p-inputtext-sm w-full"
											type="text"
											value={userName}
											onChange={(e) => setUserName(e.target.value)}
											required
										/>
									</FloatLabel>
								</div>

								{/* Phone Number */}
								<div>
									<FloatLabel>
										<label>Phone Number</label>
										<InputText
											className="p-inputtext-sm w-full"
											type="text"
											value={phoneNumber}
											onChange={(e) => setPhoneNumber(e.target.value)}
											required
										/>
									</FloatLabel>
								</div>
							</div>

							{/* Address */}
							<div>
								<FloatLabel>
									<label>Address</label>
									<InputText
										className="p-inputtext-sm w-full"
										type="text"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										required
									/>
								</FloatLabel>
							</div>
							{error && <p className="text-red-500">{error}</p>}
							{success && <p className="text-green-500">{success}</p>}
							<div className="flex justify-center">
								<Button label="Register" type="submit" />
							</div>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Already have an account?{" "}
								<a
									href="#"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
									onClick={onLoginClick}
								>
									Sign in
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;

Register.propTypes = {
	onRegisterSuccess: PropTypes.func.isRequired,
	onLoginClick: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};
