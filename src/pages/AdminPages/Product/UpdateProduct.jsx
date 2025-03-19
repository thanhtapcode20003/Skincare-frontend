import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";

import { getProductById, updateProduct } from "../../../api/productService";
import { getCategories } from "../../../api/categoryService";
import { getSkinTypes } from "../../../api/skinTypeService";
import { getSkincareRoutines } from "../../../api/skincareRoutineService";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function UpdateProduct() {
	const navigate = useNavigate();
	const toast = useRef(null);
	const { productId } = useParams(); // Get productId from URL
	const [loading, setLoading] = useState(true); // Add loading state
	const [categories, setCategories] = useState([]);
	const [skinTypes, setSkinTypes] = useState([]);
	const [routines, setRoutines] = useState([]);
	const [initialValues, setInitialValues] = useState({
		productName: "",
		description: "",
		price: "",
		quantity: "",
		image: "",
		skinType: "",
		category: "",
		routine: "",
	});

	// Validation schema
	const productSchema = yup.object().shape({
		productName: yup
			.string()
			.required("Product Name is required")
			.min(3, "Product Name must be at least 3 characters"),
		description: yup
			.string()
			.required("Description is required")
			.min(3, "Description must be at least 3 characters"),
		price: yup
			.number()
			.typeError("Price must be a number")
			.required("Price is required")
			.min(0, "Price cannot be negative"),
		quantity: yup
			.number()
			.typeError("Quantity must be a number")
			.required("Quantity is required")
			.min(0, "Quantity cannot be negative")
			.integer("Quantity must be an integer"),
		image: yup
			.string()
			.required("Image URL is required")
			.url("Image must be a valid URL"),
		skinType: yup.string().required("Skin Type is required"),
		category: yup.string().required("Category is required"),
		routine: yup.string().required("Routine is required"),
	});

	// Fetch dropdown data and product data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [categoriesData, skinTypesData, routinesData, productData] =
					await Promise.all([
						getCategories(),
						getSkinTypes(),
						getSkincareRoutines(),
						getProductById(productId), // Fetch product data
					]);

				setCategories(categoriesData);
				setSkinTypes(skinTypesData);
				setRoutines(routinesData);

				if (productData) {
					setInitialValues({
						productName: productData.productName || "",
						description: productData.description || "",
						price: productData.price || "",
						quantity: productData.quantity || "",
						image: productData.image || "",
						skinType: productData.skinTypeId || "", // Match with API response
						category: productData.categoryId || "",
						routine: productData.routineId || "",
					});
				} else {
					toast.current.show({
						severity: "error",
						summary: "Error",
						detail: "Product not found",
						life: 3000,
					});
				}
			} catch (err) {
				console.error("Error fetching data:", err);
				toast.current.show({
					severity: "error",
					summary: "Error",
					detail: "Failed to load product data",
					life: 3000,
				});
			} finally {
				setLoading(false);
			}
		};

		if (productId) {
			fetchData();
		}
	}, [productId]);

	const handleSubmit = async (values, { setSubmitting }) => {
		setSubmitting(true);
		try {
			const productData = {
				productName: values.productName,
				description: values.description,
				price: Number(values.price),
				quantity: Number(values.quantity),
				image: values.image,
				skinTypeId: values.skinType,
				categoryId: values.category,
				routineId: values.routine,
			};

			const response = await updateProduct(productId, productData); // Use updateProduct
			if (response.status === 200) {
				toast.current.show({
					severity: "success",
					summary: "Successful",
					detail: "Product updated successfully",
					life: 3000,
				});
				console.log("Product update successful:", response);
				setTimeout(() => {
					navigate("/home/product");
				}, 3000);
			} else {
				toast.current.show({
					severity: "error",
					summary: "Error " + response.status,
					detail: response.status + ": " + response.data.message,
					life: 3000,
				});
				console.error("Product update failed:", response);
			}
		} catch (err) {
			console.error("Product update error:", err);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: err.message || "Failed to update product",
				life: 3000,
			});
		} finally {
			setSubmitting(false);
		}
	};

	const handleClose = () => {
		navigate("/home/product");
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="card px-10 min-h-screen">
			<Toast ref={toast} />
			<h1 className="text-3xl font-bold mb-5">Update Product</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={productSchema}
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
						{/* Name and Category */}
						<div className="flex gap-20 mb-2">
							<div className="flex flex-col gap-2 flex-1">
								<label className="text-gray-700 font-medium text-lg">
									Product Name
								</label>
								<InputText
									type="text"
									name="productName"
									placeholder="Enter product name"
									value={values.productName}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										"w-full" +
										(touched.productName && errors.productName
											? " p-invalid"
											: "")
									}
								/>
								<ErrorMessage
									name="productName"
									component="small"
									className="p-error"
								/>
							</div>
							<div className="flex flex-col gap-2 flex-1">
								<label className="text-gray-700 font-medium text-lg">
									Category
								</label>
								<Dropdown
									name="category"
									value={values.category}
									options={categories}
									optionLabel="categoryName"
									optionValue="categoryId"
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										"w-full" +
										(touched.category && errors.category ? " p-invalid" : "")
									}
									placeholder="Select a Category"
								/>
								<ErrorMessage
									name="category"
									component="small"
									className="p-error"
								/>
							</div>
						</div>

						{/* Skin Type and Routine */}
						<div className="flex gap-20 mb-2">
							<div className="flex flex-col gap-2 flex-1">
								<label className="text-gray-700 font-medium text-lg">
									Skin Type
								</label>
								<Dropdown
									name="skinType"
									value={values.skinType}
									options={skinTypes}
									optionLabel="skinTypeName"
									optionValue="skinTypeId"
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										"w-full" +
										(touched.skinType && errors.skinType ? " p-invalid" : "")
									}
									placeholder="Select a Skin Type"
								/>
								<ErrorMessage
									name="skinType"
									component="small"
									className="p-error"
								/>
							</div>
							<div className="flex flex-col gap-2 flex-1">
								<label className="text-gray-700 font-medium text-lg">
									Routine
								</label>
								<Dropdown
									name="routine"
									value={values.routine}
									options={routines}
									optionLabel="type"
									optionValue="routineId"
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										"w-full" +
										(touched.routine && errors.routine ? " p-invalid" : "")
									}
									placeholder="Select a Routine"
								/>
								<ErrorMessage
									name="routine"
									component="small"
									className="p-error"
								/>
							</div>
						</div>

						{/* Price and Quantity */}
						<div className="flex gap-20 mb-2">
							<div className="flex flex-col gap-2 flex-1">
								<label className="text-gray-700 font-medium text-lg">
									Price
								</label>
								<InputText
									type="number"
									name="price"
									placeholder="Enter price"
									value={values.price}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										"w-full" +
										(touched.price && errors.price ? " p-invalid" : "")
									}
								/>
								<ErrorMessage
									name="price"
									component="small"
									className="p-error"
								/>
							</div>
							<div className="flex flex-col gap-2 flex-1">
								<label className="text-gray-700 font-medium text-lg">
									Quantity
								</label>
								<InputText
									type="number"
									name="quantity"
									placeholder="Enter quantity"
									value={values.quantity}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										"w-full" +
										(touched.quantity && errors.quantity ? " p-invalid" : "")
									}
								/>
								<ErrorMessage
									name="quantity"
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

						{/* Image URL */}
						<div className="mb-2">
							<div className="flex flex-col gap-2">
								<label className="text-gray-700 font-medium text-lg">
									Image URL
								</label>
								<InputText
									type="text"
									name="image"
									placeholder="Enter image URL"
									value={values.image}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										"w-full" +
										(touched.image && errors.image ? " p-invalid" : "")
									}
								/>
								<ErrorMessage
									name="image"
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

export default UpdateProduct;
