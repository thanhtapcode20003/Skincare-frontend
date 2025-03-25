// Layout
import ProfileLayout from "../components/Layout/ProfileLayout";
import HomeLayout from "../components/Layout/HomeLayout";
import AdminLayout from "../components/Layout/AdminLayout";

// User Pages
import Home from "../pages/UserPages/Home";
import Profile from "../pages/UserPages/Profile";
import EditProfile from "../pages/UserPages/Profile/EditProfile";
import Blog from "../pages/UserPages/Blog";
import About from "../components/Layout/components/UserComponents/About";
import ProductDetail from "../pages/UserPages/ProductDetail";
import Cart from "../pages/UserPages/Cart";
import Checkout from "../pages/UserPages/Checkout";
import CategoryPage from "../pages/UserPages/CategoryPage";
import PaymentResult from "../pages/UserPages/PaymentResult";
import Orders from "../pages/UserPages/Orders";

// Admin Pages
import ViewUser from "../pages/AdminPages/User/ViewUser";
import CreateUser from "../pages/AdminPages/User/CreateUser";
import UpdateUser from "../pages/AdminPages/User/UpdateUser";

import ViewProduct from "../pages/AdminPages/Product/ViewProduct";
import CreateProduct from "../pages/AdminPages/Product/CreateProduct";
import UpdateProduct from "../pages/AdminPages/Product/UpdateProduct";

import ViewCategory from "../pages/AdminPages/Category/ViewCategory";
import CreateCategory from "../pages/AdminPages/Category/CreateCategory";
import UpdateCategory from "../pages/AdminPages/Category/UpdateCategory";

import ViewSkinType from "../pages/AdminPages/SkinType/ViewSkinType";
import CreateSkinType from "../pages/AdminPages/SkinType/CreateSkinType";
import UpdateSkinType from "../pages/AdminPages/SkinType/UpdateSkinType";

import ViewRoutine from "../pages/AdminPages/SkinTypeRoutine/ViewRoutine";
import CreateRoutine from "../pages/AdminPages/SkinTypeRoutine/CreateRoutine";
import UpdateRoutine from "../pages/AdminPages/SkinTypeRoutine/UpdateRoutine";

import ViewBlog from "../pages/AdminPages/Blog/ViewBlog";
import CreateBlog from "../pages/AdminPages/Blog/CreateBlog";
import UpdateBlog from "../pages/AdminPages/Blog/UpdateBlog";

//------------

// --------------------------------------------------Public Routes------------------------------------------------------
const routes = [
	// User Routes
	{ path: "/", component: Home, layout: HomeLayout },
	{ path: "/profile", component: Profile, layout: ProfileLayout },
	{
		path: "/profile/edit",
		component: EditProfile,
		layout: ProfileLayout,
	},
	{ path: "/blog", component: Blog },
	{ path: "/about", component: About },
	{ path: "/:categoryId/:productId", component: ProductDetail },
	{ path: "/cart", component: Cart },
	{ path: "/cart/checkout", component: Checkout },
	{ path: "/:categoryId", component: CategoryPage },
	{ path: "/payment/result", component: PaymentResult },
	{ path: "/orders", component: Orders, layout: ProfileLayout },

	// ------------------------------------------------Admin Routes-------------------------------------------------------
	// User
	{
		path: "/home/user",
		component: ViewUser,
		layout: AdminLayout,
		Auth: "private",
	},
	{
		path: "/home/user/create",
		component: CreateUser,
		layout: AdminLayout,
		Auth: "private",
	},
	{
		path: "/home/user/update/:userId",
		component: UpdateUser,
		layout: AdminLayout,
		Auth: "private",
	},

	// Product
	{
		path: "/home/product",
		component: ViewProduct,
		layout: AdminLayout,
		Auth: "private",
	},
	{
		path: "/home/product/create",
		component: CreateProduct,
		layout: AdminLayout,
		Auth: "private",
	},
	{
		path: "/home/product/update/:productId",
		component: UpdateProduct,
		layout: AdminLayout,
		Auth: "private",
	},

	// Category
	{
		path: "/home/category",
		component: ViewCategory,
		layout: AdminLayout,
		Auth: "private",
	},
	{
		path: "/home/category/create",
		component: CreateCategory,
		layout: AdminLayout,
		Auth: "private",
	},
	{
		path: "/home/category/update/:categoryId",
		component: UpdateCategory,
		layout: AdminLayout,
		Auth: "private",
	},

	// SkinType
	{
		path: "/home/skin-type",
		component: ViewSkinType,
		layout: AdminLayout,
		Auth: "private",
	},
	{
		path: "/home/skin-type/create",
		component: CreateSkinType,
		layout: AdminLayout,
		Auth: "private",
	},
	{
		path: "/home/skin-type/update/:skinTypeId",
		component: UpdateSkinType,
		layout: AdminLayout,
		Auth: "private",
	},

	// SkinTypeRoutine
	{
		path: "/home/skin-type-routine",
		component: ViewRoutine,
		layout: AdminLayout,
		Auth: "private",
	},
	{
		path: "/home/skin-type-routine/create",
		component: CreateRoutine,
		layout: AdminLayout,
		Auth: "private",
	},
	{
		path: "/home/skin-type-routine/update/:skinTypeRoutineId",
		component: UpdateRoutine,
		layout: AdminLayout,
		Auth: "private",
	},

	// Blog
	{
		path: "/home/blog",
		component: ViewBlog,
		layout: AdminLayout,
		Auth: "private",
	},
	{
		path: "/home/blog/create",
		component: CreateBlog,
		layout: AdminLayout,
		Auth: "private",
	},
	{
		path: "/home/blog/update/:blogId",
		component: UpdateBlog,
		layout: AdminLayout,
		Auth: "private",
	},
];

export { routes };
