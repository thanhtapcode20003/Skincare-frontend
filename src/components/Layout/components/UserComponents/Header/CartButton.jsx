import { IoCart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../../../context/CartContext";

export default function CartButton() {
	const { cartCount } = useCart();
	const navigate = useNavigate();

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
				{cartCount > 99 ? "99+" : cartCount}{" "}
			</span>
		</div>
	);
}
