import { useState, useEffect, useMemo } from "react";
import { Timeline } from "primereact/timeline";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { TabView, TabPanel } from "primereact/tabview";
import { Skeleton } from "primereact/skeleton";
import PropTypes from "prop-types";
import styles from "./Orders.module.scss";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState(0);
	const [timeFilter, setTimeFilter] = useState("all");

	// Memoize timeline data to prevent recreation on each render
	const processingTimeline = useMemo(
		() => [
			{
				status: "Order Placed",
				date: "2023-11-10 10:30 AM",
				icon: "pi pi-shopping-cart",
				color: "#326e51",
				description: "Your order has been received and is being processed.",
			},
			{
				status: "Processing",
				date: "2023-11-10 11:45 AM",
				icon: "pi pi-sync",
				color: "#326e51",
				description: "We are preparing your items for shipment.",
			},
			{
				status: "Current Status",
				date: "In Progress",
				icon: "pi pi-spinner",
				color: "#f59e0b",
				description: "Your order is being packed and will be shipped soon.",
			},
		],
		[]
	);

	const shippingTimeline = useMemo(
		() => [
			{
				status: "Order Placed",
				date: "2023-11-08 09:15 AM",
				icon: "pi pi-shopping-cart",
				color: "#326e51",
				description: "Your order has been received and is being processed.",
			},
			{
				status: "Processing",
				date: "2023-11-08 01:20 PM",
				icon: "pi pi-sync",
				color: "#326e51",
				description: "We are preparing your items for shipment.",
			},
			{
				status: "Shipped",
				date: "2023-11-09 10:30 AM",
				icon: "pi pi-send",
				color: "#326e51",
				description: "Your order has been shipped. It&apos;s on the way!",
			},
			{
				status: "Current Status",
				date: "Out for Delivery",
				icon: "pi pi-truck",
				color: "#f59e0b",
				description: "Your order is out for delivery and will arrive soon.",
			},
		],
		[]
	);

	// Simulating loading orders
	useEffect(() => {
		const loadOrders = async () => {
			try {
				// Mock orders data defined inside useEffect to avoid dependency warning
				const mockOrdersData = [
					{
						id: "ORD-12345",
						date: "2023-11-10",
						status: "processing",
						total: 156.99,
						products: [
							{
								id: 1,
								name: "Gentle Foaming Cleanser",
								image:
									"https://placehold.co/100x100/f5f5f5/326e51?text=Cleanser",
								price: 45.99,
								quantity: 1,
								isGift: false,
							},
							{
								id: 2,
								name: "Hydrating Toner",
								image: "https://placehold.co/100x100/f5f5f5/326e51?text=Toner",
								price: 38.5,
								quantity: 1,
								isGift: false,
							},
							{
								id: 3,
								name: "Daily Moisturizer with SPF 30",
								image:
									"https://placehold.co/100x100/f5f5f5/326e51?text=Moisturizer",
								price: 72.5,
								quantity: 1,
								discount: "15%",
								isGift: false,
							},
						],
						timeline: processingTimeline,
					},
					{
						id: "ORD-12344",
						date: "2023-11-08",
						status: "shipping",
						total: 124.5,
						products: [
							{
								id: 4,
								name: "Vitamin C Serum",
								image: "https://placehold.co/100x100/f5f5f5/326e51?text=Serum",
								price: 85.0,
								quantity: 1,
								isGift: false,
							},
							{
								id: 5,
								name: "Night Repair Cream",
								image: "https://placehold.co/100x100/f5f5f5/326e51?text=Cream",
								price: 39.5,
								quantity: 1,
								isGift: true,
							},
						],
						timeline: shippingTimeline,
					},
					{
						id: "ORD-12343",
						date: "2023-11-05",
						status: "delivered",
						total: 162.97,
						products: [
							{
								id: 6,
								name: "Hyaluronic Acid Serum",
								image:
									"https://placehold.co/100x100/f5f5f5/326e51?text=HA+Serum",
								price: 54.99,
								quantity: 1,
								isGift: false,
							},
							{
								id: 7,
								name: "Clay Purifying Mask",
								image: "https://placehold.co/100x100/f5f5f5/326e51?text=Mask",
								price: 35.99,
								quantity: 1,
								isGift: false,
							},
							{
								id: 8,
								name: "Eye Rejuvenating Cream",
								image:
									"https://placehold.co/100x100/f5f5f5/326e51?text=Eye+Cream",
								price: 71.99,
								quantity: 1,
								isGift: false,
							},
						],
						deliveryDate: "2023-11-07",
					},
					{
						id: "ORD-12342",
						date: "2023-10-28",
						status: "cancelled",
						total: 93.5,
						products: [
							{
								id: 9,
								name: "Retinol Night Serum",
								image:
									"https://placehold.co/100x100/f5f5f5/326e51?text=Retinol",
								price: 93.5,
								quantity: 1,
								isGift: false,
							},
						],
						cancelReason: "Requested by customer",
					},
				];

				// Simulate API call delay
				await new Promise((resolve) => setTimeout(resolve, 1500));
				setOrders(mockOrdersData);
			} catch (error) {
				console.error("Error loading orders:", error);
			} finally {
				setLoading(false);
			}
		};

		loadOrders();
	}, [processingTimeline, shippingTimeline]);

	// Filter orders based on active tab
	const getFilteredOrders = () => {
		let filtered = [...orders];

		// Apply tab filter
		if (activeTab === 1) {
			filtered = filtered.filter((order) => order.status === "processing");
		} else if (activeTab === 2) {
			filtered = filtered.filter((order) => order.status === "shipping");
		} else if (activeTab === 3) {
			filtered = filtered.filter((order) => order.status === "delivered");
		} else if (activeTab === 4) {
			filtered = filtered.filter((order) => order.status === "cancelled");
		}

		// Apply time filter
		if (timeFilter === "last30days") {
			const thirtyDaysAgo = new Date();
			thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

			filtered = filtered.filter((order) => {
				const orderDate = new Date(order.date);
				return orderDate >= thirtyDaysAgo;
			});
		} else if (timeFilter === "last6months") {
			const sixMonthsAgo = new Date();
			sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

			filtered = filtered.filter((order) => {
				const orderDate = new Date(order.date);
				return orderDate >= sixMonthsAgo;
			});
		}

		return filtered;
	};

	const renderOrderSkeletons = () => {
		return Array(3)
			.fill()
			.map((_, index) => (
				<div key={index} className={styles.orderSkeleton}>
					<div className={styles.orderHeader}>
						<Skeleton width="200px" height="24px" />
						<Skeleton width="120px" height="24px" />
					</div>
					<div className={styles.orderProducts}>
						{Array(2)
							.fill()
							.map((_, i) => (
								<div key={i} className={styles.productSkeleton}>
									<Skeleton shape="rectangle" width="80px" height="80px" />
									<div className={styles.productInfo}>
										<Skeleton width="70%" height="20px" />
										<Skeleton width="30%" height="20px" />
									</div>
									<Skeleton width="60px" height="24px" />
								</div>
							))}
					</div>
					<div className={styles.orderFooter}>
						<Skeleton width="150px" height="36px" />
					</div>
				</div>
			));
	};

	const customTimelineTemplate = (item) => {
		return (
			<div className={styles.timelineEvent}>
				<div
					className={styles.timelineIcon}
					style={{ backgroundColor: item.color }}
				>
					<i className={item.icon}></i>
				</div>
				<div className={styles.timelineContent}>
					<h4>{item.status}</h4>
					<p>{item.date}</p>
					<p>{item.description}</p>
				</div>
			</div>
		);
	};

	const periodOptions = [
		{ label: "All Time", value: "all" },
		{ label: "Last 30 Days", value: "last30days" },
		{ label: "Last 6 Months", value: "last6months" },
	];

	const OrdersList = ({ orders }) => {
		if (orders.length === 0) {
			return (
				<div className={styles.emptyOrders}>
					<img
						src="https://placehold.co/120x120/f5f5f5/326e51?text=Empty"
						alt="No orders"
						className={styles.emptyCartImage}
					/>
					<h3>You don&apos;t have any orders yet</h3>
					<Button
						label="Start Shopping"
						icon="pi pi-shopping-bag"
						className={styles.shopButton}
						onClick={() => (window.location.href = "/")}
					/>
				</div>
			);
		}

		return (
			<div className={styles.ordersList}>
				{orders.map((order) => (
					<div key={order.id} className={styles.orderCard}>
						<div className={styles.orderHeader}>
							<div className={styles.orderMeta}>
								<div className={styles.orderNumber}>
									<span className={styles.orderLabel}>Order:</span>
									<span className={styles.orderId}>{order.id}</span>
								</div>
								<div className={styles.orderDate}>
									<span className={styles.orderLabel}>Date:</span>
									<span>{order.date}</span>
								</div>
							</div>
							<div className={`${styles.orderStatus} ${styles[order.status]}`}>
								{order.status === "processing" && "Processing"}
								{order.status === "shipping" && "Shipping"}
								{order.status === "delivered" && "Delivered"}
								{order.status === "cancelled" && "Cancelled"}
							</div>
						</div>

						<div className={styles.orderProducts}>
							{order.products.map((product) => (
								<div key={product.id} className={styles.productItem}>
									<div className={styles.productImage}>
										<img src={product.image} alt={product.name} />
										{product.discount && (
											<span className={styles.discountBadge}>
												{product.discount}
											</span>
										)}
									</div>
									<div className={styles.productInfo}>
										<div className={styles.productName}>{product.name}</div>
										{product.isGift && (
											<span className={styles.giftLabel}>Gift</span>
										)}
										<div className={styles.productQty}>
											Qty: {product.quantity}
										</div>
									</div>
									<div className={styles.productPrice}>
										${product.price.toFixed(2)}
									</div>
								</div>
							))}
						</div>

						<div className={styles.orderSummary}>
							<div className={styles.orderTotal}>
								Total:
								<span className={styles.totalAmount}>
									${order.total.toFixed(2)}
								</span>
							</div>
							<Button
								label="Buy Again"
								icon="pi pi-refresh"
								className={styles.buyAgainButton}
							/>
						</div>

						{(order.status === "processing" || order.status === "shipping") && (
							<div className={styles.orderTimeline}>
								<h3>Order Progress</h3>
								<Timeline
									value={order.timeline}
									content={customTimelineTemplate}
									className={styles.timeline}
								/>
							</div>
						)}

						{order.status === "delivered" && (
							<div className={styles.orderTimeline}>
								<h3>Delivery Information</h3>
								<p>Your order was delivered on {order.deliveryDate}</p>
							</div>
						)}

						{order.status === "cancelled" && (
							<div className={styles.orderCancel}>
								<p className={styles.cancelReason}>
									<strong>Cancellation reason:</strong> {order.cancelReason}
								</p>
							</div>
						)}
					</div>
				))}
			</div>
		);
	};

	OrdersList.propTypes = {
		orders: PropTypes.array.isRequired,
	};

	return (
		<div className={styles.ordersContainer}>
			<div className={styles.ordersHeader}>
				<h1>My Orders</h1>
				<Dropdown
					value={timeFilter}
					options={periodOptions}
					onChange={(e) => setTimeFilter(e.value)}
					className={styles.periodFilter}
				/>
			</div>

			<TabView
				activeIndex={activeTab}
				onTabChange={(e) => setActiveTab(e.index)}
				className={styles.ordersTabs}
			>
				<TabPanel header="All Orders">
					{loading ? (
						renderOrderSkeletons()
					) : (
						<OrdersList orders={getFilteredOrders()} />
					)}
				</TabPanel>
				<TabPanel header="Processing">
					{loading ? (
						renderOrderSkeletons()
					) : (
						<OrdersList orders={getFilteredOrders()} />
					)}
				</TabPanel>
				<TabPanel header="Shipping">
					{loading ? (
						renderOrderSkeletons()
					) : (
						<OrdersList orders={getFilteredOrders()} />
					)}
				</TabPanel>
				<TabPanel header="Delivered">
					{loading ? (
						renderOrderSkeletons()
					) : (
						<OrdersList orders={getFilteredOrders()} />
					)}
				</TabPanel>
				<TabPanel header="Cancelled">
					{loading ? (
						renderOrderSkeletons()
					) : (
						<OrdersList orders={getFilteredOrders()} />
					)}
				</TabPanel>
			</TabView>
		</div>
	);
};

export default Orders;
