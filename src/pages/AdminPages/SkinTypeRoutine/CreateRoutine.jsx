import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";

import { createSkincareRoutine } from "../../../api/skincareRoutineService";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function CreateRoutine() {
	const navigate = useNavigate();
	const toast = useRef(null);

	const initialValues = {
		description: "",
		type: "",
	};

	// Validate by yup
	const routineSchema = yup.object().shape({
		description: yup.string().required("Description is required"),
		type: yup.string().required("Routine Type is required"),
	});

	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		setSubmitting(true);
		try {
			const routineData = {
				description: values.description,
				type: values.type,
			};

			const response = await createSkincareRoutine(routineData);
			if (response.status === 200) {
				toast.current.show({
					severity: "success",
					summary: "Successful",
					detail: "Routine created successfully",
					life: 3000,
				});
				console.log("Routine creation successful:", response);
				resetForm();
				setTimeout(() => {
					navigate("/home/routine");
				}, 3000); // Navigate after showing the toast
			} else {
				toast.current.show({
					severity: "error",
					summary: "Error",
					detail: response.status + ": " + response.data.message,
					life: 3000,
				});
				console.error("Routine creation failed:", response);
			}
		} catch (err) {
			console.error("Routine creation error:", err);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: err.message || "Failed to create routine",
				life: 3000,
			});
		} finally {
			setSubmitting(false);
		}
	};

	// Handle cancel button
	const handleClose = () => {
		navigate("/home/routine");
	};

	return (
		<div className="card px-10 min-h-screen">
			<Toast ref={toast} />
			<h1 className="text-3xl font-bold mb-5">Create New Routine</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={routineSchema}
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
						{/* Type */}
						<div className="flex gap-20 mb-2">
							<div className="flex flex-col gap-2 flex-1">
								<label className="text-gray-700 font-medium text-lg">
									Routine Type
								</label>
								<InputText
									type="text"
									name="type"
									placeholder="Enter routine type"
									value={values.type}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										("w-full",
										{
											"p-invalid": touched.type && errors.type,
										})
									}
								/>
								<ErrorMessage
									name="type"
									component="small"
									className="p-error"
								/>
							</div>
						</div>

						{/* Description */}
						<div className="flex gap-20 mb-2">
							<div className="flex flex-col gap-2 flex-1">
								<label className="text-gray-700 font-medium text-lg">
									Description
								</label>
								<InputTextarea
									name="description"
									placeholder="Enter description"
									value={values.description}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										("w-full",
										{
											"p-invalid": touched.description && errors.description,
										})
									}
									rows={6}
								/>
								<ErrorMessage
									name="description"
									component="small"
									className="p-error"
								/>
							</div>
						</div>

						{/* Buttons */}
						<div className="flex justify-between mt-4">
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

export default CreateRoutine;
