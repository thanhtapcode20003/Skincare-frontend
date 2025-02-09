import PropTypes from "prop-types";
import Header from "../components/Header";
import Sidebar from "./Sidebar";
import Footer from "../components/Footer";

function DefaultLayout({ children }) {
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
DefaultLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
export default DefaultLayout;

//Profile Layout including "Header", "Sidebar" and "Content"
