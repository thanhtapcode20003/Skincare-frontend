import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";
import DeleteUser from "./DeleteUser";

import { useEffect, useState, useRef } from "react";
import { getUser, deleteUser } from "../../../api/userService";
import FormatDate from "../../../components/GlobalComponents/FormatDate";
import { useNavigate } from "react-router-dom";

function ViewUser() {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState(null);
	const navigate = useNavigate();
	const toast = useRef(null);

	// Roles
	const getSeverity = (status) => {
		switch (status) {
			case "Manager":
				return "danger";
			case "Customer":
				return "success";
			case "Staff":
				return "info";
			default:
				return "success";
		}
	};

	const rolesTemplate = (rowData) => {
		return (
			<Tag value={rowData.roleName} severity={getSeverity(rowData.roleName)} />
		);
	};

	const actionBodyTemplate = (rowData) => {
		return (
			<div className="flex gap-2">
				<Button
					label="Update"
					size="small"
					severity="warning"
					onClick={() => handleUpdate(rowData.userId)}
				/>
				<Button
					label="Delete"
					size="small"
					severity="danger"
					onClick={() => handleDelete(rowData.userId)}
				/>
			</div>
		);
	};

	const handleUpdate = (userId) => {
		console.log("Update user:", userId);
		navigate(`/home/user/update/${userId}`);
	};

	const handleDelete = (userId) => {
		setSelectedUserId(userId);
		setShowDeleteDialog(true);
	};

	const handleDeleteConfirm = async (userId) => {
		if (!userId) return; // Safety check
		try {
			const response = await deleteUser(userId);
			console.log(response);
			if (response.status === 204) {
				// Remove the deleted user from the state
				console.log(response);

				setUsers(users.filter((user) => user.userId !== userId));
				toast.current.show({
					severity: "success",
					summary: "Success",
					detail: "User deleted successfully",
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
				detail: err.message || "Failed to delete user",
				life: 3000,
			});
		} finally {
			setShowDeleteDialog(false);
			setSelectedUserId(null);
		}
	};

	const handleDeleteCancel = () => {
		setShowDeleteDialog(false);
		setSelectedUserId(null);
	};

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data = await getUser();
				console.log(data);

				const normalizedUsers = data
					.filter(
						(item) => item && typeof item === "object" && "userId" in item
					)
					.map((user) => ({
						userId: user.userId,
						userName: user.userName,
						email: user.email,
						roleId: user.roleId || (user.role && user.role.roleId) || null,
						roleName: user.role?.roleName || "Unknown",
						phoneNumber: user.phoneNumber || null,
						address: user.address || null,
						createAt: user.createAt || null,
					}));
				setUsers(normalizedUsers);
			} catch (err) {
				setError("Failed to load users. Please try again later.");
				console.error("Error fetching users:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	// Table Data
	const footer = `In total there are ${users ? users.length : 0} users.`;

	const columns = [
		{ field: "userId", header: "ID", sortable: true },
		{ field: "userName", header: "Full Name", sortable: true },
		{ field: "email", header: "Email", sortable: true },
		{ field: "address", header: "Address", sortable: true },
		{
			field: "createAt",
			header: "Create At",
			body: (rowData) => FormatDate(rowData.createAt),
			sortable: true,
		},
		{
			field: "roleName",
			header: "Role",
			body: rolesTemplate,
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
			<Toast ref={toast} /> {/* Render Toast in all cases */}
			{loading ? (
				<div>
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-3xl text-900 font-bold m-0">Manage User</h1>
						<Button
							label="Create"
							icon="pi pi-plus"
							severity="success"
							rounded
							raised
							className="p-button-md"
							onClick={() => navigate("/home/user/create")}
						/>
					</div>
					<div className="dataTable">
						<DataTable
							value={Array(5).fill()} // Simulate 5 rows
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
						<h1 className="text-3xl text-900 font-bold m-0">Manage User</h1>
						<Button
							label="Create"
							icon="pi pi-plus"
							severity="success"
							rounded
							raised
							className="p-button-md"
							onClick={() => navigate("/home/user/create")}
						/>
					</div>
					<div className="dataTable">
						<DataTable
							value={users}
							footer={footer}
							tableStyle={{ minWidth: "50rem" }}
							scrollable
							scrollHeight="72vh"
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
			<DeleteUser
				visible={showDeleteDialog}
				onHide={handleDeleteCancel}
				onConfirm={handleDeleteConfirm}
				userId={selectedUserId}
			/>
		</div>
	);
}

export default ViewUser;
