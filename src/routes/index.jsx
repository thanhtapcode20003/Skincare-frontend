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
import Checkout from "../pages/UserPages/Checkout";

// Admin Pages
import ViewUser from "../pages/AdminPages/User/ViewUser";
import CreateUser from "../pages/AdminPages/User/CreateUser";
import UpdateUser from "../pages/AdminPages/User/UpdateUser";

import ViewProduct from "../pages/AdminPages/Product/ViewProduct";
import CreateProduct from "../pages/AdminPages/Product/CreateProduct";
import UpdateProduct from "../pages/AdminPages/Product/UpdateProduct";

//------------

// Public Routes
const routes = [
	// User Routes
	{ path: "/", component: Home, layout: HomeLayout },
	{ path: "/profile", component: Profile, layout: ProfileLayout },
	{ path: "/blog", component: Blog },
	{ path: "/product/:productId", component: ProductDetail },
	{ path: "/cart", component: Cart },
	{ path: "/cart/checkout", component: Checkout },

	// Admin Routes
	// User
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
	{
		path: "/user/update/:userId",
		component: UpdateUser,
		layout: AdminLayout,
		Auth: "private",
	},

	// Product
	{
		path: "/product",
		component: ViewProduct,
		layout: AdminLayout,
		Auth: "private",
	},
	{
		path: "/product/create",
		component: CreateProduct,
		layout: AdminLayout,
		Auth: "private",
	},
	{
		path: "/product/update/:productId",
		component: UpdateProduct,
		layout: AdminLayout,
		Auth: "private",
	},
];

export { routes };
