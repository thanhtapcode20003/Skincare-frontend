import PropTypes from "prop-types";
import { registerUser } from "../../../../../api/authService";

import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRef } from "react";

// // REGEX
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // 8-24 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
// const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format
// const FULL_NAME_REGEX = /^[A-Za-zÀ-Ỹà-ỹ\s]{2,50}$/; // Allows letters & spaces, supports accents, 2-50 chars
// const PHONE_REGEX = /^\d{9,15}$/; // Allows only numbers, 9-15 digits (international format)
// const ADDRESS_REGEX = /^[A-Za-z0-9\s,.-]{5,100}$/; // Allows letters, numbers, spaces, comma, dot, and hyphen (5-100 chars)

function Register({ onRegisterSuccess, onLoginClick, onClose }) {
	const toast = useRef(null);
	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email format")
			.required("Email is required"),
		password: Yup.string()
			.required("Password is required.")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
				"8-24 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character."
			),
		confirmPassword: Yup.string()
			.required("Confirm Password is required.")
			.oneOf([Yup.ref("password"), null], "Passwords do not match."),
		fullName: Yup.string()
			.required("fullName is required")
			.min(3, "fullName must be at least 3 characters")
			.max(20, "fullName must be at most 20 characters"),
		phoneNumber: Yup.string()
			.required("Phone Number is required.")
			.matches(/^\d+$/, "Please input a valid Phone Number.")
			.min(9, "Phone Number must be at least 9 characters")
			.max(15, "Phone Number must be at most 15 characters"),
		address: Yup.string()
			.required("Address is required.")
			.min(5, "Address must be at least 5 characters")
			.max(100, "Address must be at most 100 characters"),
	});

	// -----------------------------------------------------------------------------------

	const handleSubmit = async (values, { setSubmitting, setErrors }) => {
		console.log("submit");
		try {
			const userData = {
				email: values.email,
				password: values.password,
				userName: values.fullName,
				phoneNumber: values.phoneNumber,
				address: values.address,
				roleName: "Customer",
			};
			console.log(userData);

			const response = await registerUser(userData);
			if (response.status === 200) {
				toast.current.show({
					severity: "success",
					summary: "Successful",
					detail: "Register successfully",
					life: 2000,
				});
				await new Promise((resolve) => setTimeout(resolve, 2000));
				console.log(response);
				onRegisterSuccess();
			} else {
				toast.current.show({
					severity: "error",
					summary: "Error",
					detail: response.status + ": " + response.data.message,
					life: 3000,
				});
				const errorData = response.data || response; // Adjust based on response structure
				setErrors({
					form: errorData.error || "Registration failed. Please try again.",
				});
			}
		} catch (err) {
			setErrors({ form: "Something went wrong. Please try again later." });
			console.error("Registration error:", err);
		} finally {
			setSubmitting(false); // Ensure submitting state is reset
		}
	};

	return (
		<div className="fixed min-w-150 h-screen">
			<Toast ref={toast} />
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
						<Formik
							initialValues={{
								email: "",
								password: "",
								confirmPassword: "",
								fullName: "",
								phoneNumber: "",
								address: "",
							}}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							{({
								errors,
								touched,
								isSubmitting,
								values,
								handleChange,
								handleBlur,
							}) => (
								<Form className="space-y-4 md:space-y-6">
									{/* Email */}
									<div>
										<FloatLabel>
											<label>Email</label>
											<Field
												as={InputText}
												className={`p-inputtext-sm w-full ${
													touched.email && errors.email ? "p-invalid" : ""
												}`}
												name="email"
												onBlur={handleBlur}
											/>
										</FloatLabel>
										{touched.email && errors.email && (
											<p className="text-red-500 text-sm">{errors.email}</p>
										)}
									</div>

									{/* Password */}
									<div className="flex gap-4">
										<div className="w-1/2">
											<FloatLabel>
												<Password
													inputId="password"
													name="password" // Add name to connect with Formik
													value={values.password} // Use Formik's value
													onChange={handleChange} // Use Formik's handleChange
													onBlur={handleBlur} // Use Formik's handleBlur
													toggleMask
													className={`p-inputtext-sm ${
														touched.password && errors.password
															? "p-invalid"
															: ""
													}`}
												/>
												<label htmlFor="password">Password</label>
											</FloatLabel>
											{touched.password && errors.password && (
												<p className="text-red-500 text-sm">
													{errors.password}
												</p>
											)}
										</div>

										{/* Confirm Password */}
										<div className="w-1/2">
											<FloatLabel>
												<Password
													inputId="confirmPassword"
													name="confirmPassword" // Add name to connect with Formik
													value={values.confirmPassword} // Use Formik's value
													onChange={handleChange} // Use Formik's handleChange
													onBlur={handleBlur} // Use Formik's handleBlur
													toggleMask
													className={`p-inputtext-sm ${
														touched.confirmPassword && errors.confirmPassword
															? "p-invalid"
															: ""
													}`}
												/>
												<label
													className="whitespace-nowrap"
													htmlFor="confirmPassword"
												>
													Confirm Password
												</label>
											</FloatLabel>
											{touched.confirmPassword && errors.confirmPassword && (
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
												<Field
													as={InputText}
													className={`p-inputtext-sm w-full ${
														touched.fullName && errors.fullName
															? "p-invalid"
															: ""
													}`}
													name="fullName"
													onBlur={handleBlur}
												/>
											</FloatLabel>
											{touched.fullName && errors.fullName && (
												<p className="text-red-500 text-sm">
													{errors.fullName}
												</p>
											)}
										</div>

										{/* Phone Number */}
										<div className="w-2/5">
											<FloatLabel>
												<label>Phone Number</label>
												<Field
													as={InputText}
													className={`p-inputtext-sm w-full ${
														touched.phoneNumber && errors.phoneNumber
															? "p-invalid"
															: ""
													}`}
													name="phoneNumber"
													onBlur={handleBlur}
												/>
											</FloatLabel>
											{touched.phoneNumber && errors.phoneNumber && (
												<p className="text-red-500 text-sm">
													{errors.phoneNumber}
												</p>
											)}
										</div>
									</div>

									{/* Address */}
									<div>
										<FloatLabel>
											<label>Address</label>
											<Field
												as={InputText}
												className={`p-inputtext-sm w-full ${
													touched.address && errors.address ? "p-invalid" : ""
												}`}
												name="address"
												onBlur={handleBlur}
											/>
										</FloatLabel>
										{touched.address && errors.address && (
											<p className="text-red-500 text-sm">{errors.address}</p>
										)}
									</div>
									{errors.form && (
										<p className="text-red-500 text-sm">{errors.form}</p>
									)}
									<div className="flex justify-center">
										<Button
											label="Register"
											type="submit"
											className="bg-global"
											loading={isSubmitting}
											disabled={isSubmitting}
										/>
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
								</Form>
							)}
						</Formik>
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
