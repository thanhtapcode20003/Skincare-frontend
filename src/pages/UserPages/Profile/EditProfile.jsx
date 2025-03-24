import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Skeleton } from "primereact/skeleton"; // Import Skeleton
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../utils/useAuth";
import { updateUser } from "../../../api/userService";

function EditProfile() {
	const navigate = useNavigate();
	const toast = useRef(null);
	const {
		userId,
		username,
		email,
		phoneNumber,
		address,
		loading: authLoading,
	} = useAuth();
	const [loading, setLoading] = useState(true);
	const [buttonLoading, setButtonLoading] = useState(false); // State for button loading
	const [initialValues, setInitialValues] = useState({
		userName: "",
		email: "",
		phoneNumber: "",
		address: "",
	});

	// Validation schema using Yup
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

	// Wait for useAuth to finish loading
	useEffect(() => {
		const initializeUserData = async () => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// Wait until authLoading is false
			if (authLoading) return;

			if (!userId) {
				setTimeout(() => {
					if (toast.current) {
						toast.current.show({
							severity: "error",
							summary: "Error",
							detail: "User not authenticated",
							life: 3000,
						});
					}
				}, 100);
			} else {
				setInitialValues({
					userName: username || "",
					email: email || "",
					phoneNumber: phoneNumber || "",
					address: address || "",
				});
				setLoading(false);
			}
		};

		initializeUserData();
	}, [userId, username, email, phoneNumber, address, authLoading, navigate]);

	// Handle form submission with 1-second button loading delay
	const handleSubmit = async (values, { setSubmitting }) => {
		setButtonLoading(true); // Start button loading
		setSubmitting(true);

		// Simulate a 1-second delay before proceeding with the submission
		await new Promise((resolve) => setTimeout(resolve, 1000));

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
					detail: "Profile Updated Successfully",
					life: 3000,
				});
				console.log("Update successful:", response);
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
				detail: err.message || "Failed to update profile",
				life: 3000,
			});
		} finally {
			setButtonLoading(false); // Stop button loading
			setSubmitting(false);
		}
	};

	// Handle cancel button
	const handleClose = () => {
		navigate("/profile");
	};

	console.log(userId, username, email, phoneNumber, address);

	return (
		<div className="card px-10">
			<Toast ref={toast} />
			{loading ? (
				<div className="loading-skeleton">
					<Skeleton width="100%" height="3rem" className="mb-8" /> {/* Title */}
					<div className="flex gap-20 mb-5">
						<div className="flex flex-col gap-2 flex-1">
							<Skeleton width="5rem" height="1.5rem" className="mb-2" />
							<Skeleton width="100%" height="2.5rem" />
						</div>
						<div className="flex flex-col gap-2 flex-1">
							<Skeleton width="5rem" height="1.5rem" className="mb-2" />
							<Skeleton width="100%" height="2.5rem" />
						</div>
					</div>
					<div className="flex gap-20 mb-5">
						<div className="flex flex-col gap-2 flex-1">
							<Skeleton width="5rem" height="1.5rem" className="mb-2" />
							<Skeleton width="100%" height="2.5rem" />
						</div>
						<div className="flex flex-col gap-2 flex-1">
							<Skeleton width="5rem" height="1.5rem" className="mb-2" />
							<Skeleton width="100%" height="2.5rem" />
						</div>
					</div>
					<div className="flex justify-between">
						<Skeleton shape="circle" width="3rem" height="3rem" />
						<Skeleton shape="circle" width="3rem" height="3rem" />
					</div>
				</div>
			) : (
				<>
					<h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
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
												"w-full" +
												(touched.email && errors.email ? " p-invalid" : "")
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
												"w-full" +
												(touched.userName && errors.userName
													? " p-invalid"
													: "")
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
												"w-full" +
												(touched.phoneNumber && errors.phoneNumber
													? " p-invalid"
													: "")
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
												"w-full" +
												(touched.address && errors.address ? " p-invalid" : "")
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
										type="button"
										rounded
										raised
										className="p-button-lg"
										onClick={() => handleClose()}
									/>
									<Button
										label="Update"
										icon="pi pi-check"
										severity="success"
										type="submit"
										rounded
										raised
										className="p-button-lg bg-global"
										disabled={isSubmitting || buttonLoading}
										loading={buttonLoading} // Add loading state to button
									/>
								</div>
							</Form>
						)}
					</Formik>
				</>
			)}
		</div>
	);
}

export default EditProfile;
