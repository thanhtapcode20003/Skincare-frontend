import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";

import {
	getSkincareRoutineById,
	updateSkincareRoutine,
} from "../../../api/skincareRoutineService";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function UpdateRoutine() {
	const navigate = useNavigate();
	const toast = useRef(null);
	const { skinTypeRoutineId } = useParams(); // Get skinTypeRoutineId from URL
	const [loading, setLoading] = useState(true); // Add loading state
	const [initialValues, setInitialValues] = useState({
		type: "",
		description: "",
	});

	// Validation schema
	const routineSchema = yup.object().shape({
		type: yup.string().required("Routine Type is required"),
		description: yup.string().required("Description is required"),
	});

	// Fetch routine data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const routineData = await getSkincareRoutineById(skinTypeRoutineId); // Fetch routine data
				console.log(routineData);

				if (routineData) {
					setInitialValues({
						type: routineData.type || "",
						description: routineData.description || "",
					});
				} else {
					toast.current.show({
						severity: "error",
						summary: "Error",
						detail: "Routine not found",
						life: 3000,
					});
				}
			} catch (err) {
				console.error("Error fetching routine data:", err);
				toast.current.show({
					severity: "error",
					summary: "Error",
					detail: "Failed to load routine data",
					life: 3000,
				});
			} finally {
				setLoading(false);
			}
		};

		if (skinTypeRoutineId) {
			fetchData();
		}
	}, [skinTypeRoutineId]);

	const handleSubmit = async (values, { setSubmitting }) => {
		setSubmitting(true);
		try {
			const routineData = {
				type: values.type,
				description: values.description,
			};

			const response = await updateSkincareRoutine(
				skinTypeRoutineId,
				routineData
			); // Use updateSkincareRoutine
			if (response.status === 200) {
				toast.current.show({
					severity: "success",
					summary: "Successful",
					detail: "Routine updated successfully",
					life: 3000,
				});
				console.log("Routine update successful:", response);
				setTimeout(() => {
					navigate("/home/skin-type-routine");
				}, 3000);
			} else {
				toast.current.show({
					severity: "error",
					summary: "Error " + response.status,
					detail: response.status + ": " + response.data.message,
					life: 3000,
				});
				console.error("Routine update failed:", response);
			}
		} catch (err) {
			console.error("Routine update error:", err);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: err.message || "Failed to update routine",
				life: 3000,
			});
		} finally {
			setSubmitting(false);
		}
	};

	const handleClose = () => {
		navigate("/home/skin-type-routine");
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="card px-10 min-h-screen">
			<Toast ref={toast} />
			<h1 className="text-3xl font-bold mb-5">Update Routine</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={routineSchema}
				onSubmit={handleSubmit}
				enableReinitialize // Ensure form reinitializes with fetched data
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
						{/* Routine Type */}
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
										"w-full" + (touched.type && errors.type ? " p-invalid" : "")
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
										"w-full" +
										(touched.description && errors.description
											? " p-invalid"
											: "")
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

export default UpdateRoutine;
