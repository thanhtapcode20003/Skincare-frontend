import PropTypes from "prop-types";
import Topbar from "../../GlobalComponents/Topbar";
import AdminSidebar from "../../GlobalComponents/AdminSidebar";
function AdminLayout({ children }) {
	return (
		<div className="flex h-screen min-h-screen">
			<AdminSidebar />
			<div className="admin-header flex flex-col w-full">
				<Topbar />
				<div className="container">
					<div className="content">{children}</div>
				</div>
			</div>
		</div>
	);
}

export default AdminLayout;

// Add prop-types validation
AdminLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
AdminLayout;
