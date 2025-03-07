import { useState } from "react";
import styles from "./Cart.module.scss";

// Sample cart data (you can replace this with your actual data)
const cartItems = []; // Initially empty to simulate no products

function Cart() {
	const [items, setItems] = useState(cartItems);

	// Function to handle quantity change
	const handleQuantityChange = (id, delta) => {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === id
					? { ...item, quantity: Math.max(1, item.quantity + delta) }
					: item
			)
		);
	};

	// Function to remove an item from the cart
	const handleRemoveItem = (id) => {
		setItems((prevItems) => prevItems.filter((item) => item.id !== id));
	};

	// Calculate total price
	const totalPrice = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		<div className={styles.cartContainer}>
			<div className={styles.cartHeader}>
				<h1>
					Cart ({items.length} {items.length <= 1 ? "product" : "products"})
				</h1>
			</div>

			<div className={styles.cartContent}>
				{items.length === 0 ? (
					<div className={styles.emptyCart}>
						<div className={styles.emptyCartIcon}>
							{/* Placeholder for the shopping bag icon */}
							<span>🛍️</span>
						</div>
						<p className={styles.emptyCartMessage}>
							YOUR CART IS CURRENTLY EMPTY.
						</p>
						<button className={styles.returnToShopBtn}>Return to shop</button>
					</div>
				) : (
					<>
						{/* Cart Items */}
						<div className={styles.cartItems}>
							<div className={styles.cartItemsHeader}>
								<span>Sản phẩm</span>
								<span>Giá tiền</span>
								<span>Số lượng</span>
								<span>Thành tiền</span>
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
												<button className={styles.favoriteBtn}>
													Yêu thích
												</button>
												<button
													className={styles.removeBtn}
													onClick={() => handleRemoveItem(item.id)}
												>
													Xóa
												</button>
											</div>
										</div>
									</div>

									{/* Price */}
									<div className={styles.price}>
										<p className={styles.currentPrice}>
											{item.price.toLocaleString()} đ
										</p>
										{item.originalPrice > item.price && (
											<p className={styles.originalPrice}>
												{item.originalPrice.toLocaleString()} đ
											</p>
										)}
									</div>

									{/* Quantity */}
									<div className={styles.quantity}>
										<button
											onClick={() => handleQuantityChange(item.id, -1)}
											disabled={item.quantity === 1}
										>
											-
										</button>
										<span>{item.quantity}</span>
										<button onClick={() => handleQuantityChange(item.id, 1)}>
											+
										</button>
									</div>

									{/* Subtotal */}
									<div className={styles.subtotal}>
										{(item.price * item.quantity).toLocaleString()} đ
									</div>
								</div>
							))}
						</div>

						{/* Summary Section */}
						<div className={styles.summary}>
							<h3>Hóa đơn của bạn</h3>
							<div className={styles.summaryItem}>
								<span>Tạm tính:</span>
								<span>{totalPrice.toLocaleString()} đ</span>
							</div>
							<div className={styles.summaryItem}>
								<span>Giảm giá:</span>
								<span>0 đ</span>
							</div>
							<div className={styles.summaryItem}>
								<span>Khuyến mãi giảm giá đặc biệt:</span>
								<span>
									Tặng: Bộ Sản Phẩm Bioderma 3 Món Làm Sạch & Dưỡng Ẩm Cho Da
									Mụn (SL có hạn)
								</span>
							</div>
							<div className={styles.summaryItem}>
								<span>
									Số lượng quà tặng còn lại, trả góp trước khi thanh toán:
								</span>
								<span>0</span>
							</div>
							<div className={styles.total}>
								<span>Tổng cộng:</span>
								<span>{totalPrice.toLocaleString()} đ (Đã bao gồm VAT)</span>
							</div>
							<button className={styles.checkoutBtn}>Tiến hành đặt hàng</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Cart;
