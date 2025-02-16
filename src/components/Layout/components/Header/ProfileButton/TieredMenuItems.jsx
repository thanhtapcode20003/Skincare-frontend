import { TieredMenu } from "primereact/tieredmenu";
import "primeicons/primeicons.css";

export default function TieredMenuItems() {
	const handleLogout = () => {
		localStorage.removeItem("token"); // Remove authentication token
		window.location.href = "/";
	};
	const items = [
		{
			label: "Your Accounts",
			icon: "pi pi-user",
		},
		{
			label: "Manage Orders",
			icon: "pi pi-book",
		},
		{
			label: "Favorite Products",
			icon: "pi pi-heart",
		},
		{
			label: "Delivery Address",
			icon: "pi pi-map",
		},
		{
			separator: true,
		},
		{
			label: "Logout",
			icon: "pi pi-sign-out",
			command: handleLogout,
		},
	];

	return <TieredMenu model={items} />;
}
