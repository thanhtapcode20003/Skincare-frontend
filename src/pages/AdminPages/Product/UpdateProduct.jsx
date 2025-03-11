import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { getUserById, updateUser } from "../../../api/userService";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function UpdateProduct() {
	const navigate = useNavigate();
	const toast = useRef(null);
	const { userId } = useParams();
	const [loading, setLoading] = useState(true);
	const [initialValues, setInitialValues] = useState({
		userName: "",
		email: "",
		phoneNumber: "",
		address: "",
	});

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
		phoneNumber: yup.string().required("Phone Number is required"),
		address: yup.string().required("Address is required"),
	});

	// Fetch user data on component mount
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUserById(userId);
				if (userData) {
					setInitialValues({
						userName: userData.userName || "",
						email: userData.email || "",
						phoneNumber: userData.phoneNumber || "",
						address: userData.address || "",
					});
				} else {
					toast.current.show({
						severity: "error",
						summary: "Error",
						detail: "User not found",
						life: 3000,
					});
				}
			} catch (err) {
				console.error("Error fetching user:", err);
				toast.current.show({
					severity: "error",
					summary: "Error",
					detail: "Failed to load user data",
					life: 3000,
				});
			} finally {
				setLoading(false);
			}
		};

		if (userId) {
			fetchUser();
		}
	}, [userId]);

	const handleSubmit = async (values, { setSubmitting }) => {
		setSubmitting(true);
		try {
			const userData = {
				userName: values.userName,
				email: values.email,
				phoneNumber: values.phoneNumber,
				address: values.address,
			};
			console.log("Submitting user data:", userData);

			const response = await updateUser(userId, userData);
			if (response.status === 200) {
				toast.current.show({
					severity: "success",
					summary: "Successful",
					detail: "Update User Successfully",
					life: 3000,
				});
				console.log("Registration successful:", response);
				setTimeout(() => {
					navigate("/user");
				}, 3000);
			} else {
				toast.current.show({
					severity: "error",
					summary: "Error " + response.status,
					detail: response.status + ": " + response.data.message,
					life: 3000,
				});
				console.error("Update failed:", response);
			}
		} catch (err) {
			console.error("Update error:", err);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: err.message || "Failed to update user",
				life: 3000,
			});
		} finally {
			setSubmitting(false);
		}
	};

	// Handle cancel button
	const handleClose = () => {
		navigate("/user");
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="card px-10">
			<Toast ref={toast} />
			<h1 className="text-3xl font-bold mb-8">Update User</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={userSchema}
				onSubmit={handleSubmit}
				enableReinitialize
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
						<div className="flex gap-20 mb-5">
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

						{/* Phone Number and Address */}
						<div className="flex gap-20 mb-5">
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
							<div className="addressField flex flex-col gap-2 flex-1">
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
								onClick={handleClose}
							/>
							<Button
								label="Update"
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

export default UpdateProduct;
