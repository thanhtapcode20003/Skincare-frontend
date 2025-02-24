import PropTypes from "prop-types";
import Header from "../components/UserComponents/Header";
import Sidebar from "./Sidebar";
import Footer from "../components/UserComponents/Footer";

function ProfileLayout({ children }) {
	return (
		<div>
			<Header />
			<div className="container">
				<Sidebar />
				<div className="content">{children}</div>
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
