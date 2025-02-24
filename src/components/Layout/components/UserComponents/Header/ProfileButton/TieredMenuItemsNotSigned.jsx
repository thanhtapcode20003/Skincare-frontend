import { TieredMenu } from "primereact/tieredmenu";
import "primeicons/primeicons.css";

export default function TieredMenuItemsNotSigned() {
	const items = [
		{
			label: "Login/Register",
			icon: "pi pi-user",
		},
	];

	return <TieredMenu model={items} />;
}
