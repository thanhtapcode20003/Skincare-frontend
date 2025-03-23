import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import styles from "./PaymentResult.module.scss";
import Payment_Success from "../../../images/Payment/Payment_Success.jpg";
import Payment_Fail from "../../../images/Payment/Payment_Fail.jpg";
import MoneyFormat from "../../../components/GlobalComponents/MoneyFormat";
import { useCart } from "../../../context/CartContext";

function PaymentResult() {
	const navigate = useNavigate();
	const location = useLocation();
	const [success, setSuccess] = useState(null);
	const [orderDetails, setOrderDetails] = useState(null);
	const { updateCartCount } = useCart();

	useEffect(() => {
		// Get payment status from URL params
		const params = new URLSearchParams(location.search);

		// Log all URL parameters
		console.log("All URL Parameters:", Object.fromEntries(params));

		// Check for direct status param (from internal redirect)
		let status = params.get("status");
		let amount = parseInt(params.get("amount") || "0");
		let orderId = params.get("orderId");

		// Check for VNPAY response params
		const vnp_ResponseCode = params.get("vnp_ResponseCode");
		const vnp_Amount = params.get("vnp_Amount");
		const vnp_TxnRef = params.get("vnp_TxnRef");

		// Create payment log object
		const paymentLog = {
			timestamp: new Date().toISOString(),
			originalStatus: status,
			originalAmount: amount,
			originalOrderId: orderId,
			vnpay_params: {
				responseCode: vnp_ResponseCode,
				amount: vnp_Amount,
				transactionRef: vnp_TxnRef,
			},
			url: window.location.href,
		};

		// Log to console
		console.log("Payment Result Log:", paymentLog);

		// Save to localStorage
		const previousLogs = JSON.parse(
			localStorage.getItem("payment_logs") || "[]"
		);
		previousLogs.push(paymentLog);
		localStorage.setItem("payment_logs", JSON.stringify(previousLogs));

		// If VNPAY params exist, use them
		if (vnp_ResponseCode) {
			// VNPAY success codes are "00" or "0"
			status =
				vnp_ResponseCode === "00" || vnp_ResponseCode === "0"
					? "success"
					: "failed";
		}

		if (vnp_Amount) {
			// VNPAY amount is in VND * 100
			amount = parseInt(vnp_Amount) / 100;
		}

		if (vnp_TxnRef) {
			orderId = vnp_TxnRef;
		}

		const isSuccess = status === "success";
		setSuccess(isSuccess);

		// If payment was successful, update cart count
		if (isSuccess) {
			updateCartCount();
		}

		setOrderDetails({
			amount,
			orderId: orderId || "OrderIdNotFound",
		});
	}, [location, updateCartCount]);

	const handleContinueShopping = () => {
		navigate("/");
	};

	const handleRetry = () => {
		navigate("/cart/checkout");
	};

	const handleViewOrder = () => {
		navigate("/profile/orders");
	};

	// Add function to view payment logs
	// const viewPaymentLogs = () => {
	// 	const logs = localStorage.getItem("payment_logs");
	// 	console.log("All Payment Logs:", JSON.parse(logs));
	// };

	if (success === null) {
		return <div className={styles.loading}>Processing payment result...</div>;
	}

	return (
		<div className={styles.paymentResultContainer}>
			{success ? (
				// Success UI
				<div className={styles.resultCard}>
					<img
						src={Payment_Success}
						alt="Payment Success"
						className={styles.resultIcon}
					/>
					<h2 className={styles.successTitle}>
						Order placed successfully{" "}
						{orderDetails?.amount && MoneyFormat(orderDetails.amount)}
					</h2>
					<p className={styles.orderNumber}>
						Order ID: {orderDetails?.orderId}
					</p>

					<div className={styles.buttonContainer}>
						<Button
							label="Continue shopping"
							className={`${styles.actionButton} ${styles.continueButton}`}
							onClick={handleContinueShopping}
						/>
						<Button
							label="Order details"
							className={`${styles.actionButton} ${styles.orderButton}`}
							onClick={handleViewOrder}
						/>
					</div>
				</div>
			) : (
				// Failure UI
				<div className={styles.resultCard}>
					<img
						src={Payment_Fail}
						alt="Payment Failed"
						className={styles.resultIcon}
					/>
					<h2 className={styles.failureTitle}>
						Payment failed{" "}
						{orderDetails?.amount && MoneyFormat(orderDetails.amount)}
					</h2>

					<div className={styles.buttonContainer}>
						<Button
							label="Retry payment"
							className={`${styles.actionButton} ${styles.retryButton}`}
							onClick={handleRetry}
						/>
						<Button
							label="Cancel"
							className={`${styles.actionButton} ${styles.cancelButton}`}
							onClick={handleContinueShopping}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default PaymentResult;
