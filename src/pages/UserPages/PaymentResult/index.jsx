import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import styles from "./PaymentResult.module.scss";
import Payment_Success from "../../../images/Payment/Payment_Success.jpg";
import Payment_Fail from "../../../images/Payment/Payment_Fail.jpg";
import MoneyFormat from "../../../components/GlobalComponents/MoneyFormat";

function PaymentResult() {
	const navigate = useNavigate();
	const location = useLocation();
	const [success, setSuccess] = useState(null);
	const [orderDetails, setOrderDetails] = useState(null);

	useEffect(() => {
		// Get payment status from URL params
		const params = new URLSearchParams(location.search);
		const status = params.get("status");
		const amount = parseInt(params.get("amount") || "0");
		const orderId = params.get("orderId");

		setSuccess(status === "success");
		setOrderDetails({
			amount,
			orderId: orderId || "25032153111", // Default order ID if not provided
		});
	}, [location]);

	const handleContinueShopping = () => {
		navigate("/");
	};

	const handleRetry = () => {
		navigate("/cart/checkout");
	};

	const handleViewOrder = () => {
		navigate("/profile/orders");
	};

	// If payment status is still loading
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
