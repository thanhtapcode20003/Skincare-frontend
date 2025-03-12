import { useState } from "react";
import styles from "./Cart.module.scss";

// Sample cart data (you can replace this with your actual data)
const cartItems = [
	{
		id: 1,
		name: "Intensive Moisture Care Makeup Cleansing Oil 150ml",
		price: 365000, // Current price in VND
		originalPrice: 450000, // Original price for discount display
		quantity: 2,
		image:
			"https://medias.watsons.vn/publishing/WTCVN-212337-front-zoom.jpg?version=1730386819",
		gift: "Tặng: Bộ Sản Phẩm Bioderma Mini",
	},
	{
		id: 2,
		name: "Hydrating Face Cream 50ml",
		price: 250000,
		originalPrice: 300000,
		quantity: 1,
		image: "https://example.com/hydrating-cream.jpg",
	},
	{
		id: 3,
		name: "Gentle Exfoliating Scrub 100g",
		price: 180000,
		quantity: 3,
		image: "https://example.com/exfoliating-scrub.jpg",
	},
]; // Initially empty to simulate no products

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
								<span>Product</span>
								<span>Price</span>
								<span>Quantity</span>
								<span>Money</span>
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
							{/* <div className={styles.summaryItem}>
								<span>Khuyến mãi giảm giá đặc biệt:</span>
								<span>
									Tặng: Bộ Sản Phẩm Bioderma 3 Món Làm Sạch & Dưỡng Ẩm Cho Da
									Mụn (SL có hạn)
								</span>
							</div> */}
							{/* <div className={styles.summaryItem}>
								<span>
									Số lượng quà tặng còn lại, trả góp trước khi thanh toán:
								</span>
								<span>0</span>
							</div> */}
							<div className={styles.total}>
								<span>Summary: </span>
								<span>{totalPrice.toLocaleString()} đ (Including VAT)</span>
							</div>
							<button className={styles.checkoutBtn}>
								Process to Checkout
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Cart;
