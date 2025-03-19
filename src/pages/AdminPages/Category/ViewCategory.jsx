import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";

import { useEffect, useState, useRef } from "react";
import { getCategories, deleteCategory } from "../../../api/categoryService";
import DeleteCategory from "./DeleteCategory";
import { useNavigate } from "react-router-dom";

function ViewCategory() {
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);
	const navigate = useNavigate();
	const toast = useRef(null);

	const actionBodyTemplate = (rowData) => {
		return (
			<div className="flex gap-2">
				<Button
					label="Update"
					size="small"
					severity="warning"
					onClick={() => handleUpdate(rowData.categoryId)}
				/>
				<Button
					label="Delete"
					size="small"
					severity="danger"
					onClick={() => handleDelete(rowData.categoryId)}
				/>
			</div>
		);
	};

	const handleUpdate = (categoryId) => {
		navigate(`/home/category/update/${categoryId}`);
	};

	const handleDelete = (categoryId) => {
		setSelectedCategoryId(categoryId);
		setShowDeleteDialog(true);
	};

	const handleDeleteConfirm = async (categoryId) => {
		if (!categoryId) return;
		try {
			const response = await deleteCategory(categoryId);
			if (response.status === 204) {
				setCategories(
					categories.filter((category) => category.categoryId !== categoryId)
				);
				toast.current.show({
					severity: "success",
					summary: "Success",
					detail: "Category deleted successfully",
					life: 3000,
				});
			} else {
				toast.current.show({
					severity: "error",
					summary: "Error",
					detail: response.status + ": " + response.data.message,
					life: 3000,
				});
			}
		} catch (err) {
			console.error("Delete error:", err);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: err.message || "Failed to delete category",
				life: 3000,
			});
		} finally {
			setShowDeleteDialog(false);
			setSelectedCategoryId(null);
		}
	};

	const handleDeleteCancel = () => {
		setShowDeleteDialog(false);
		setSelectedCategoryId(null);
	};

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const data = await getCategories();
				const normalizedCategories = data
					.filter(
						(item) => item && typeof item === "object" && "categoryId" in item
					)
					.map((category) => ({
						categoryId: category.categoryId,
						categoryName: category.categoryName,
					}));
				setCategories(normalizedCategories);
			} catch (err) {
				setError("Failed to load Categories. Please try again later.");
				console.error("Error fetching Categories:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	const footer = `In total there are ${
		categories ? categories.length : 0
	} categories.`;

	const columns = [
		{
			field: "categoryId",
			header: "ID",
			sortable: true,
		},
		{
			field: "categoryName",
			header: "Category Name",
			sortable: true,
		},
		{
			header: "Actions",
			body: actionBodyTemplate,
			sortable: false,
			alignHeader: "right",
			align: "right",
		},
	];

	const skeletonRow = (
		<div className="flex gap-2">
			<Skeleton width="100%" height="2rem" />
			<div className="flex gap-2">
				<Skeleton width="4rem" height="2rem" />
				<Skeleton width="4rem" height="2rem" />
			</div>
		</div>
	);

	return (
		<div className="px-5">
			<Toast ref={toast} />
			{loading ? (
				<div>
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-3xl text-900 font-bold m-0">
							Manage Categories
						</h1>
						<Button
							label="Create"
							icon="pi pi-plus"
							severity="success"
							rounded
							raised
							className="p-button-md"
							onClick={() => navigate("/home/category/create")}
						/>
					</div>
					<div className="dataTable">
						<DataTable
							value={Array(5).fill()}
							tableStyle={{ minWidth: "50rem" }}
							scrollable
							scrollHeight="72vh"
						>
							{columns.map((col, i) => (
								<Column
									key={col.field || i}
									header={col.header}
									body={() =>
										col.field === "Actions" ? (
											skeletonRow
										) : (
											<Skeleton width="100%" height="2rem" />
										)
									}
								/>
							))}
						</DataTable>
					</div>
				</div>
			) : error ? (
				<div>{error}</div>
			) : (
				<div>
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-3xl text-900 font-bold m-0">
							Manage Categories
						</h1>
						<Button
							label="Create"
							icon="pi pi-plus"
							severity="success"
							rounded
							raised
							className="p-button-md"
							onClick={() => navigate("/home/category/create")}
						/>
					</div>
					<div className="dataTable">
						<DataTable
							value={categories}
							footer={footer}
							tableStyle={{ minWidth: "50rem" }}
							scrollable
							scrollHeight="75vh"
							size="small"
						>
							{columns.map((col, i) => (
								<Column
									key={col.field || i}
									field={col.field}
									header={col.header}
									body={col.body}
									sortable={col.sortable}
								/>
							))}
						</DataTable>
					</div>
				</div>
			)}
			<DeleteCategory
				visible={showDeleteDialog}
				onHide={handleDeleteCancel}
				onConfirm={handleDeleteConfirm}
				categoryId={selectedCategoryId}
			/>
		</div>
	);
}

export default ViewCategory;
