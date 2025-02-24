import { PiList } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import styles from "./Container.module.scss";

function Container() {
	return (
		<div className="container mt-18 px-40">
			<div className="flex items-center">
				{/* CATEGORIES */}
				<div className="w-1/4">
					<button className="flex flex-row items-center space-x-2 bg-global text-white px-5 py-3 rounded-3xl cursor-pointer hover:brightness-90 transition-all duration-300">
						<span className="font-bold">
							<PiList />
						</span>
						<span className="text-sm ">ALL CATEGORIES</span>
					</button>
				</div>

				{/* ITEMS */}
				<div className="w-3/4 flex justify-between pr-10 pl-20">
					<ul
						className={`${styles.navbarItems} w-full flex flex-row justify-between content-center space-x-20`}
					>
						<li className="navbarItem flex items-center space-x-2">
							<span className="font-bold">
								<IoHomeOutline />
							</span>
							<span className="text-lg font-medium">
								<Link to="/">Home</Link>
							</span>
						</li>
						<li className="navbarItem flex items-center space-x-2">
							<span className="font-bold">
								<IoHomeOutline />
							</span>
							<span className="text-lg font-medium">
								<Link to="/">Home</Link>
							</span>
						</li>
						<li className="navbarItem flex items-center space-x-2">
							<span className="font-bold">
								<IoHomeOutline />
							</span>
							<span className="text-lg font-medium">
								<Link to="/">Home</Link>
							</span>
						</li>
						<li className="navbarItem flex items-center space-x-2">
							<span className="font-bold">
								<IoHomeOutline />
							</span>
							<span className="text-lg font-medium">
								<Link to="/">Home</Link>
							</span>
						</li>
						<li className="navbarItem flex items-center space-x-2">
							<span className="font-bold">
								<IoHomeOutline />
							</span>
							<span className="text-lg font-medium">
								<Link to="/">Home</Link>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Container;
