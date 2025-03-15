import { IoCart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function CartButton() {
	const cartCount = 97;
	const navigate = useNavigate(); // Hook to handle navigation

	// Function to handle click event
	const handleCartClick = () => {
		navigate("/cart"); // Navigate to /cart route
	};

	return (
		<div className="cart relative mt-2">
			<button onClick={handleCartClick}>
				<IoCart className="min-w-10 min-h-9 cursor-pointer" />
			</button>
			{cartCount > 0 && (
				<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
					{cartCount}
				</span>
			)}
		</div>
	);
}
