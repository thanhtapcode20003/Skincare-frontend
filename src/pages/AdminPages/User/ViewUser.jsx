import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import { getUser } from "../../../api/userService";

function ViewUser() {
	// const navigate = useNavigate();

	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const actionBodyTemplate = (rowData) => {
		return (
			<div>
				<button onClick={() => handleUpdate(rowData.userId)}>Update</button>
				<button onClick={() => handleDelete(rowData.userId)}>Delete</button>
			</div>
		);
	};

	const handleUpdate = (userId) => {
		// Logic for updating user (e.g., navigate to an edit page)
		console.log("Update user:", userId);
		// navigate(`/edit-user/${userId}`);
	};

	const handleDelete = (userId) => {
		// Logic for deleting user
		console.log("Delete user:", userId);
		// You might want to confirm deletion and then call an API to delete the user
	};

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

	// const statusRowFilterTemplate = (options) => {
	// 	return (
	// 			<Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
	// 	);
	// };

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
						roleName: user.role?.roleName || "Unknown", // Default roleName if not present
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

	if (loading) {
		return <div>Loading products...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	console.log(users);

	return (
		// Manage Users text
		// Button Create
		<div className="card p-6">
			<DataTable value={users} tableStyle={{ minWidth: "50rem" }}>
				<Column field="userId" header="ID"></Column>
				<Column field="userName" header="Full Name"></Column>
				<Column field="email" header="Email"></Column>
				<Column field="address" header="Address"></Column>
				<Column
					field="createAt"
					header="Create At"
					body={(rowData) => formatDate(rowData.createAt)}
				></Column>
				<Column field="roleName" header="Role"></Column>
				<Column body={actionBodyTemplate} header="Actions"></Column>
			</DataTable>
		</div>
	);
}

export default ViewUser;
