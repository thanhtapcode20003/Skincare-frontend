import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import styles from "./CategoryPage.module.scss";
import MoneyFormat from "../../../components/GlobalComponents/MoneyFormat";
import { getProducts } from "../../../api/productService";
import { getCategories } from "../../../api/categoryService";

function CategoryPage() {
	const { categoryId } = useParams();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [categoryName, setCategoryName] = useState("");
	const defaultImg =
		"https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";

	const renderSkeleton = () => (
		<>
			<div className={styles.categoryHeader}>
				<Skeleton width="200px" height="32px" className="mb-2" />
				<Skeleton width="150px" height="16px" />
			</div>
			<div className={styles.productGrid}>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
					<div key={item} className={styles.productItem}>
						<div className={styles.imageContainer}>
							<Skeleton width="100%" height="200px" />
						</div>
						<Skeleton width="100px" height="24px" className="ml-2 mt-2" />
						<Skeleton width="90%" height="35px" className="mx-2 mt-2" />
						<Skeleton width="120px" height="24px" className="ml-2 mt-1" />
					</div>
				))}
			</div>
		</>
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				// Simulate loading delay
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// Fetch all products and categories
				const [productsData, categoriesData] = await Promise.all([
					getProducts(),
					getCategories(),
				]);

				// Find the category by ID
				const categoryInfo = categoriesData.find(
					(cat) => cat.categoryId === categoryId
				);
				if (categoryInfo) {
					setCategoryName(categoryInfo.categoryName);
				}

				// Filter products by category ID
				const filteredProducts = productsData.filter(
					(product) => product.categoryId === categoryId
				);
				setProducts(filteredProducts);
			} catch (err) {
				setError("Failed to load products. Please try again later.");
				console.error("Error fetching data:", err);
			} finally {
				setLoading(false);
			}
		};

		if (categoryId) {
			fetchData();
		}
	}, [categoryId]);

	if (loading) {
		return <div className={styles.container}>{renderSkeleton()}</div>;
	}

	if (error) {
		return <div className="text-center text-red-500 mt-4">{error}</div>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.categoryHeader}>
				<h1>{categoryName}</h1>
				<p>{products.length} products found</p>
			</div>

			<div className={styles.productGrid}>
				{products.map((product) => (
					<Link
						to={`/${product.category.categoryId}/${product.productId}`}
						key={product.productId}
						className={styles.productItem}
					>
						<div className={styles.imageContainer}>
							<img
								src={product.image || defaultImg}
								alt={product.productName}
								className={styles.productImg}
								onError={(e) => (e.target.src = defaultImg)}
							/>
						</div>
						<p className={styles.productPrice}>{MoneyFormat(product.price)}</p>
						<p className={styles.productName}>{product.productName}</p>
						<div className={styles.productRating}>
							<Rating
								name="size-small"
								precision={1}
								defaultValue={product.ratingFeedback || 0}
								size="small"
								readOnly
							/>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default CategoryPage;
