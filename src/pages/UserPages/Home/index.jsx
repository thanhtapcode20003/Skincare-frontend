import styles from "./Home.module.scss";
import { FaStar } from "react-icons/fa";

function Home() {
	const colorStars = {
		orange: "#F2C265",
		grey: "a9a9a9",
	};
	const stars = Array(5).fill(0);
	const products = [
		{
			id: 1,
			name: "Kem Chống Nắng La Roche-Posay",
			price: "100.000 đ",
			discount: "$79.99",
			img: "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-kem-chong-nang-la-roche-posay-kiem-soat-dau-spf50-50ml_GcC5XxafnFua2eRB.png",
		},
		{
			id: 2,
			name: "Kem Chống Nắng La Roche-Posay",
			price: "100.000 ₫",
			discount: "$29.00",
			img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
		},
		{
			id: 3,
			name: "Kem Chống Nắng La Roche-Posay",
			price: "100.000 ₫",
			discount: "$20.00",
			img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
		},
		{
			id: 4,
			name: "Kem Chống Nắng La Roche-Posay",
			price: "100.000 ₫",
			discount: "$9.35",
			img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
		},
		{
			id: 5,
			name: "Kem Chống Nắng La Roche-Posay",
			price: "100.000 ₫",
			discount: "$9.35",
			img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
		},
		{
			id: 6,
			name: "Kem Chống Nắng La Roche-Posay",
			price: "100.000 ₫",
			discount: "$9.35",
			img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
		},
		{
			id: 7,
			name: "Kem Chống Nắng La Roche-Posay",
			price: "100.000 ₫",
			discount: "$9.35",
			img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
		},
		{
			id: 8,
			name: "Kem Chống Nắng La Roche-Posay",
			price: "100.000 ₫",
			discount: "$9.35",
			img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
		},
		{
			id: 9,
			name: "Kem Chống Nắng La Roche-Posay",
			price: "100.000 ₫",
			discount: "$9.35",
			img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
		},
		{
			id: 10,
			name: "Kem Chống Nắng La Roche-Posay",
			price: "100.000 ₫",
			discount: "$9.35",
			img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988.jpg",
		},
	];

	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.homeProducts}`}>
				{/* Cate */}
				<div className={`${styles.cateName}`}>
					<h2>Sữa rửa mặt</h2>
				</div>
				<div className={`${styles.productGrid} grid grid-cols-5 gap-6`}>
					{products.map((product) => (
						<div
							key={product.id}
							className={`${styles.productItem} rounded-lg shadow-lg cursor-pointer`}
						>
							{/* Product Image */}
							<img
								src={product.img}
								className={`${styles.productImg} w-full h-auto object-cover mb-1 rounded-lg`}
							/>
							{/* Product Price */}
							<p className={`${styles.productPrice}`}>{product.price}</p>
							{/* Product Price */}
							<p className={`${styles.productName}`}>{product.name}</p>
							<div className={`${styles.productRating}`}>
								{stars.map((_, index) => (
									<FaStar
										key={index}
										size={16}
										color={
											index < product.rating
												? colorStars.orange
												: colorStars.grey
										}
									/>
								))}
								<p>({product.rating ? product.rating : "0"})</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Home;
