import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultImg from "../../../images/Default/default.jpg";
import { getProducts } from "../../../api/productService";
import { getCategories } from "../../../api/categoryService";
import MoneyFormat from "../../../components/GlobalComponents/MoneyFormat";

import { Rating } from "@mui/material";
import { Skeleton } from "primereact/skeleton";

function Home() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch products
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const data = await getProducts();
				setProducts(data); // Set the products from the API response
			} catch (err) {
				setError("Failed to load products. Please try again later.");
				console.error("Error fetching products:", err);
			} finally {
				setLoading(false); // Set loading to false whether success or failure
			}
		};

		fetchProducts();
	}, []);

	// Fetch Category
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const data = await getCategories();
				setCategories(data);
			} catch (err) {
				setError("Failed to load categories. Please try again later.");
				console.error("Error fetching categories:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	// Skeleton placeholder for each product card
	const renderSkeleton = () => (
		<div className={`${styles.productItem}`}>
			<div className={styles.imageContainer}>
				<Skeleton width="100%" height="100%" className="mb-2" />
			</div>
			<Skeleton width="100%" height="16px" className="mb-2" />
			<Skeleton width="100%" height="40px" className="mb-2" />
			<Skeleton width="60%" height="14px" />
		</div>
	);

	if (error) {
		return <div>{error}</div>;
	}

	// console.log(categories);
	// console.log(products);

	return (
		<div className={`${styles.container}`}>
			{loading ? (
				<div className={`${styles.homeProducts}`}>
					<div className={`${styles.cateName}`}>
						<Skeleton width="200px" height="24px" />
					</div>
					<div className={`${styles.productGrid}`}>
						{Array.from(new Array(10)).map((_, index) => (
							<div key={index}>{renderSkeleton()}</div>
						))}
					</div>
				</div>
			) : (
				categories.map((category) => {
					// Filter products that belong to the current category
					const categoryProducts = products.filter(
						(product) => product.category.categoryName === category.categoryName
					);

					// Only render the category section if there are products for this category
					if (categoryProducts.length === 0) return null;

					return (
						<div className={`${styles.homeProducts}`} key={category.categoryId}>
							{/* Category Name */}
							<div className={`${styles.cateName}`}>
								<h2>{category.categoryName}</h2>
							</div>
							{/* Product Grid */}
							<div className={`${styles.productGrid}`}>
								{categoryProducts.map((product) => (
									<Link
										to={`/product/${product.productId}`}
										key={product.productId}
									>
										<div className={`${styles.productItem}`}>
											<div className={styles.imageContainer}>
												<img
													src={product.image ? product.image : defaultImg}
													alt={product.productName}
													className={`${styles.productImg}`}
													onError={(e) => (e.target.src = defaultImg)}
												/>
											</div>
											<p className={`${styles.productPrice}`}>
												{MoneyFormat(product.price)}{" "}
											</p>
											<p className={`${styles.productName}`}>
												{product.productName}
											</p>
											<div className={`${styles.productRating}`}>
												<Rating
													name="size-small"
													precision={1}
													defaultValue={product.ratingFeedback}
													size="small"
													readOnly
												/>
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>
					);
				})
			)}
		</div>
	);
}

export default Home;
