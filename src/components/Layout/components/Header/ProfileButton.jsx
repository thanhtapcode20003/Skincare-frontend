import { CgProfile } from "react-icons/cg";
import { IoChevronDown } from "react-icons/io5";

export default function ProfileButton() {
	return (
		<div className="profile flex items-center gap-x-2">
			<button>
				<CgProfile className="min-w-10 min-h-9" />
			</button>

			<div className=" flex flex-col text-md font-normal text-stone-100">
				<span>Login/Register</span>
				<span className="flex items-center">
					Accounts <IoChevronDown className="ml-1 text-sm" />
				</span>
			</div>
			{/* "Accounts" with caret-down icon */}
			<div className="flex items-center text-xs text-gray-200 mt-1 cursor-pointer"></div>
		</div>
	);
}
