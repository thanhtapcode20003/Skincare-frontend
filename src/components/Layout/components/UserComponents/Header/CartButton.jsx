import { IoCart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../utils/useAuth";
import { useEffect, useState } from "react";
import { getOrderDetails } from "../../../../../api/orderService";

export default function CartButton() {
	const [cartCount, setCartCount] = useState(0);
	const navigate = useNavigate();
	const { isAuthenticated, loading: authLoading } = useAuth();

	useEffect(() => {
		const fetchCartCount = async () => {
			if (isAuthenticated && !authLoading) {
				try {
					const orderData = await getOrderDetails();
					const cartItems = orderData.items || orderData || [];
					const totalItems = cartItems.reduce(
						(sum, item) => sum + (item.quantity || 1),
						0
					);
					setCartCount(totalItems);
				} catch (error) {
					console.error("Error fetching cart details:", error);
					setCartCount(0);
				}
			} else {
				setCartCount(0);
			}
		};

		fetchCartCount();
	}, [isAuthenticated, authLoading]);

	const handleCartClick = () => {
		navigate("/cart");
	};

	return (
		<div className="cart relative mt-2">
			<button onClick={handleCartClick}>
				<IoCart className="min-w-10 min-h-9 cursor-pointer text-white" />
			</button>
			<span
				className="absolute top-0 right-0 bg-orange text-white text-xs w-6 h-6 flex items-center justify-center rounded-full translate-x-2 -translate-y-2"
				style={{ fontSize: "0.75rem", fontWeight: "bold" }}
			>
				{cartCount}
			</span>
		</div>
	);
}
