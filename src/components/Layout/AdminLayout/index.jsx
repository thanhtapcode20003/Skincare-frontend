import PropTypes from "prop-types";

export default function AdminLayout({ children }) {
	return (
		<div>
			<div className="main-header">
				{/* <Header /> */}
				{/* <Container /> */}
			</div>
			<div className="container">
				<div className="sidebar"></div>
				<div className="content">{children}</div>
			</div>
			{/* <Footer /> */}
		</div>
	);
}

// Add prop-types validation
AdminLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
AdminLayout;

//Default Layout only have "header", and "container" comprise the "content"
