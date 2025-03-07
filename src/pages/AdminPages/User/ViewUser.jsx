import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUser } from "../../../api/userService";

function ViewUser() {
	const navigate = useNavigate();

	const [users, setUsers] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data = await getUser();
				setUsers(data); // Set the products from the API response
			} catch (err) {
				setError("Failed to load users. Please try again later.");
				console.error("Error fetching users:", err);
			} finally {
				setLoading(false); // Set loading to false whether success or failure
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

	return <div className="wrapper h-400">AdminHome</div>;
}

export default ViewUser;
