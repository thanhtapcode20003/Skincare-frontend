// Layout
import ProfileLayout from "../components/Layout/ProfileLayout";
import HomeLayout from "../components/Layout/HomeLayout";
import AdminLayout from "../components/Layout/AdminLayout";

// User Pages
import Home from "../pages/UserPages/Home";
import Profile from "../pages/UserPages/Profile";
import Blog from "../pages/UserPages/Blog";
import ProductDetail from "../pages/UserPages/ProductDetail";
import Cart from "../pages/UserPages/Cart";

// Admin Pages
import ViewUser from "../pages/AdminPages/User/ViewUser";
import CreateUser from "../pages/AdminPages/User/CreateUser";

//------------

// Public Routes
const publicRoutes = [
	// User Routes
	{ path: "/", component: Home, layout: HomeLayout },
	{ path: "/profile", component: Profile, layout: ProfileLayout },
	{ path: "/blog", component: Blog },
	{ path: "/product/:productId", component: ProductDetail },
	{ path: "/cart", component: Cart },

	// Admin Routes
	{
		path: "/user",
		component: ViewUser,
		layout: AdminLayout,
		Auth: "private",
	},
	{
		path: "/user/create",
		component: CreateUser,
		layout: AdminLayout,
		Auth: "private",
	},
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
