import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useAuth } from "../../../../utils/useAuth";
import styles from "./Sidebar.module.scss";

function Sidebar() {
	const navigate = useNavigate();
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<div className={styles.sidebar}>
			<h2 className={styles.sidebarTitle}>My Account</h2>

			<ul className={styles.sidebarMenu}>
				<li>
					<NavLink
						to="/profile"
						className={({ isActive }) =>
							isActive ? styles.activeLink : styles.menuLink
						}
					>
						<i className="pi pi-user"></i>
						Account
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/orders"
						className={({ isActive }) =>
							isActive ? styles.activeLink : styles.menuLink
						}
					>
						<i className="pi pi-shopping-bag"></i>
						My Orders
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/profile/addresses"
						className={({ isActive }) =>
							isActive ? styles.activeLink : styles.menuLink
						}
					>
						<i className="pi pi-map-marker"></i>
						Addresses
					</NavLink>
				</li>
			</ul>

			<div className={styles.sidebarFooter}>
				<Button
					label="Logout"
					icon="pi pi-sign-out"
					severity="secondary"
					onClick={handleLogout}
					className={styles.logoutButton}
				/>
			</div>
		</div>
	);
}

export default Sidebar;
