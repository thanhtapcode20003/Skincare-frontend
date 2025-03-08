import styles from "./Home.module.scss";
import { Rating } from "@mui/material";
import { getProducts } from "../../../api/productService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultImg from "../../../images/Default/default.jpg";
import Skeleton from "@mui/material/Skeleton";
// import Stack from "@mui/material/Stack";

function Home() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch products when the component mounts
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
	}, []); // Empty dependency array ensures this runs only once on mount

	// Skeleton placeholder for each product card
	const renderSkeleton = () => (
		<div className={`${styles.productItem}`}>
			<div className={styles.imageContainer}>
				<Skeleton
					variant="rectangular"
					width="100%"
					height="100%"
					sx={{ borderRadius: "8px" }}
				/>
			</div>
			<Skeleton variant="text" sx={{ fontSize: "16px", margin: "8px 0" }} />
			<Skeleton variant="text" sx={{ fontSize: "14px", height: "40px" }} />
			<Skeleton variant="text" sx={{ fontSize: "14px", marginTop: "8px" }} />
		</div>
	);

	if (error) {
		return <div>{error}</div>;
	}
	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.homeProducts}`}>
				{/* Cate */}
				<div className={`${styles.cateName}`}>
					{loading ? (
						<Skeleton
							variant="text"
							sx={{ fontSize: "24px", width: "200px" }}
						/>
					) : (
						<h2>Category Name</h2>
					)}
				</div>
				<div className={`${styles.productGrid}`}>
					{loading
						? // Render 10 Skeleton cards to fill the grid (adjust number as needed)
						  Array.from(new Array(10)).map((_, index) => (
								<div key={index}>{renderSkeleton()}</div>
						  ))
						: // Render actual products when loaded
						  products.map((product) => (
								<Link
									to={`/product/${product.productId}`}
									key={product.productId}
								>
									<div className={`${styles.productItem}`}>
										{/* Product Image with Fixed Height */}
										<div className={styles.imageContainer}>
											<img
												src={product.image ? product.image : defaultImg}
												alt={product.productName}
												className={`${styles.productImg}`}
												onError={(e) => (e.target.src = defaultImg)} // Fallback to defaultImg if the image fails to load
											/>
										</div>
										{/* Product Price */}
										<p className={`${styles.productPrice}`}>
											{product.price} ₫
										</p>
										{/* Product Name with Fixed Height and Truncation */}
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
		</div>
	);
}

export default Home;
