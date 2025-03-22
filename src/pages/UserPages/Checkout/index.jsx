import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Checkout.module.scss";
import {
	getOrders,
	getOrderDetails,
	paymentVnPay,
} from "../../../api/orderService";
import { getProductById } from "../../../api/productService";
import MoneyFormat from "../../../components/GlobalComponents/MoneyFormat";
import { useAuth } from "../../../utils/useAuth";
import defaultImg from "../../../images/Default/default.jpg";
import Checkout_VNPAY from "../../../images/Payment/Checkout_VNPAY.jpg";
import Checkout_COD from "../../../images/Payment/Checkout_COD.png";

import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Skeleton } from "primereact/skeleton";

function Checkout() {
	const navigate = useNavigate();
	const [order, setOrder] = useState(null);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [initialLoading, setInitialLoading] = useState(true);
	const [paymentMethod, setPaymentMethod] = useState("payOnDelivery");
	const [isProcessing, setIsProcessing] = useState(false);
	const stepperRef = useRef(null);
	const { username, phoneNumber, address } = useAuth();

	useEffect(() => {
		const timer = setTimeout(() => {
			setInitialLoading(false);
		}, 1000);

		const fetchOrderData = async () => {
			try {
				const ordersData = await getOrders();
				const cartOrder = ordersData.find((o) => o.orderStatus === "Cart");
				setOrder(cartOrder || null);

				const orderDetail = await getOrderDetails();
				const cartItems = orderDetail.items || orderDetail;
				// console.log(cartItems);

				const productItems = await Promise.all(
					cartItems.map(async (item) => {
						try {
							const productData = await getProductById(item.productId);
							return {
								...item,
								id: item.orderDetailId,
								name:
									productData.productName ||
									item.productName ||
									"Unknown Product",
								image: productData.image || defaultImg,
								price: productData.price || item.price || 0,
								quantity: item.quantity || 1,
							};
						} catch (error) {
							console.error(`Error fetching product ${item.productId}:`, error);
							return {
								...item,
								name: item.name || "Unknown Product",
								image: item.image || defaultImg,
								price: item.price || 0,
							};
						}
					})
				);
				// console.log(productItems);

				setItems(productItems);
				// console.log(productItems);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrderData();

		return () => clearTimeout(timer); // Cleanup timer on unmount
	}, []);

	const handlePlaceOrder = async () => {
		setIsProcessing(true);
		console.log("click");
		try {
			if (paymentMethod === "vnpay") {
				const response = await paymentVnPay(order.orderId);
				console.log(response);

				if (response.status === 200 && response.data.paymentUrl) {
					window.location.href = response.data.paymentUrl;
				} else {
					console.error("Failed to create VNPAY payment", response);
					navigate(
						`/payment/result?status=failed&amount=${
							order.totalAmount + 10000
						}&orderId=${order.orderId || "orderIdNotFound"}`
					);
				}
			} else {
				// For COD, always successful
				setTimeout(() => {
					setIsProcessing(false);
					navigate(
						`/payment/result?status=success&amount=${
							order.totalAmount + 10000
						}&orderId=${order.orderId || "orderIdNotFound"}`
					);
				}, 1500);
			}
		} catch (error) {
			console.error("Payment error:", error);
			setIsProcessing(false);
			// Navigate to error page
			navigate(
				`/payment/result?status=failed&amount=${
					order.totalAmount + 10000
				}&orderId=${order.orderId || "orderIdNotFound"}`
			);
		}
	};

	if (loading && !initialLoading) {
		return <div>Loading...</div>;
	}

	if (!order && !initialLoading) {
		return <div>No cart order found.</div>;
	}

	return (
		<div className={styles.checkoutContainer}>
			{/* Header */}
			{initialLoading ? (
				<Skeleton width="150px" height="2rem" className={styles.skeleton} />
			) : (
				<h1 className={styles.checkoutHeader}>Checkout</h1>
			)}

			{/* Main Content */}
			<div className={styles.checkoutContent}>
				{/* Left Section: Stepper */}
				<div className={styles.checkoutDetails}>
					{initialLoading ? (
						// Skeleton for Stepper (4 steps)
						<div className={styles.stepperSkeleton}>
							{Array(4)
								.fill()
								.map((_, index) => (
									<Skeleton
										key={index}
										width="100%"
										height="80px"
										className={styles.skeleton}
										style={{ marginBottom: "10px" }}
									/>
								))}
						</div>
					) : (
						<Stepper ref={stepperRef} orientation="vertical">
							{/* Step 1: Shipping Address */}
							<StepperPanel header="Shipping Address">
								<div className={styles.section}>
									<p>
										<strong>{username}</strong> - {phoneNumber}
										<button className={styles.changeBtn}>Change</button>
									</p>
									<p>{address}</p>
								</div>
								<div className={styles.stepperActions}>
									<Button
										label="Next"
										icon="pi pi-arrow-right"
										iconPos="right"
										className="bg-global"
										onClick={() => stepperRef.current.nextCallback()}
									/>
								</div>
							</StepperPanel>

							{/* Step 2: Payment Method */}
							<StepperPanel header="Payment Method">
								<div className={styles.section}>
									<div className={styles.paymentMethod}>
										<RadioButton
											inputId="payOnDelivery"
											name="paymentMethod"
											value="payOnDelivery"
											onChange={(e) => setPaymentMethod(e.value)}
											checked={paymentMethod === "payOnDelivery"}
										/>
										<img
											src={Checkout_COD}
											alt="payOnDelivery"
											className={styles.paymentLogo}
										/>
										<label
											htmlFor="payOnDelivery"
											className={styles.paymentLabel}
										>
											Pay On Delivery (COD)
										</label>
									</div>
									<div className={styles.paymentMethod}>
										<RadioButton
											inputId="vnpay"
											name="paymentMethod"
											value="vnpay"
											onChange={(e) => setPaymentMethod(e.value)}
											checked={paymentMethod === "vnpay"}
										/>
										<img
											src={Checkout_VNPAY}
											alt="VNPAY"
											className={styles.paymentLogo}
										/>
										<label htmlFor="vnpay" className={styles.paymentLabel}>
											Pay with VNPAY
										</label>
									</div>
								</div>
								<div className={styles.stepperActions}>
									<Button
										label="Back"
										severity="secondary"
										icon="pi pi-arrow-left"
										onClick={() => stepperRef.current.prevCallback()}
									/>
									<Button
										label="Next"
										icon="pi pi-arrow-right"
										iconPos="right"
										className="bg-global"
										onClick={() => stepperRef.current.nextCallback()}
									/>
								</div>
							</StepperPanel>

							{/* Step 3: Coupon and Discount Code */}
							<StepperPanel header="Coupons & Discounts">
								<div className={styles.section}>
									<h3>Discount Code</h3>
									<p>Enter discount code</p>
									<button className={styles.changeBtn}>Apply</button>
								</div>
								<div className={styles.stepperActions}>
									<Button
										label="Back"
										severity="secondary"
										icon="pi pi-arrow-left"
										onClick={() => stepperRef.current.prevCallback()}
									/>
									<Button
										label="Next"
										icon="pi pi-arrow-right"
										iconPos="right"
										className="bg-global"
										onClick={() => stepperRef.current.nextCallback()}
									/>
								</div>
							</StepperPanel>

							{/* Step 4: Cart Info */}
							<StepperPanel header="Cart Information">
								<div className={styles.section}>
									<div className={styles.cartItems}>
										{items.length === 0 ? (
											<p>No items in cart.</p>
										) : (
											items.map((item) => (
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
														<span>{item.quantity || 1}</span>
													</div>

													{/* Subtotal */}
													<div className={styles.subtotal}>
														{MoneyFormat(
															(item.price || 0) * (item.quantity || 1)
														)}
													</div>
												</div>
											))
										)}
									</div>
								</div>
								<div className={styles.stepperActions}>
									<Button
										label="Back"
										severity="secondary"
										icon="pi pi-arrow-left"
										onClick={() => stepperRef.current.prevCallback()}
									/>
								</div>
							</StepperPanel>
						</Stepper>
					)}
				</div>

				{/* Right Section: Order Summary */}
				<div className={styles.orderSummary}>
					{initialLoading ? (
						// Skeleton for Order Summary
						<div className={styles.orderSummarySkeleton}>
							<Skeleton
								width="120px"
								height="1.5rem"
								className={styles.skeleton}
							/>
							<div className={styles.summaryDetailsSkeleton}>
								<Skeleton
									width="100%"
									height="1.5rem"
									className={styles.skeleton}
								/>
								<Skeleton
									width="100%"
									height="1.5rem"
									className={styles.skeleton}
								/>
								<Skeleton
									width="100%"
									height="1.5rem"
									className={styles.skeleton}
								/>
								<Skeleton
									width="100%"
									height="2rem"
									className={styles.skeleton}
								/>
								<Skeleton
									width="80%"
									height="1rem"
									className={styles.skeleton}
								/>
							</div>
							<Skeleton
								width="100%"
								height="3rem"
								className={styles.skeleton}
							/>
						</div>
					) : (
						<>
							<h2>Order Summary</h2>
							{/* Order Totals */}
							<div className={styles.summaryDetails}>
								<div className={styles.summaryItem}>
									<span>Subtotal:</span>
									<span>
										{MoneyFormat(order.totalAmount || "Invalid Price")}
									</span>
								</div>
								<div className={styles.summaryItem}>
									<span>Discount:</span>
									<span>0đ</span>
								</div>
								<div className={styles.summaryItem}>
									<span>Shipping Fee:</span>
									<span>10.000 ₫</span>
								</div>
								<div className={styles.total}>
									<span>Total:</span>
									<span className={styles.totalAmount}>
										{MoneyFormat(order.totalAmount + 10000 || "Invalid Price")}
									</span>
								</div>
								<p className={styles.taxNote}>
									Includes VAT, packaging, shipping, and other fees per Shipping
									Policy
								</p>
							</div>
							{/* Place Order Button */}
							<button
								className={styles.placeOrderBtn}
								onClick={handlePlaceOrder}
								disabled={isProcessing}
							>
								{isProcessing ? "Processing..." : "Place Order"}
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Checkout;
