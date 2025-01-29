// Layout
import { ProfileLayout } from "../components/Layout";

// Pages
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Blog from "../pages/Blog";
import Login from "../components/Layout/components/Login";

//------------

// Public Routes
const publicRoutes = [
	{ path: "/", component: Home },
	{ path: "/profile", component: Profile, layout: ProfileLayout },
	{ path: "/blog", component: Blog },
	{ path: "/login", component: Login },
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
