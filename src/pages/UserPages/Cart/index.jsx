import { useState, useEffect } from "react";
import { getOrderDetails, deleteOrder } from "../../../api/orderService";
import { getProductById } from "../../../api/productService";
import { Skeleton } from "primereact/skeleton";
import LoadingSpinner from "../../../components/GlobalComponents/LoadingSpinner/LoadingSpinner"; // Import the new component
import styles from "./Cart.module.scss";

function Cart() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [deletingItemId, setDeletingItemId] = useState(null);
	useEffect(() => {
		const fetchCartData = async () => {
			try {
				const orderData = await getOrderDetails();
				const cartItems = orderData.items || orderData;

				// Fetch product details for each item
				const productItems = await Promise.all(
					cartItems.map(async (item) => {
						try {
							const productData = await getProductById(item.productId);
							await new Promise((resolve) => setTimeout(resolve, 1000));
							return {
								...item,
								id: item.orderDetailId,
								name:
									productData.productName ||
									item.productName ||
									"Unknown Product",
								image: productData.image || "https://via.placeholder.com/150",
								price: productData.price || item.price || 0,
								quantity: item.quantity || 1,
							};
						} catch (error) {
							console.error(`Error fetching product ${item.productId}:`, error);
							return {
								...item,
								name: item.name || "Unknown Product",
								image: item.image || "https://via.placeholder.com/150",
								price: item.price || 0,
							};
						}
					})
				);

				setItems(productItems);
			} catch (error) {
				console.error("Error fetching order details:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCartData();
	}, []);

	// Function to remove an item from the cart with loading state
	const handleRemoveItem = async (id) => {
		setDeletingItemId(id);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await deleteOrder(id);
			setItems((prevItems) => prevItems.filter((item) => item.id !== id));
		} catch (error) {
			console.error(`Error deleting item ${id}:`, error);
		} finally {
			setDeletingItemId(null);
		}
	};

	// Function to handle quantity change for a specific item
	const handleQuantityChange = (id, delta) => {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === id
					? { ...item, quantity: Math.max(1, item.quantity + delta) }
					: item
			)
		);
	};

	// Calculate total price
	const totalPrice = items.reduce(
		(sum, item) => sum + (item.price || 0) * (item.quantity || 1),
		0
	);

	// Skeleton loading UI
	if (loading) {
		return (
			<div className={styles.cartContainer}>
				<div className={styles.cartHeader}>
					<Skeleton width="200px" height="30px" />
				</div>
				<div className={styles.cartContent}>
					<div className={styles.cartItems}>
						<div className={styles.cartItemsHeader}>
							<span>Product</span>
							<span>Price</span>
							<span>Quantity</span>
							<span>Subtotal</span>
						</div>
						{[...Array(3)].map(
							(
								_,
								index // Simulate 3 loading items
							) => (
								<div key={index} className={styles.cartItem}>
									<div className={styles.productInfo}>
										<Skeleton
											width="80px"
											height="80px"
											className={styles.productImage}
										/>
										<div className={styles.productDetails}>
											<Skeleton width="150px" height="20px" />
											<Skeleton width="100px" height="15px" className="mt-2" />
										</div>
									</div>
									<div className={styles.price}>
										<Skeleton width="80px" height="20px" />
									</div>
									<div className={styles.quantity}>
										<Skeleton width="60px" height="30px" />
									</div>
									<div className={styles.subtotal}>
										<Skeleton width="80px" height="20px" />
									</div>
								</div>
							)
						)}
					</div>
					<div className={styles.summary}>
						<Skeleton width="150px" height="25px" className="mb-3" />
						<Skeleton width="200px" height="20px" className="mb-2" />
						<Skeleton width="200px" height="20px" className="mb-2" />
						<Skeleton width="250px" height="30px" />
					</div>
				</div>
			</div>
		);
	}

	console.log("Cart Items:", items);

	return (
		<div className={styles.cartContainer}>
			{deletingItemId && <LoadingSpinner />}
			<div className={styles.cartHeader}>
				<h1>
					Cart ({items.length} {items.length <= 1 ? "product" : "products"})
				</h1>
			</div>

			<div className={styles.cartContent}>
				{items.length === 0 ? (
					<div className={styles.emptyCart}>
						<div className={styles.emptyCartIcon}>
							<span>🛍️</span>
						</div>
						<p className={styles.emptyCartMessage}>
							YOUR CART IS CURRENTLY EMPTY.
						</p>
						<button className={styles.returnToShopBtn}>Return to Shop</button>
					</div>
				) : (
					<>
						{/* Cart Items */}
						<div className={styles.cartItems}>
							<div className={styles.cartItemsHeader}>
								<span>Product</span>
								<span>Price</span>
								<span>Quantity</span>
								<span>Subtotal</span>
							</div>

							{items.map((item) => (
								<div key={item.id} className={styles.cartItem}>
									{/* Product Info */}
									<div className={styles.productInfo}>
										<img
											src={item.image}
											alt={item.name}
											className={styles.productImage}
										/>
										<div className={styles.productDetails}>
											<p className={styles.productName}>{item.name}</p>
											{item.gift && (
												<p className={styles.giftText}>{item.gift}</p>
											)}
											<div className={styles.actions}>
												<button
													className={styles.removeBtn}
													onClick={() => handleRemoveItem(item.id)}
												>
													Remove
												</button>
											</div>
										</div>
									</div>

									{/* Price */}
									<div className={styles.price}>
										<p className={styles.currentPrice}>
											{(item.price || 0).toLocaleString()} VND
										</p>
										{item.originalPrice > item.price && (
											<p className={styles.originalPrice}>
												{(item.originalPrice || 0).toLocaleString()} VND
											</p>
										)}
									</div>

									{/* Quantity */}
									<div className={styles.quantity}>
										<button
											onClick={() => handleQuantityChange(item.id, -1)}
											disabled={item.quantity <= 1}
										>
											-
										</button>
										<span>{item.quantity || 1}</span>
										<button onClick={() => handleQuantityChange(item.id, 1)}>
											+
										</button>
									</div>

									{/* Subtotal */}
									<div className={styles.subtotal}>
										{(
											(item.price || 0) * (item.quantity || 1)
										).toLocaleString()}{" "}
										VND
									</div>
								</div>
							))}
						</div>

						{/* Summary Section */}
						<div className={styles.summary}>
							<h3>Your Invoice</h3>
							<div className={styles.summaryItem}>
								<span>Subtotal:</span>
								<span>{totalPrice.toLocaleString()} VND</span>
							</div>
							<div className={styles.summaryItem}>
								<span>Discount:</span>
								<span>0 VND</span>
							</div>
							<div className={styles.total}>
								<span>Total:</span>
								<span>{totalPrice.toLocaleString()} VND (Including VAT)</span>
							</div>
							<button className={styles.checkoutBtn}>
								Proceed to Checkout
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Cart;
