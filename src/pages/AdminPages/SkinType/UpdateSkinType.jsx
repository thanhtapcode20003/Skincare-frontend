import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";

import { getSkinTypeById, updateSkinType } from "../../../api/skinTypeService";
import { getSkincareRoutines } from "../../../api/skincareRoutineService";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function UpdateSkinType() {
	const navigate = useNavigate();
	const toast = useRef(null);
	const { skinTypeId } = useParams();
	const [routines, setRoutines] = useState([]);
	const [initialValues, setInitialValues] = useState({
		skinTypeName: "",
		description: "",
		routineId: "",
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [skinTypeData, routinesData] = await Promise.all([
					getSkinTypeById(skinTypeId),
					getSkincareRoutines(),
				]);
				setInitialValues({
					skinTypeName: skinTypeData.skinTypeName,
					description: skinTypeData.description,
					routineId: skinTypeData.skinCareRoutine.routineId,
				});

				setRoutines(routinesData);
			} catch (err) {
				console.error("Error fetching data:", err);
				toast.current.show({
					severity: "error",
					summary: "Error",
					detail: "Failed to load skin type data",
					life: 3000,
				});
			}
		};

		fetchData();
	}, [skinTypeId]);

	const skinTypeSchema = yup.object().shape({
		skinTypeName: yup
			.string()
			.required("Skin Type Name is required")
			.min(3, "Skin Type Name must be at least 3 characters"),
		description: yup
			.string()
			.required("Description is required")
			.min(3, "Description must be at least 3 characters"),
		routineId: yup.string().required("Routine is required"),
	});

	const handleSubmit = async (values, { setSubmitting }) => {
		setSubmitting(true);
		try {
			const skinTypeData = {
				skinTypeName: values.skinTypeName,
				description: values.description,
				routineId: values.routineId,
			};

			const response = await updateSkinType(skinTypeId, skinTypeData);
			if (response.status === 200) {
				toast.current.show({
					severity: "success",
					summary: "Successful",
					detail: "Skin Type updated successfully",
					life: 3000,
				});
				setTimeout(() => {
					navigate("/home/skin-type");
				}, 3000);
			} else {
				toast.current.show({
					severity: "error",
					summary: "Error",
					detail: response.status + ": " + response.data.message,
					life: 3000,
				});
			}
		} catch (err) {
			console.error("Skin Type update error:", err);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: err.message || "Failed to update skin type",
				life: 3000,
			});
		} finally {
			setSubmitting(false);
		}
	};

	const handleClose = () => {
		navigate("/home/skin-type");
	};

	return (
		<div className="card px-10 min-h-screen">
			<Toast ref={toast} />
			<h1 className="text-3xl font-bold mb-5">Update Skin Type</h1>
			<Formik
				enableReinitialize
				initialValues={initialValues}
				validationSchema={skinTypeSchema}
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
						{/* Skin Type Name */}
						<div className="flex flex-col gap-2 mb-4">
							<label className="text-gray-700 font-medium text-lg">
								Skin Type Name
							</label>
							<InputText
								type="text"
								name="skinTypeName"
								placeholder="Enter skin type name"
								value={values.skinTypeName}
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.skinTypeName && touched.skinTypeName ? "p-invalid" : ""
								}
							/>
							<ErrorMessage
								name="skinTypeName"
								component="small"
								className="p-error"
							/>
						</div>

						{/* Description */}
						<div className="flex flex-col gap-2 mb-4">
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
									errors.description && touched.description ? "p-invalid" : ""
								}
								rows={5}
							/>
							<ErrorMessage
								name="description"
								component="small"
								className="p-error"
							/>
						</div>

						{/* Routine */}
						<div className="flex flex-col gap-2 mb-4">
							<label className="text-gray-700 font-medium text-lg">
								Routine
							</label>
							<Dropdown
								name="routineId"
								value={values.routineId}
								options={routines}
								optionLabel="type"
								optionValue="routineId"
								placeholder="Select a routine"
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.routineId && touched.routineId ? "p-invalid" : ""
								}
							/>
							<ErrorMessage
								name="routineId"
								component="small"
								className="p-error"
							/>
						</div>

						{/* Buttons */}
						<div className="flex justify-between mt-8">
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

export default UpdateSkinType;
