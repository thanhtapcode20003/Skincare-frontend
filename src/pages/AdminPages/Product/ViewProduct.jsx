import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";

import { useEffect, useState, useRef } from "react";
import { getProducts, deleteProduct } from "../../../api/productService";
import DeleteProduct from "./DeleteProduct";
import FormatDate from "../../../components/GlobalComponents/FormatDate";
import MoneyFormat from "../../../components/GlobalComponents/MoneyFormat";
import TruncateText from "../../../components/GlobalComponents/TruncateText";
import { useNavigate } from "react-router-dom";

function ViewProduct() {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [selectedProductId, setSelectedProductId] = useState(null);
	const navigate = useNavigate();
	const toast = useRef(null);

	const imgUrl = (rowData) => {
		return <img src={rowData.image} alt={rowData.productName} width="150px" />;
	};

	const actionBodyTemplate = (rowData) => {
		return (
			<div className="flex gap-2">
				<Button
					label="Update"
					size="small"
					severity="warning"
					onClick={() => handleUpdate(rowData.productId)}
				/>
				<Button
					label="Delete"
					size="small"
					severity="danger"
					onClick={() => handleDelete(rowData.productId)}
				/>
			</div>
		);
	};

	const handleUpdate = (productId) => {
		console.log("Update product:", productId);
		navigate(`/product/update/${productId}`);
	};

	const handleDelete = (productId) => {
		setSelectedProductId(productId);
		setShowDeleteDialog(true);
	};

	const handleDeleteConfirm = async (productId) => {
		if (!productId) return;
		try {
			const response = await deleteProduct(productId);
			console.log(response);
			if (response.status === 204) {
				console.log(response);
				setProducts(
					products.filter((product) => product.productId !== productId)
				);
				toast.current.show({
					severity: "success",
					summary: "Success",
					detail: "Product deleted successfully",
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
				detail: err.message || "Failed to delete product",
				life: 3000,
			});
		} finally {
			setShowDeleteDialog(false);
			setSelectedProductId(null);
		}
	};

	const handleDeleteCancel = () => {
		setShowDeleteDialog(false);
		setSelectedProductId(null);
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const data = await getProducts();
				console.log(data);

				const normalizedProducts = data
					.filter(
						(item) => item && typeof item === "object" && "productId" in item
					)
					.map((product) => ({
						productId: product.productId,
						productName: product.productName,
						description: product.description,
						price: product.price,
						quantity: product.quantity,
						image: product.image,
						routine: product.routine.type,
						skinType: product.skinType.skinTypeName,
						category: product.category.categoryName,
						createAt: product.createAt,
					}));
				setProducts(normalizedProducts);
				// console.log(normalizedProducts);
			} catch (err) {
				setError("Failed to load Products. Please try again later.");
				console.error("Error fetching Products:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	// Table Data
	const footer = `In total there are ${
		products ? products.length : 0
	} products.`;

	const columns = [
		{
			field: "productId",
			header: "ID",
			sortable: true,
		},
		{
			field: "productName",
			header: "Product Name",
			sortable: true,
			body: (rowData) => TruncateText(rowData.productName, 30),
		},
		{ field: "category", header: "Category", sortable: true },
		{ field: "skinType", header: "Skin Type", sortable: true },
		{ field: "routine", header: "Routine", sortable: true },
		{
			field: "description",
			header: "Description",
			sortable: true,
			body: (rowData) => TruncateText(rowData.description, 35),
		},
		{
			field: "price",
			header: "Price",
			sortable: true,
			body: (rowData) => MoneyFormat(rowData.price),
		},
		{ field: "quantity", header: "Quantity", sortable: true },
		{ field: "image", header: "Image", body: imgUrl, sortable: false },
		{
			field: "createAt",
			header: "Create At",
			body: (rowData) => FormatDate(rowData.createAt),
			sortable: true,
		},
		{
			header: "Actions",
			body: actionBodyTemplate,
			sortable: false,
		},
	];

	// Skeleton template for loading state
	const skeletonRow = (
		<div className="flex gap-2">
			<Skeleton width="100%" height="2rem" />
			<Skeleton width="100%" height="2rem" />
			<Skeleton width="100%" height="2rem" />
			<Skeleton width="100%" height="2rem" />
			<Skeleton width="100%" height="2rem" />
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
						<h1 className="text-3xl text-900 font-bold m-0">Manage Product</h1>
						<Button
							label="Create"
							icon="pi pi-plus"
							severity="success"
							rounded
							raised
							className="p-button-md"
							onClick={() => navigate("/product/create")}
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
						<h1 className="text-3xl text-900 font-bold m-0">Manage Product</h1>
						<Button
							label="Create"
							icon="pi pi-plus"
							severity="success"
							rounded
							raised
							className="p-button-md"
							onClick={() => navigate("/product/create")}
						/>
					</div>
					<div className="dataTable">
						<DataTable
							value={products}
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
			<DeleteProduct
				visible={showDeleteDialog}
				onHide={handleDeleteCancel}
				onConfirm={handleDeleteConfirm}
				productId={selectedProductId}
			/>
		</div>
	);
}

export default ViewProduct;
