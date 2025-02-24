import { CgProfile } from "react-icons/cg";
import PropTypes from "prop-types";

export default function ProfileButtonNotSigned({ onClick }) {
	return (
		<div className="relative cursor-pointer" onClick={onClick}>
			<div className="profile flex items-center gap-x-2">
				<button className="cursor-pointer">
					<CgProfile className="min-w-10 min-h-9" />
				</button>

				<div className="flex flex-col text-sm font-normal text-stone-100">
					<span>Login/Register</span>
					<span className="flex items-center">Accounts</span>
				</div>
			</div>
		</div>
	);
}

ProfileButtonNotSigned.propTypes = {
	onClick: PropTypes.func.isRequired, // Fixed prop validation
};
