import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { createCategory } from "../../../api/categoryService";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function CreateCategory() {
	const navigate = useNavigate();
	const toast = useRef(null);

	const initialValues = {
		categoryName: "",
	};

	const categorySchema = yup.object().shape({
		categoryName: yup
			.string()
			.required("Category Name is required")
			.min(3, "Category Name must be at least 3 characters"),
	});

	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		setSubmitting(true);
		try {
			const categoryData = {
				categoryName: values.categoryName,
			};

			const response = await createCategory(categoryData);
			if (response.status === 200) {
				toast.current.show({
					severity: "success",
					summary: "Successful",
					detail: "Category created successfully",
					life: 3000,
				});
				resetForm();
				setTimeout(() => {
					navigate("/home/category");
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
			console.error("Category creation error:", err);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: err.message || "Failed to create category",
				life: 3000,
			});
		} finally {
			setSubmitting(false);
		}
	};

	const handleClose = () => {
		navigate("/home/category");
	};

	return (
		<div className="card px-10 min-h-screen">
			<Toast ref={toast} />
			<h1 className="text-3xl font-bold mb-5">Create New Category</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={categorySchema}
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
						<div className="flex flex-col gap-2 mb-4">
							<label className="text-gray-700 font-medium text-lg">
								Category Name
							</label>
							<InputText
								type="text"
								name="categoryName"
								placeholder="Enter category name"
								value={values.categoryName}
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									"w-full" +
									(touched.categoryName && errors.categoryName
										? " p-invalid"
										: "")
								}
							/>
							<ErrorMessage
								name="categoryName"
								component="small"
								className="p-error"
							/>
						</div>

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

export default CreateCategory;
