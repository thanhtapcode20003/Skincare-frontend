import { Rating } from "@mui/material";
import { Skeleton } from "primereact/skeleton"; // Use PrimeReact Skeleton
import styles from "./ProductDetail.module.scss";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

import QuantityBox from "../../../components/Layout/components/UserComponents/QuantityBox";
import { useEffect, useState } from "react";
import { getProductById } from "../../../api/productService";

import { useParams, Link as RouterLink } from "react-router-dom";

const ProductDetail = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const data = await getProductById(productId);
				setProduct(data);
			} catch (err) {
				setError("Failed to load product details. Please try again later.");
				console.error("Error fetching product:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchProduct();
	}, [productId]);

	const renderSkeleton = () => (
		<div className="flex flex-row mt-2 bg-white shadow-md rounded-lg p-4">
			{/* Image Skeleton */}
			<div className="md:w-5/12 w-full">
				<Skeleton width="100%" height="400px" className="rounded-lg" />
			</div>
			{/* Info Skeleton */}
			<div className="md:w-7/12 w-full px-5">
				{/* Product Name */}
				<Skeleton width="80%" height="2rem" className="mb-2" />
				{/* Rating */}
				<Skeleton width="150px" height="1rem" className="mb-3" />
				{/* Price and Stock */}
				<div className="mt-3 flex flex-row items-center gap-10">
					<Skeleton width="100px" height="1.5rem" />
					<Skeleton width="80px" height="1rem" />
				</div>
				{/* Quantity and Add to Cart */}
				<div className="mt-3 flex flex-row items-center gap-10">
					<Skeleton width="100px" height="40px" />
					<Skeleton width="150px" height="40px" />
				</div>
				{/* Description */}
				<div className="mt-5">
					<Skeleton width="100%" height="1rem" className="mb-2" />
					<Skeleton width="100%" height="1rem" className="mb-2" />
					<Skeleton width="80%" height="1rem" />
				</div>
			</div>
		</div>
	);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (loading) {
		return <div className={styles.container}>{renderSkeleton()}</div>;
	}

	if (error) {
		return <div className={styles.container}>{error}</div>;
	}

	if (!product) {
		return <div className={styles.container}>Product not found.</div>;
	}

	console.log(product);

	return (
		<div className={styles.container}>
			{/* Breadcrumb */}
			<div className={styles.breadcrumb}>
				<RouterLink to="/">Home</RouterLink> {">"}{" "}
				<span>{product.category.categoryName || "CategoryName"}</span> {">"}{" "}
				<span>{product.productName}</span>
			</div>
			<div className="flex flex-row mt-2 bg-white shadow-md rounded-lg p-4">
				{/* Img */}
				<div className="md:w-5/12 w-full">
					<div className="productZoom">
						<div className="productImg">
							<InnerImageZoom
								zoomType="hover"
								className="w-full h-auto object-cover"
								zoomScale={1}
								src={product.image}
							/>
						</div>
					</div>
				</div>

				{/* Info */}
				<div className="md:w-7/12 w-full px-5">
					<div className="productName">
						<h1 className="capitalize">{product.productName}</h1>
					</div>
					<div className="flex flex-row items-center gap-1">
						<Rating
							name="size-small"
							precision={0.5}
							defaultValue={product.ratingFeedback || 0}
							size="small"
							readOnly
						/>
						<span>0 ratings</span>
						{/* Hardcoded value */}
					</div>
					<div className="mt-3 flex flex-row items-center gap-10">
						<span className={styles.productPrice}>{product.price} đ</span>
						<span className="bg-green-100 text-green-500 text-sm font-medium me-2 px-3 py-1 rounded-2xl">
							IN STOCK
						</span>
					</div>
					<div className="mt-3 flex flex-row items-center gap-10">
						<QuantityBox />
						<button className={styles.addButton}>Add to Cart</button>
					</div>

					<div className="productDescription mt-5">
						<p>{product.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
