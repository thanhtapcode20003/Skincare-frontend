import { useState } from "react";
import { useAuth } from "../../../../../../utils/useAuth";
import TieredMenuItems from "./TieredMenuItems";

import { CgProfile } from "react-icons/cg";
import { IoChevronDown } from "react-icons/io5";

export default function ProfileButton() {
	const [isHovered, setIsHovered] = useState(false);
	const { username } = useAuth();

	return (
		<div
			className="relative cursor-pointer"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="profile flex items-center gap-x-2">
				<button>
					<CgProfile className="min-w-10 min-h-9" />
				</button>

				<div className=" flex flex-col text-sm font-normal text-stone-100">
					<span>
						{"Hi, "}
						<span className="font-bold text-white">{username}</span>
					</span>
					<span className="flex items-center">
						Accounts <IoChevronDown className="ml-1 text-sm" />
					</span>
				</div>
			</div>
			{isHovered && (
				<div className="absolute top-10">
					<TieredMenuItems />
				</div>
			)}
		</div>
	);
}
