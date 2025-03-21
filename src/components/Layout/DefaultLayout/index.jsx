import PropTypes from "prop-types";
import Header from "../components/UserComponents/Header";
import Container from "../components/UserComponents/container";
import Footer from "../components/UserComponents/Footer";

function DefaultLayout({ children }) {
	return (
		<div>
			<div className="main-header">
				<Header />
				<Container />
			</div>
			<div className="container">
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

//Default Layout only have "header", and "container" comprise the "content"
