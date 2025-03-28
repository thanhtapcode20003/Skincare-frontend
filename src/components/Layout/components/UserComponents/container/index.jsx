import { PiList } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { FaWineBottle } from "react-icons/fa";
import { FaBottleDroplet } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa6";
import { LuContact } from "react-icons/lu";
import Button from "@mui/material/Button";
import { Skeleton } from "primereact/skeleton";

import { Link } from "react-router-dom";
import styles from "./Container.module.scss";
import { useEffect, useState } from "react";
import { getCategories } from "../../../../../api/categoryService";

function Container() {
	const [isOpenCategories, setIsOpenCategories] = useState(false);
	const [categories, setCategories] = useState([]); // State for categories
	const [loading, setLoading] = useState(true); // State for loading
	const [error, setError] = useState(null); // State for error

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
				const data = await getCategories();
				setCategories(data);
			} catch (err) {
				setError("Failed to load categories. Please try again later.");
				console.error("Error fetching categories:", err);
			} finally {
				setLoading(false); // Set loading to false after fetch completes
			}
		};

		fetchCategories();
	}, []);

	return (
		<div className={`${styles.container}`}>
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
						<span className="text-sm">ALL CATEGORIES</span>
					</button>
					{/* Sub Categories */}
					<div
						className={`${styles.subCate} ${
							isOpenCategories ? styles.open : ""
						} shadow`}
					>
						{loading ? (
							<div className="p-4">
								<Skeleton width="100%" height="24px" className="mb-2" />
								<Skeleton width="100%" height="24px" className="mb-2" />
								<Skeleton width="100%" height="24px" />
							</div>
						) : error ? (
							<div className="p-4 text-red-500">{error}</div>
						) : (
							<ul>
								{categories.map((category) => (
									<li key={category.categoryId} className={styles.categoryItem}>
										<Link
											to={`/${category.categoryId}`}
											className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
										>
											<Button
												style={{
													fontWeight: "bold",
													width: "100%",
													justifyContent: "flex-start",
													textTransform: "none",
												}}
											>
												{category.categoryName}
											</Button>
										</Link>
									</li>
								))}
							</ul>
						)}
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
								<FaRegNewspaper />
							</span>
							<span className="text-lg font-medium">
								<Link to="/blog">Blog</Link>
							</span>
						</li>
						<li className={styles.navbarItem}>
							<span className="font-bold">
								<FaWineBottle />
							</span>
							<span className="text-lg font-medium">
								<p>
									<Link to="/CAT001">Cleanser</Link>
								</p>
							</span>
						</li>

						<li className={styles.navbarItem}>
							<span className="font-bold">
								<FaBottleDroplet />
							</span>
							<span className="text-lg font-medium">
								<Link to="/CAT006">Serum</Link>
							</span>
						</li>
						<li className={styles.navbarItem}>
							<span className="font-bold">
								<LuContact />
							</span>
							<span className="text-lg font-medium">
								<Link to="/about">About</Link>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Container;
