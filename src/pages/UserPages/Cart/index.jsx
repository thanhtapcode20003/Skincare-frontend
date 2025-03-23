import { useState, useEffect, useRef } from "react";
import MoneyFormat from "../../../components/GlobalComponents/MoneyFormat";
import {
	getOrderDetails,
	deleteOrder,
	updateOrder,
} from "../../../api/orderService";
import { getProductById } from "../../../api/productService";
import LoadingSpinner from "../../../components/GlobalComponents/LoadingSpinner/LoadingSpinner";
import styles from "./Cart.module.scss";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";

function Cart() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [deletingItemId, setDeletingItemId] = useState(null);
	const [updatingItemId, setUpdatingItemId] = useState(null);
	const toast = useRef(null);
	const navigate = useNavigate();
	const { updateCartCount } = useCart();

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
				console.log(productItems);

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
			updateCartCount();
		} catch (error) {
			console.error(`Error deleting item ${id}:`, error);
		} finally {
			setDeletingItemId(null);
		}
	};

	// Function to update quantity
	const handleUpdateQuantity = async (id, delta) => {
		setUpdatingItemId(id);
		const itemToUpdate = items.find((item) => item.id === id);
		try {
			const newQuantity = Math.max(1, itemToUpdate.quantity + delta);
			// console.log(id);
			// console.log(newQuantity);

			const response = await updateOrder(id, { quantityChange: delta });
			await new Promise((resolve) => setTimeout(resolve, 500));
			// console.log(response);

			if (response.status === 200) {
				toast.current.show({
					severity: "success",
					summary: "Success",
					detail: `Quantity updated to ${newQuantity}`,
					life: 2000,
				});
				updateCartCount();
			} else {
				console.warn("Update order failed with status:", response.status);
				toast.current.show({
					severity: "error",
					summary: "Error",
					detail: "Failed to update quantity",
					life: 3000,
				});
			}

			setItems((prevItems) =>
				prevItems.map((item) =>
					item.id === id ? { ...item, quantity: newQuantity } : item
				)
			);
		} catch (error) {
			console.error(`Error updating quantity for item ${id}:`, error);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: "An error occurred while updating quantity",
				life: 3000,
			});
			// Revert to previous quantity on failure
			setItems((prevItems) =>
				prevItems.map((item) =>
					item.id === id ? { ...item, quantity: itemToUpdate.quantity } : item
				)
			);
		} finally {
			setUpdatingItemId(null);
		}
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

	// console.log("Cart Items:", items);

	return (
		<div className={styles.cartContainer}>
			<Toast ref={toast} />
			{(deletingItemId || updatingItemId) && <LoadingSpinner />}
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
						<button
							className={styles.returnToShopBtn}
							onClick={() => navigate("/")}
						>
							Return to Shop
						</button>
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
											{MoneyFormat(item.price || 0)}
										</p>
										{item.originalPrice > item.price && (
											<p className={styles.originalPrice}>
												{MoneyFormat(item.originalPrice || 0)}
											</p>
										)}
									</div>

									{/* Quantity */}
									<div className={styles.quantity}>
										<button
											onClick={() => handleUpdateQuantity(item.id, -1)}
											disabled={
												item.quantity <= 1 || updatingItemId === item.id
											}
										>
											-
										</button>
										<span>{item.quantity || 1}</span>
										<button
											onClick={() => handleUpdateQuantity(item.id, 1)}
											disabled={updatingItemId === item.id}
										>
											+
										</button>
									</div>

									{/* Subtotal */}
									<div className={styles.subtotal}>
										{MoneyFormat((item.price || 0) * (item.quantity || 1))}
									</div>
								</div>
							))}
						</div>

						{/* Summary Section */}
						<div className={styles.summary}>
							<h3>Your Invoice</h3>
							<div className={styles.summaryItem}>
								<span>Subtotal:</span>
								<span>{MoneyFormat(totalPrice)}</span>
							</div>
							<div className={styles.summaryItem}>
								<span>Discount:</span>
								<span>0 VND</span>
							</div>
							<div className={styles.total}>
								<span>Total:</span>
								<span className={styles.totalPrice}>
									{MoneyFormat(totalPrice)}
								</span>
							</div>
							<button
								className={styles.checkoutBtn}
								onClick={() => navigate("/cart/checkout")}
							>
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
