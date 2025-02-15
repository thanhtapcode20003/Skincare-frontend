import { useState } from "react";
import PropTypes from "prop-types";

import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";

// REGEX
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // 8-24 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format
const FULL_NAME_REGEX = /^[A-Za-zÀ-Ỹà-ỹ\s]{2,50}$/; // Allows letters & spaces, supports accents, 2-50 chars
const PHONE_REGEX = /^\d{9,15}$/; // Allows only numbers, 9-15 digits (international format)
const ADDRESS_REGEX = /^[A-Za-z0-9\s,.-]{5,100}$/; // Allows letters, numbers, spaces, comma, dot, and hyphen (5-100 chars)

function Register({ onRegisterSuccess, onLoginClick, onClose }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");

	// Error and Success
	const [errors, setErrors] = useState("");

	// -----------------------------------------------------------------------------------

	const validate = () => {
		let newErrors = {};
		if (!EMAIL_REGEX.test(email)) newErrors.email = "Invalid email format.";
		if (!PWD_REGEX.test(password))
			newErrors.password =
				"8-24 words, 1 uppercase, lowercase, number, and special character.";
		if (password !== confirmPassword)
			newErrors.confirmPassword = "Passwords do not match.";
		if (!FULL_NAME_REGEX.test(fullName))
			newErrors.fullName =
				"Full Name must contain only letters and spaces (2-50 characters).";
		if (!PHONE_REGEX.test(phoneNumber))
			newErrors.phoneNumber = "Phone Number must be 9-15 digits.";
		if (!ADDRESS_REGEX.test(address))
			newErrors.address = "Address must be 5-100 characters.";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (values) => {
		console.log("submit");

		values.preventDefault();
		if (!validate()) return;

		try {
			const response = await fetch("https://localhost:7007/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
					fullName,
					phoneNumber,
					address,
					roleName: "Customer",
				}),
			});
			console.log(response.body);

			if (response.ok) {
				onRegisterSuccess();
			} else {
				const errorData = await response.json();
				setErrors({
					form: errorData.error || "Registration failed. Please try again.",
				});
			}
		} catch (err) {
			setErrors({ form: "Something went wrong. Please try again later.", err });
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
									/>
								</FloatLabel>
								{errors.email && (
									<p className="text-red-500 text-sm">{errors.email}</p>
								)}
							</div>

							{/* Password */}
							<div className="flex gap-4">
								<div className="w-1/2">
									<FloatLabel className="w-1/2">
										<Password
											className="p-inputtext-sm"
											inputId="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											toggleMask
										/>
										<label htmlFor="password">Password</label>
									</FloatLabel>
									{errors.password && (
										<p className="text-red-500 text-sm">{errors.password}</p>
									)}
								</div>

								{/* Confirm Password */}
								<div className="w-1/2">
									<FloatLabel className="w-1/2">
										<Password
											className="p-inputtext-sm"
											inputId="confirmPassword"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											toggleMask
										/>
										<label
											className="whitespace-nowrap"
											htmlFor="confirmPassword"
										>
											Confirm Password
										</label>
									</FloatLabel>
									{errors.confirmPassword && (
										<p className="text-red-500 text-sm">
											{errors.confirmPassword}
										</p>
									)}
								</div>
							</div>

							{/* Full Name */}
							<div className="flex gap-4">
								<div className="w-3/5">
									<FloatLabel>
										<label>Full Name</label>
										<InputText
											className="p-inputtext-sm w-full"
											type="text"
											value={fullName}
											onChange={(e) => setFullName(e.target.value)}
										/>
									</FloatLabel>
									{errors.fullName && (
										<p className="text-red-500 text-sm">{errors.fullName}</p>
									)}
								</div>

								{/* Phone Number */}
								<div className="w-2/5">
									<FloatLabel>
										<label>Phone Number</label>
										<InputText
											className="p-inputtext-sm w-full"
											type="text"
											value={phoneNumber}
											onChange={(e) => setPhoneNumber(e.target.value)}
										/>
									</FloatLabel>
									{errors.phoneNumber && (
										<p className="text-red-500 text-sm">{errors.phoneNumber}</p>
									)}
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
									/>
								</FloatLabel>
								{errors.address && (
									<p className="text-red-500 text-sm">{errors.address}</p>
								)}
							</div>
							{errors.form && (
								<p className="text-red-500 text-sm">{errors.form}</p>
							)}
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
