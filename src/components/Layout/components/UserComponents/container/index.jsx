import { PiList } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import styles from "./Container.module.scss";
import Button from "@mui/material/Button";
import { useState } from "react";

function Container() {
	const [isOpenCategories, setIsOpenCategories] = useState(false);

	return (
		<div className={`${styles.container} `}>
			<div className="flex items-center">
				{/* CATEGORIES */}
				<div className="w-1/4 relative">
					<button
						className="flex flex-row items-center space-x-2 bg-global text-white px-5 py-3 rounded-3xl cursor-pointer hover:brightness-90 transition-all duration-300"
						onClick={() => setIsOpenCategories(!isOpenCategories)}
					>
						<span className="font-bold">
							<PiList />
						</span>
						<span className="text-sm ">ALL CATEGORIES</span>
					</button>
					{/* Sub Categories */}
					<div
						className={`${styles.subCate} ${
							isOpenCategories ? styles.open : ""
						} shadow`}
					>
						<ul>
							<li>
								<Link to="/">
									<Button>High-End Cosmetics</Button>
								</Link>
							</li>
							<li>
								<Link to="/">
									<Button>Facial Care</Button>
								</Link>
							</li>
							<li>
								<Link to="/">
									<Button>Makeup</Button>
								</Link>
							</li>
							<li>
								<Link to="/">
									<Button>Hair and Scalp Care</Button>
								</Link>
							</li>
							<li>
								<Link to="/">
									<Button>Body Care</Button>
								</Link>
							</li>
							<li>
								<Link to="/">
									<Button>Perfume</Button>
								</Link>
							</li>
							<li>
								<Link to="/">
									<Button>Functional Supplements</Button>
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* ITEMS */}
				<div className="w-3/4 flex justify-between pr-10 pl-20">
					<ul className={styles.navbarItems}>
						<li className={styles.navbarItem}>
							<span className="font-bold">
								<IoHomeOutline />
							</span>
							<span className="text-lg font-medium">
								<Link to="/">Home</Link>
							</span>
						</li>
						<li className={styles.navbarItem}>
							<span className="font-bold">
								<IoHomeOutline />
							</span>
							<span className="text-lg font-medium">
								<p>
									<Link to="/">Home</Link>
								</p>
							</span>
						</li>
						<li className={styles.navbarItem}>
							<span className="font-bold">
								<IoHomeOutline />
							</span>
							<span className="text-lg font-medium">
								<Link to="/">Home</Link>
							</span>
						</li>
						<li className={styles.navbarItem}>
							<span className="font-bold">
								<IoHomeOutline />
							</span>
							<span className="text-lg font-medium">
								<Link to="/">Home</Link>
							</span>
						</li>
						<li className={styles.navbarItem}>
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
