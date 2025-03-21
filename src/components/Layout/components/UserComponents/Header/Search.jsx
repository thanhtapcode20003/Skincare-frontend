import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../../../../api/productService";
import { Skeleton } from "primereact/skeleton";
import styles from "./Search.module.scss";

export default function Search() {
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showSkeleton, setShowSkeleton] = useState(true);
	const [showResults, setShowResults] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const data = await getProducts();
				setProducts(data);
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	useEffect(() => {
		if (searchTerm.trim() === "") {
			setFilteredProducts([]);
			setShowSkeleton(true);
			return;
		}

		const searchTermLower = searchTerm.toLowerCase();

		// Search by product name or category name
		const results = products.filter(
			(product) =>
				product.productName.toLowerCase().includes(searchTermLower) ||
				(product.category?.categoryName &&
					product.category.categoryName.toLowerCase().includes(searchTermLower))
		);

		setFilteredProducts(results.slice(0, 100));

		setShowSkeleton(true);
		const timer = setTimeout(() => {
			setShowSkeleton(false);
		}, 500);

		return () => clearTimeout(timer);
	}, [searchTerm, products]);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
		setShowResults(true);
	};

	const handleProductClick = (categoryId, productId) => {
		navigate(`/${categoryId}/${productId}`);
		setSearchTerm("");
		setShowResults(false);
	};

	const handleCategoryClick = (categoryId) => {
		navigate(`/${categoryId}`);
		setSearchTerm("");
		setShowResults(false);
	};

	const handleClickOutside = () => {
		setTimeout(() => {
			setShowResults(false);
		}, 200);
	};

	const renderSkeletonResults = () => {
		return Array(5)
			.fill(0)
			.map((_, index) => (
				<div key={index} className={styles.resultItem}>
					<div className={styles.productImage}>
						<Skeleton shape="circle" width="40px" height="40px" />
					</div>
					<div className={styles.productInfo} style={{ width: "100%" }}>
						<Skeleton width="70%" height="14px" className="mb-2" />
						<Skeleton width="40%" height="12px" />
					</div>
				</div>
			));
	};

	// Group products by category for better display
	const groupProductsByCategory = (products) => {
		const grouped = {};
		const categoryResults = [];

		// Group all matching products by category
		products.forEach((product) => {
			if (!product.category) return;

			const categoryId = product.categoryId;
			const categoryName = product.category.categoryName;

			// If category matches search directly, add it to the top results
			if (categoryName.toLowerCase().includes(searchTerm.toLowerCase())) {
				if (!categoryResults.some((c) => c.categoryId === categoryId)) {
					categoryResults.push({
						categoryId,
						categoryName,
						isCategory: true,
					});
				}
			}

			if (!grouped[categoryId]) {
				grouped[categoryId] = [];
			}
			grouped[categoryId].push(product);
		});

		// Flatten the results with categories first, then products
		return [...categoryResults, ...products];
	};

	return (
		<div
			className={`search relative flex items-center w-120 ${styles.searchContainer}`}
		>
			{loading ? (
				<Skeleton width="100%" height="36px" className="rounded-full" />
			) : (
				<>
					<input
						type="text"
						placeholder="Search products or categories..."
						className="h-9 bg-white px-3 text-sm text-gray-700 w-full border-none outline-none rounded-full"
						value={searchTerm}
						onChange={handleSearch}
						onBlur={handleClickOutside}
					/>
					<button className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-emerald-800 rounded-full cursor-pointer">
						<FiSearch className="text-xl" />
					</button>

					{showResults && (
						<div className={styles.searchResults}>
							{loading || showSkeleton
								? renderSkeletonResults()
								: filteredProducts.length > 0
								? groupProductsByCategory(filteredProducts).map((item) =>
										item.isCategory ? (
											<div
												key={`category-${item.categoryId}`}
												className={`${styles.resultItem} ${styles.categoryResult}`}
												onClick={() => handleCategoryClick(item.categoryId)}
											>
												<div className={styles.categoryIcon}>
													<i
														className="pi pi-tag"
														style={{ color: "#27bf27" }}
													></i>
												</div>
												<div className={styles.productInfo}>
													<p className={styles.categoryTitle}>
														Category: {item.categoryName}
													</p>
													<p className={styles.categoryHint}>
														View all products in this category
													</p>
												</div>
											</div>
										) : (
											<div
												key={item.productId}
												className={styles.resultItem}
												onClick={() =>
													handleProductClick(item.categoryId, item.productId)
												}
											>
												<div className={styles.productImage}>
													<img
														src={item.image}
														alt={item.productName}
														onError={(e) => {
															e.target.src =
																"https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";
														}}
													/>
												</div>
												<div className={styles.productInfo}>
													<p className={styles.productName}>
														{item.productName}
													</p>
													<p className={styles.productCategory}>
														{item.category?.categoryName}
													</p>
												</div>
											</div>
										)
								  )
								: searchTerm.trim() !== "" && (
										<div className={styles.noResults}>No products found</div>
								  )}
						</div>
					)}
				</>
			)}
		</div>
	);
}
