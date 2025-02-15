// Layout
import { ProfileLayout } from "../components/Layout";

// Pages
import Home from "../pages/UserPages/Home";
import Profile from "../pages/UserPages/Profile";
import Blog from "../pages/UserPages/Blog";

//------------

// Public Routes
const publicRoutes = [
	{ path: "/", component: Home },
	{ path: "/profile", component: Profile, layout: ProfileLayout },
	{ path: "/blog", component: Blog },
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
