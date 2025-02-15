import { PiList } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";

function Container() {
	return (
		<div className="container mt-18 px-40">
			<div className="flex items-start justify-between">
				{/* CATEGORIES */}
				<div className="w-1/5">
					<button className="flex flex-row items-center space-x-2 bg-global text-white px-5 py-3 rounded-3xl cursor-pointer hover:brightness-90 transition-all duration-300">
						<span className="font-bold">
							<PiList />
						</span>
						<span className="text-sm ">ALL CATEGORIES</span>
					</button>
				</div>

				{/* ITEMS */}
				<div className="w-4/5 pt-3 pr-10 flex justify-end">
					<ul className="navbarItems flex flex-row justify-between content-center space-x-20">
						<li className="navbarItem flex space-x-2">
							<span className="font-bold">
								<IoHomeOutline />
							</span>
							<span className="text-sm ">HOME</span>
						</li>
						<li className="navbarItem">BLOG</li>
						<li className="navbarItem">BLOG</li>
						<li className="navbarItem">BLOG</li>
						<li className="navbarItem">BLOG</li>
						<li className="navbarItem">CONTACT</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Container;
