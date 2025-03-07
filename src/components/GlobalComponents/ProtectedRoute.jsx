import { Navigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, allowedRoles }) => {
	const { role, isAuthenticated, loading } = useAuth();
	console.log(
		"Role:",
		role,
		"IsAuthenticated:",
		isAuthenticated,
		"Loading:",
		loading
	);

	if (loading) {
		// Show a loading indicator while the auth state is being resolved
		return <div>Loading...</div>;
	}

	if (!isAuthenticated) {
		// Redirect to login if not authenticated
		return <Navigate to="/" replace />;
	}

	if (allowedRoles && !allowedRoles.includes(role)) {
		// Redirect to home if role is not allowed
		return <Navigate to="/" replace />;
	}

	return children;
};

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
	allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
