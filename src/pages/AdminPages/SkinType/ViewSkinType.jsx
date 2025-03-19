import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";

import { useEffect, useState, useRef } from "react";
import { getSkinTypes, deleteSkinType } from "../../../api/skinTypeService";
import DeleteSkinType from "./DeleteSkinType";
import TruncateText from "../../../components/GlobalComponents/TruncateText";
import { useNavigate } from "react-router-dom";

function ViewSkinType() {
	const [skinTypes, setSkinTypes] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [selectedSkinTypeId, setSelectedSkinTypeId] = useState(null);
	const navigate = useNavigate();
	const toast = useRef(null);

	const actionBodyTemplate = (rowData) => {
		return (
			<div className="flex gap-2">
				<Button
					label="Update"
					size="small"
					severity="warning"
					onClick={() => handleUpdate(rowData.skinTypeId)}
				/>
				<Button
					label="Delete"
					size="small"
					severity="danger"
					onClick={() => handleDelete(rowData.skinTypeId)}
				/>
			</div>
		);
	};

	const handleUpdate = (skinTypeId) => {
		console.log("Update skin type:", skinTypeId);
		navigate(`/home/skin-type/update/${skinTypeId}`);
	};

	const handleDelete = (skinTypeId) => {
		setSelectedSkinTypeId(skinTypeId);
		setShowDeleteDialog(true);
	};

	const handleDeleteConfirm = async (skinTypeId) => {
		if (!skinTypeId) return;
		try {
			const response = await deleteSkinType(skinTypeId);
			if (response.status === 204) {
				setSkinTypes(
					skinTypes.filter((skinType) => skinType.skinTypeId !== skinTypeId)
				);
				toast.current.show({
					severity: "success",
					summary: "Success",
					detail: "Skin type deleted successfully",
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
				detail: err.message || "Failed to delete skin type",
				life: 3000,
			});
		} finally {
			setShowDeleteDialog(false);
			setSelectedSkinTypeId(null);
		}
	};

	const handleDeleteCancel = () => {
		setShowDeleteDialog(false);
		setSelectedSkinTypeId(null);
	};

	useEffect(() => {
		const fetchSkinTypes = async () => {
			try {
				const data = await getSkinTypes();
				const normalizedSkinTypes = data
					.filter(
						(item) => item && typeof item === "object" && "skinTypeId" in item
					)
					.map((skinType) => ({
						skinTypeId: skinType.skinTypeId,
						skinTypeName: skinType.skinTypeName,
						description: skinType.description,
						routineType: skinType.skinCareRoutine.type,
					}));
				setSkinTypes(normalizedSkinTypes);
			} catch (err) {
				setError("Failed to load Skin Types. Please try again later.");
				console.error("Error fetching Skin Types:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchSkinTypes();
	}, []);

	const footer = `In total there are ${
		skinTypes ? skinTypes.length : 0
	} skin types.`;

	const columns = [
		{
			field: "skinTypeId",
			header: "ID",
			sortable: true,
		},
		{
			field: "skinTypeName",
			header: "Skin Type Name",
			sortable: true,
		},
		{
			field: "routineType",
			header: "Routine Type",
			sortable: true,
		},
		{
			field: "description",
			header: "Description",
			sortable: true,
			body: (rowData) => TruncateText(rowData.description, 50),
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
							Manage Skin Types
						</h1>
						<Button
							label="Create"
							icon="pi pi-plus"
							severity="success"
							rounded
							raised
							className="p-button-md"
							onClick={() => navigate("/home/skin-type/create")}
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
							Manage Skin Types
						</h1>
						<Button
							label="Create"
							icon="pi pi-plus"
							severity="success"
							rounded
							raised
							className="p-button-md"
							onClick={() => navigate("/home/skin-type/create")}
						/>
					</div>
					<div className="dataTable">
						<DataTable
							value={skinTypes}
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
			<DeleteSkinType
				visible={showDeleteDialog}
				onHide={handleDeleteCancel}
				onConfirm={handleDeleteConfirm}
				skinTypeId={selectedSkinTypeId}
			/>
		</div>
	);
}

export default ViewSkinType;
