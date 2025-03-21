import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.scss";

function Profile() {
	const navigate = useNavigate();

	return (
		<div className={styles.profileContainer}>
			<h1 className={styles.profileTitle}>My Account</h1>

			<div className={styles.profileActions}>
				<div className={styles.actionCard}>
					<i className="pi pi-shopping-bag" style={{ fontSize: "2rem" }}></i>
					<h3>My Orders</h3>
					<p>View your order history and track current orders</p>
					<Button
						label="View Orders"
						className={styles.actionButton}
						onClick={() => navigate("/orders")}
					/>
				</div>

				<div className={styles.actionCard}>
					<i className="pi pi-user-edit" style={{ fontSize: "2rem" }}></i>
					<h3>Account Details</h3>
					<p>Update your personal information and password</p>
					<Button
						label="Edit Profile"
						className={styles.actionButton}
						onClick={() => {}}
					/>
				</div>

				<div className={styles.actionCard}>
					<i className="pi pi-map-marker" style={{ fontSize: "2rem" }}></i>
					<h3>Addresses</h3>
					<p>Change your address</p>
					<Button
						label="Edit Addresses"
						className={styles.actionButton}
						onClick={() => {}}
					/>
				</div>
			</div>
		</div>
	);
}

export default Profile;
