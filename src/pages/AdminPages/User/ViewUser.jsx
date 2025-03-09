import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";

import { useEffect, useState } from "react";
import { getUser } from "../../../api/userService";
import { useNavigate } from "react-router-dom";

function ViewUser() {
	// const navigate = useNavigate();

	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	// Custom function to format the createAt date
	const formatDate = (dateString) => {
		if (!dateString) return "N/A";
		const date = new Date(dateString);
		if (isNaN(date.getTime())) return "Invalid Date";
		return date.toLocaleString("en-US", {
			month: "long",
			day: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});
	};

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
		// navigate(`/edit-user/${userId}`);
	};

	const handleDelete = (userId) => {
		console.log("Delete user:", userId);
	};

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data = await getUser();
				// Normalize the data: Flatten and standardize the structure
				const normalizedUsers = data
					.filter(
						(item) => item && typeof item === "object" && "userId" in item
					) // Filter out invalid entries
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
			body: (rowData) => formatDate(rowData.createAt),
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

	if (loading) {
		return <div>Loading products...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	console.log(users);

	return (
		<div className="px-5">
			<div className="flex items-center justify-between mb-4">
				<h1 className="text-3xl text-900 font-bold m-0">Manage User</h1>
				<Button
					label="Create"
					icon="pi pi-plus"
					severity="success"
					rounded
					raised
					className="p-button-md"
					onClick={() => navigate("/user/create")}
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
	);
}

export default ViewUser;
