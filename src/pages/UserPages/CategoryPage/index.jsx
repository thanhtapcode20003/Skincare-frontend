import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import defaultImg from "../../../images/Default/default.jpg";

import { Skeleton } from "primereact/skeleton";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";

import styles from "./CategoryPage.module.scss";
import MoneyFormat from "../../../components/GlobalComponents/MoneyFormat";
import { getProducts } from "../../../api/productService";
import { getCategories } from "../../../api/categoryService";
import { getSkinTypes } from "../../../api/skinTypeService";

function CategoryPage() {
	const { categoryId } = useParams();
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [categoryName, setCategoryName] = useState("");
	const [skinTypes, setSkinTypes] = useState([]);
	const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
	const [sortOption, setSortOption] = useState("default"); // Store only the value, default to "default"

	const sortOptions = [
		{ label: "Default", value: "default" },
		{ label: "Price: Low to High", value: "price_asc" },
		{ label: "Price: High to Low", value: "price_desc" },
	];

	const renderSkeleton = () => (
		<>
			<div className={styles.categoryHeader}>
				<Skeleton width="200px" height="32px" className="mb-2" />
				<Skeleton width="150px" height="16px" />
			</div>
			<div className={styles.filterContainer}>
				<Skeleton width="200px" height="40px" className="mb-2" />
				<div className={styles.skinTypeFilter}>
					<Skeleton width="100%" height="150px" />
				</div>
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

				// Fetch all products, categories, and skin types
				const [productsData, categoriesData, skinTypesData] = await Promise.all(
					[getProducts(), getCategories(), getSkinTypes()]
				);

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
				setFilteredProducts(filteredProducts);
				setSkinTypes(skinTypesData);
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

	// Apply filters when sort option or selected skin types change
	useEffect(() => {
		let result = [...products];

		// Filter by selected skin types
		if (selectedSkinTypes.length > 0) {
			result = result.filter((product) =>
				selectedSkinTypes.includes(product.skinTypeId)
			);
		}

		// Apply sorting
		switch (sortOption) {
			case "price_asc":
				result = [...result].sort(
					(a, b) => parseFloat(a.price) - parseFloat(b.price)
				);
				break;
			case "price_desc":
				result = [...result].sort(
					(a, b) => parseFloat(b.price) - parseFloat(a.price)
				);
				break;
			case "default":
			default:
				// Default sorting (keep original order)
				break;
		}

		setFilteredProducts(result);
	}, [sortOption, selectedSkinTypes, products]);

	const onSortChange = (e) => {
		setSortOption(e.value); // Store only the value (e.g., "price_asc")
	};

	const onSkinTypeChange = (e) => {
		let _selectedSkinTypes = [...selectedSkinTypes];

		if (e.checked) _selectedSkinTypes.push(e.value);
		else _selectedSkinTypes = _selectedSkinTypes.filter((st) => st !== e.value);

		setSelectedSkinTypes(_selectedSkinTypes);
	};

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
				<p>{filteredProducts.length} products found</p>
			</div>

			<div className={styles.filterContainer}>
				<div className={styles.sortingFilter}>
					<label htmlFor="sort">Sort by:</label>
					<Dropdown
						id="sort"
						value={sortOption}
						options={sortOptions}
						onChange={onSortChange}
						placeholder="Select sorting"
						className={styles.sortDropdown}
					/>
				</div>

				<div className={styles.skinTypeFilter}>
					<h3>Skin Type</h3>
					<div className={styles.checkboxGroup}>
						{skinTypes.map((skinType) => (
							<div key={skinType.skinTypeId} className={styles.checkboxItem}>
								<Checkbox
									inputId={`skinType_${skinType.skinTypeId}`}
									value={skinType.skinTypeId}
									onChange={onSkinTypeChange}
									checked={selectedSkinTypes.includes(skinType.skinTypeId)}
								/>
								<label htmlFor={`skinType_${skinType.skinTypeId}`}>
									{skinType.skinTypeName}
								</label>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className={styles.productGrid}>
				{filteredProducts.map((product) => (
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

				{filteredProducts.length === 0 && !loading && (
					<div className={styles.noResults}>
						<p>No products match your filters.</p>
						<button
							className={styles.resetButton}
							onClick={() => {
								setSelectedSkinTypes([]);
								setSortOption("default");
							}}
						>
							Reset Filters
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default CategoryPage;
