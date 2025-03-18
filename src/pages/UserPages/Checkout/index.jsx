import { useState, useEffect, useRef } from "react";
import styles from "./Checkout.module.scss";
import { getOrders } from "../../../api/orderService";
import MoneyFormat from "../../../components/GlobalComponents/MoneyFormat";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";

function Checkout() {
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);
	const [paymentMethod, setPaymentMethod] = useState("vnpay");
	const stepperRef = useRef(null);

	useEffect(() => {
		const fetchOrderData = async () => {
			try {
				const ordersData = await getOrders();
				// Assuming getOrders returns an array, we take the first "Cart" status order
				const cartOrder = ordersData.find((o) => o.orderStatus === "Cart");
				setOrder(cartOrder || null);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrderData();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!order) {
		return <div>No cart order found.</div>;
	}

	// const totalAmount = order.totalAmount || 0;

	console.log(order);

	return (
		<div className={styles.checkoutContainer}>
			<h1 className={styles.checkoutHeader}>Checkout</h1>
			<div className={styles.checkoutContent}>
				{/* Left Section: Stepper for Customer Info, Payment Method, Coupon/Discount */}
				<div className={styles.checkoutDetails}>
					<Stepper ref={stepperRef} orientation="vertical">
						{/* Step 1: Shipping Address */}
						<StepperPanel header="Shipping Address">
							<div className={styles.section}>
								<p>
									<strong>Le Hoang Thien Ha</strong> - 0774378303
									<button className={styles.changeBtn}>Change</button>
								</p>
								<p>120/6, d74/3A, Tan Dong Hiep Ward, Di An Town, Binh Duong</p>
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
										inputId="vnpay"
										name="paymentMethod"
										value="vnpay"
										onChange={(e) => setPaymentMethod(e.value)}
										checked={paymentMethod === "vnpay"}
									/>
									<label htmlFor="vnpay" className={styles.paymentLabel}>
										Pay with VNPAY
										<img
											src="/vnpay-logo.png"
											alt="VNPAY"
											className={styles.paymentLogo}
										/>
									</label>
								</div>
								<button className={styles.changeBtn}>Change</button>
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
								<h3>Coupon</h3>
								<p>Select a coupon</p>
								<button className={styles.changeBtn}>Change</button>
							</div>
							<div className={styles.section}>
								<h3>Discount Code</h3>
								<p>Enter discount code</p>
								<button className={styles.changeBtn}>Change</button>
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
								<h3>Coupon</h3>
								<p>Select a coupon</p>
								<button className={styles.changeBtn}>Change</button>
							</div>
							<div className={styles.section}>
								<h3>Discount Code</h3>
								<p>Enter discount code</p>
								<button className={styles.changeBtn}>Change</button>
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
				</div>

				{/* Right Section: Order Summary */}
				<div className={styles.orderSummary}>
					<h2>Order Summary</h2>

					{/* Order Totals */}
					<div className={styles.summaryDetails}>
						<div className={styles.summaryItem}>
							<span>Subtotal:</span>
							<span>{MoneyFormat(order.totalAmount || "Invalid Price")}</span>
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
					<button className={styles.placeOrderBtn}>Place Order</button>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
