import { Rating } from "@mui/material";
import styles from "./ProductDetail.module.scss";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

import QuantityBox from "../../../components/Layout/components/UserComponents/QuantityBox";
import { useEffect, useState } from "react";
import { getProductById } from "../../../api/productService";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
	const { productId } = useParams(); // Get productId from the URL
	const [product, setProduct] = useState(null); // State to store the product
	const [loading, setLoading] = useState(true); // State for loading status
	const [error, setError] = useState(null); // State for error handling

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const data = await getProductById(productId);
				setProduct(data); // Set the product from the API response
			} catch (err) {
				setError("Failed to load product details. Please try again later.");
				console.error("Error fetching product:", err);
			} finally {
				setLoading(false); // Set loading to false whether success or failure
			}
		};
		fetchProduct();
	}, [productId]);

	if (loading) {
		return <div>Loading product details...</div>; // Show loading state while fetching
	}

	if (error) {
		return <div>{error}</div>; // Show error message if fetching fails
	}

	if (!product) {
		return <div>Product not found.</div>; // Handle case where product is null
	}

	return (
		<div className={styles.container}>
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
						<span>25 ratings</span>
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
