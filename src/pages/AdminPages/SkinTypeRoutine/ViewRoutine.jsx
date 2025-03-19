import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";

import { useEffect, useState, useRef } from "react";
import {
	getSkincareRoutines,
	deleteSkincareRoutine,
} from "../../../api/skincareRoutineService";
import { useNavigate } from "react-router-dom";
import TruncateText from "../../../components/GlobalComponents/TruncateText";
import DeleteRoutine from "./DeleteRoutine";

function ViewRoutine() {
	const [routines, setRoutines] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [selectedRoutineId, setSelectedRoutineId] = useState(null);
	const navigate = useNavigate();
	const toast = useRef(null);

	const actionBodyTemplate = (rowData) => {
		return (
			<div className="flex gap-2">
				<Button
					label="Update"
					size="small"
					severity="warning"
					onClick={() => handleUpdate(rowData.routineId)}
				/>
				<Button
					label="Delete"
					size="small"
					severity="danger"
					onClick={() => handleDelete(rowData.routineId)}
				/>
			</div>
		);
	};

	const handleUpdate = (routineId) => {
		console.log("Update routine:", routineId);
		navigate(`/home/skin-type-routine/update/${routineId}`);
	};

	const handleDelete = (routineId) => {
		setSelectedRoutineId(routineId);
		setShowDeleteDialog(true);
	};

	const handleDeleteConfirm = async (routineId) => {
		if (!routineId) return;
		try {
			const response = await deleteSkincareRoutine(routineId);
			if (response.status === 204) {
				setRoutines(
					routines.filter((routine) => routine.routineId !== routineId)
				);
				toast.current.show({
					severity: "success",
					summary: "Success",
					detail: "Routine deleted successfully",
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
				detail: err.message || "Failed to delete routine",
				life: 3000,
			});
		} finally {
			setShowDeleteDialog(false);
			setSelectedRoutineId(null);
		}
	};

	const handleDeleteCancel = () => {
		setShowDeleteDialog(false);
		setSelectedRoutineId(null);
	};

	useEffect(() => {
		const fetchRoutines = async () => {
			try {
				const data = await getSkincareRoutines();
				console.log(data);

				const normalizedRoutines = data
					.filter(
						(item) => item && typeof item === "object" && "routineId" in item
					)
					.map((routine) => ({
						routineId: routine.routineId,
						description: routine.description,
						type: routine.type,
					}));
				setRoutines(normalizedRoutines);
			} catch (err) {
				setError("Failed to load Routines. Please try again later.");
				console.error("Error fetching Routines:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchRoutines();
	}, []);

	// Table Data
	const footer = `In total there are ${
		routines ? routines.length : 0
	} routines.`;

	const columns = [
		{
			field: "routineId",
			header: "ID",
			sortable: true,
		},
		{
			field: "type",
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
						<h1 className="text-3xl text-900 font-bold m-0">Manage Routine</h1>
						<Button
							label="Create"
							icon="pi pi-plus"
							severity="success"
							rounded
							raised
							className="p-button-md"
							onClick={() => navigate("/home/skin-type-routine/create")}
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
						<h1 className="text-3xl text-900 font-bold m-0">Manage Routine</h1>
						<Button
							label="Create"
							icon="pi pi-plus"
							severity="success"
							rounded
							raised
							className="p-button-md"
							onClick={() => navigate("/home/skin-type-routine/create")}
						/>
					</div>
					<div className="dataTable">
						<DataTable
							value={routines}
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
			<DeleteRoutine
				visible={showDeleteDialog}
				onHide={handleDeleteCancel}
				onConfirm={handleDeleteConfirm}
				routineId={selectedRoutineId}
			/>
		</div>
	);
}

export default ViewRoutine;
