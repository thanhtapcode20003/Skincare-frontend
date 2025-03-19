import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { getCategoryById, updateCategory } from "../../../api/categoryService";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function UpdateCategory() {
	const navigate = useNavigate();
	const toast = useRef(null);
	const { categoryId } = useParams();
	const [loading, setLoading] = useState(true);
	const [initialValues, setInitialValues] = useState({
		categoryName: "",
	});

	const categorySchema = yup.object().shape({
		categoryName: yup
			.string()
			.required("Category Name is required")
			.min(3, "Category Name must be at least 3 characters"),
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const categoryData = await getCategoryById(categoryId);
				if (categoryData) {
					setInitialValues({
						categoryName: categoryData.categoryName || "",
					});
				} else {
					toast.current.show({
						severity: "error",
						summary: "Error",
						detail: "Category not found",
						life: 3000,
					});
				}
			} catch (err) {
				console.error("Error fetching category data:", err);
				toast.current.show({
					severity: "error",
					summary: "Error",
					detail: "Failed to load category data",
					life: 3000,
				});
			} finally {
				setLoading(false);
			}
		};

		if (categoryId) {
			fetchData();
		}
	}, [categoryId]);

	const handleSubmit = async (values, { setSubmitting }) => {
		setSubmitting(true);
		try {
			const categoryData = {
				categoryName: values.categoryName,
			};

			const response = await updateCategory(categoryId, categoryData);
			if (response.status === 200) {
				toast.current.show({
					severity: "success",
					summary: "Successful",
					detail: "Category updated successfully",
					life: 3000,
				});
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
			console.error("Category update error:", err);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: err.message || "Failed to update category",
				life: 3000,
			});
		} finally {
			setSubmitting(false);
		}
	};

	const handleClose = () => {
		navigate("/home/category");
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="card px-10 min-h-screen">
			<Toast ref={toast} />
			<h1 className="text-3xl font-bold mb-5">Update Category</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={categorySchema}
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

export default UpdateCategory;
