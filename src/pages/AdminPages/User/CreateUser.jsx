import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Password } from "primereact/password";

import { registerUser } from "../../../api/authService";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function CreateUser() {
	const navigate = useNavigate();
	const toast = useRef(null);
	// initialValues
	const initialValues = {
		userName: "",
		email: "",
		password: "",
		confirmPassword: "",
		phoneNumber: "",
		address: "",
		roleName: null,
	};

	// Validate by yup
	const userSchema = yup.object().shape({
		userName: yup
			.string()
			.required("Username is required")
			.min(3, "Username must be at least 3 characters")
			.max(20, "Username must be at most 20 characters"),
		email: yup
			.string()
			.email("Invalid email address")
			.required("Email is required"),
		password: yup
			.string()
			.required("Password is required")
			.min(8, "Password must be at least 8 characters"),
		confirmPassword: yup
			.string()
			.required("Confirm Password is required")
			.oneOf([yup.ref("password"), null], "Passwords must match"),
		phoneNumber: yup.string().required("Phone Number is required"),
		address: yup.string().required("Address is required"),
		roleName: yup.string().required("Role is required"),
	});

	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		setSubmitting(true);
		try {
			const userData = {
				userName: values.userName,
				email: values.email,
				password: values.password,
				phoneNumber: values.phoneNumber,
				address: values.address,
				roleName: values.roleName,
			};
			console.log("Submitting user data:", userData);

			const response = await registerUser(userData);
			if (response.status === 200) {
				toast.current.show({
					severity: "success",
					summary: "Successful",
					detail: "Create User Successfully",
					life: 3000,
				});
				console.log("Registration successful:", response);
				resetForm();
				// navigate("/user"); // Navigate to user list on success
			} else {
				toast.current.show({
					severity: "error",
					summary: "Error ",
					detail: response.status + ": " + response.data.message,
					life: 3000,
				});
				console.error("Registration failed:", response);
			}
		} catch (err) {
			console.error("Registration error:", err);
		} finally {
			setSubmitting(false);
		}
	};

	// Handle cancel button
	const handleClose = () => {
		navigate("/user");
	};

	// Role options for the dropdown
	const roles = [
		{ label: "Manager", value: "Manager" },
		{ label: "Customer", value: "Customer" },
		{ label: "Staff", value: "Staff" },
	];

	return (
		<div className="card px-10">
			<Toast ref={toast} />
			<h1 className="text-3xl font-bold mb-5">Create New User</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={userSchema}
				onSubmit={handleSubmit}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					isSubmitting,
				}) => (
					<Form className="">
						{/* Email and Username */}
						<div
							className="flex gap-20 mb-2
"
						>
							<div className="emailField flex flex-col gap-2 flex-1">
								<label className="text-gray-700 font-medium text-lg">
									Email
								</label>
								<InputText
									type="text"
									name="email"
									placeholder="Enter your email"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										("w-full",
										{
											"p-invalid": touched.email && errors.email,
										})
									}
								/>
								<ErrorMessage
									name="email"
									component="small"
									className="p-error"
								/>
							</div>
							<div className="usernameField flex flex-col gap-2 flex-1">
								<label className="text-gray-700 font-medium text-lg">
									Username
								</label>
								<InputText
									type="text"
									name="userName"
									placeholder="Enter your username"
									value={values.userName}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										("w-full",
										{
											"p-invalid": touched.userName && errors.userName,
										})
									}
								/>
								<ErrorMessage
									name="userName"
									component="small"
									className="p-error"
								/>
							</div>
						</div>

						{/* Password and Confirm Password */}
						<div
							className="flex gap-20 mb-2
"
						>
							<div className="passwordField flex flex-col gap-2 flex-1">
								<label className="text-gray-700 font-medium text-lg">
									Password
								</label>
								<Password
									name="password"
									placeholder="Enter your password"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										("w-full",
										{
											"p-invalid": touched.password && errors.password,
										})
									}
									toggleMask
								/>
								<ErrorMessage
									name="password"
									component="small"
									className="p-error"
								/>
							</div>
							<div className="confirmPasswordField flex flex-col gap-2 flex-1">
								<label className="text-gray-700 font-medium text-lg">
									Confirm Password
								</label>
								<Password
									name="confirmPassword"
									placeholder="Enter Confirm Password"
									value={values.confirmPassword}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										("w-full",
										{
											"p-invalid":
												touched.confirmPassword && errors.confirmPassword,
										})
									}
									toggleMask
								/>
								<ErrorMessage
									name="confirmPassword"
									component="small"
									className="p-error"
								/>
							</div>
						</div>

						{/* Phone Number and Role Name */}
						<div
							className="flex gap-20 mb-2
"
						>
							<div className="phoneNumberField flex flex-col gap-2 flex-1">
								<label className="text-gray-700 font-medium text-lg">
									Phone Number
								</label>
								<InputText
									type="text"
									name="phoneNumber"
									placeholder="Enter your phone number"
									value={values.phoneNumber}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										("w-full",
										{
											"p-invalid": touched.phoneNumber && errors.phoneNumber,
										})
									}
								/>
								<ErrorMessage
									name="phoneNumber"
									component="small"
									className="p-error"
								/>
							</div>
							<div className="roleNameField flex flex-col gap-2 flex-1">
								<label className="text-gray-700 font-medium text-lg">
									Role
								</label>
								<Dropdown
									name="roleName"
									value={values.roleName}
									options={roles}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										("w-full",
										{
											"p-invalid": touched.roleName && errors.roleName,
										})
									}
									placeholder="Select a Role"
								/>
								<ErrorMessage
									name="roleName"
									component="small"
									className="p-error"
								/>
							</div>
						</div>

						{/* Address Field */}
						<div className="mb-5">
							<div className="addressField flex flex-col gap-2">
								<label className="text-gray-700 font-medium text-lg">
									Address
								</label>
								<InputText
									type="text"
									name="address"
									placeholder="Enter your address"
									value={values.address}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										("w-full",
										{
											"p-invalid": touched.address && errors.address,
										})
									}
								/>
								<ErrorMessage
									name="address"
									component="small"
									className="p-error"
								/>
							</div>
						</div>

						{/* Buttons */}
						<div className="flex justify-between">
							<Button
								label="Cancel"
								icon="pi pi-times"
								severity="secondary"
								rounded
								raised
								className="p-button-lg"
								type="button"
								onClick={handleClose}
							/>
							<Button
								label="Create"
								icon="pi pi-check"
								severity="success"
								type="submit"
								rounded
								raised
								className="p-button-lg"
								disabled={isSubmitting}
							/>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default CreateUser;
