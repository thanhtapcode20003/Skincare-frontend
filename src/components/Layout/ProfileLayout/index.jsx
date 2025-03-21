import PropTypes from "prop-types";
import Header from "../components/UserComponents/Header";
import Sidebar from "./Sidebar";
import Footer from "../components/UserComponents/Footer";
import styles from "./ProfileLayout.module.scss";

function ProfileLayout({ children }) {
	return (
		<div>
			<Header />
			<div className={styles.profileContainer}>
				<Sidebar />
				<div className={styles.profileContent}>{children}</div>
			</div>
			<Footer />
		</div>
	);
}

// Add prop-types validation
ProfileLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ProfileLayout;

//Profile Layout including "Header", "Sidebar" and "Content"
