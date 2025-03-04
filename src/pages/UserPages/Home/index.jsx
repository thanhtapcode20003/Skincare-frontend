import styles from "./Home.module.scss";
import { Rating } from "@mui/material";
import { getProducts } from "../../../api/productService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch products when the component mounts
	useEffect(() => {
		const fetchProducts = async () => {
			try {
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

	if (loading) {
		return <div>Loading products...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	// 	{
	// 		id: 1,
	// 		name: "Kem Chống Nắng La Roche-Posay",
	// 		price: "100.000 đ",
	// 		discount: "$79.99",
	// 		img: "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-kem-chong-nang-la-roche-posay-kiem-soat-dau-spf50-50ml_GcC5XxafnFua2eRB.png",
	// 	},
	// 	{
	// 		id: 2,
	// 		name: "Kem Chống Nắng La Roche-Posay",
	// 		price: "100.000 ₫",
	// 		discount: "$29.00",
	// 		img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
	// 	},
	// 	{
	// 		id: 3,
	// 		name: "Kem Chống Nắng La Roche-Posay",
	// 		price: "100.000 ₫",
	// 		discount: "$20.00",
	// 		img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
	// 	},
	// 	{
	// 		id: 4,
	// 		name: "Kem Chống Nắng La Roche-Posay",
	// 		price: "100.000 ₫",
	// 		discount: "$9.35",
	// 		img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
	// 	},
	// 	{
	// 		id: 5,
	// 		name: "Kem Chống Nắng La Roche-Posay",
	// 		price: "100.000 ₫",
	// 		discount: "$9.35",
	// 		img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
	// 	},
	// 	{
	// 		id: 6,
	// 		name: "Kem Chống Nắng La Roche-Posay",
	// 		price: "100.000 ₫",
	// 		discount: "$9.35",
	// 		img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
	// 	},
	// 	{
	// 		id: 7,
	// 		name: "Kem Chống Nắng La Roche-Posay",
	// 		price: "100.000 ₫",
	// 		discount: "$9.35",
	// 		img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
	// 	},
	// 	{
	// 		id: 8,
	// 		name: "Kem Chống Nắng La Roche-Posay",
	// 		price: "100.000 ₫",
	// 		discount: "$9.35",
	// 		img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
	// 	},
	// 	{
	// 		id: 9,
	// 		name: "Kem Chống Nắng La Roche-Posay",
	// 		price: "100.000 ₫",
	// 		discount: "$9.35",
	// 		img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
	// 	},
	// 	{
	// 		id: 10,
	// 		name: "Kem Chống Nắng La Roche-Posay",
	// 		price: "100.000 ₫",
	// 		discount: "$9.35",
	// 		img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
	// 	},
	// ];

	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.homeProducts}`}>
				{/* Cate */}
				<div className={`${styles.cateName}`}>
					<h2>Sữa rửa mặt</h2>
				</div>
				<div className={`${styles.productGrid} grid grid-cols-5 gap-6`}>
					{products.map((product) => (
						<Link to={`/product/${product.productId}`} key={product.productId}>
							<div
								key={product.productId}
								className={`${styles.productItem} rounded-lg shadow-lg cursor-pointer`}
							>
								{/* Product Image */}
								<img
									src={product.image}
									className={`${styles.productImg} w-full h-auto object-cover mb-1 rounded-lg`}
								/>
								{/* Product Price */}
								<p className={`${styles.productPrice}`}>{product.price} ₫</p>
								{/* Product Price */}
								<p className={`${styles.productName}`}>{product.productName}</p>
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
