import logo from "../../../../../images/SkinHub.png";
import { Link } from "react-router-dom";

export default function Logo() {
	return (
		<div className="logo-wrapper w-48">
			<Link to={"/"}>
				<img
					src={logo}
					alt="Logo"
					className="h-12 w-40 object-contain z-10" // Fixed height and width, object-fit to prevent overflow
					style={{ maxWidth: "100%", maxHeight: "100%" }} // Additional safety to respect container
				/>
			</Link>
		</div>
	);
}
