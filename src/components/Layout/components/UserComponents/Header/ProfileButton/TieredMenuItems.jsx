import { TieredMenu } from "primereact/tieredmenu";
import { useAuth } from "../../../../../../utils/useAuth";
import { useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";

export default function TieredMenuItems() {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const items = [
		{
			label: "Your Accounts",
			icon: "pi pi-user",
			command: () => navigate("/profile"),
		},
		{
			label: "Manage Orders",
			icon: "pi pi-shopping-bag",
			command: () => navigate("/orders"),
		},
		{
			label: "Delivery Address",
			icon: "pi pi-map",
			command: () => navigate("/profile"),
		},
		{
			separator: true,
		},
		{
			label: "Logout",
			icon: "pi pi-sign-out",
			command: logout,
		},
	];

	return <TieredMenu model={items} />;
}
