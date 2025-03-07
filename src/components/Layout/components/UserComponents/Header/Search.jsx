import { FiSearch } from "react-icons/fi";

export default function Search() {
	return (
		<div className="search relative flex items-center w-120">
			<input
				type="text"
				placeholder="Search..."
				className="h-9 bg-white px-3 text-sm text-gray-700 w-full border-none outline-none rounded-full"
			/>
			<button className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-emerald-800 rounded-full cursor-pointer">
				<FiSearch className="text-xl" />
			</button>
		</div>
	);
}
