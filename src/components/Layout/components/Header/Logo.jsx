import logo from "../../../../images/Logo/logo.svg";
import { Link } from "react-router-dom";

export default function Logo() {
	return (
		<div className="logo-wrapper w-48">
			<Link to={"/"}>
				<img src={logo} alt="Logo" />
			</Link>
		</div>
	);
}
