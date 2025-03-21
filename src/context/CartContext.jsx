import {
	createContext,
	useState,
	useContext,
	useEffect,
	useCallback,
} from "react";
import { getOrderDetails } from "../api/orderService";
import { useAuth } from "../utils/useAuth";
import PropTypes from "prop-types";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cartCount, setCartCount] = useState(0);
	const { loading: authLoading } = useAuth();

	const updateCartCount = useCallback(async () => {
		if (!authLoading) {
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
	}, [authLoading]);

	useEffect(() => {
		updateCartCount();
	}, [updateCartCount]);

	return (
		<CartContext.Provider value={{ cartCount, updateCartCount }}>
			{children}
		</CartContext.Provider>
	);
};

CartProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);
