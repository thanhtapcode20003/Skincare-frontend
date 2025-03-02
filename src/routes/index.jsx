// Layout
import ProfileLayout from "../components/Layout/ProfileLayout";
import AdminLayout from "../components/Layout/AdminLayout";

// User Pages
import Home from "../pages/UserPages/Home";
import Profile from "../pages/UserPages/Profile";
import Blog from "../pages/UserPages/Blog";

// Admin Pages
import ViewUser from "../pages/AdminPages/User/ViewUser";

//------------

// Public Routes
const publicRoutes = [
	// User Routes
	{ path: "/", component: Home },
	{ path: "/profile", component: Profile, layout: ProfileLayout },
	{ path: "/blog", component: Blog },

	// Admin Routes
	{
		path: "/home",
		component: ViewUser,
		layout: AdminLayout,
		Auth: "private",
	},
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
