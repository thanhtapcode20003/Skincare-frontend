import { IoCart } from "react-icons/io5";

export default function CartButton() {
	const cartCount = 97;

	return (
		<div className="cart relative mt-2">
			<button>
				<IoCart className="min-w-10 min-h-9" />
			</button>
			{cartCount > 0 && (
				<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
					{cartCount}
				</span>
			)}
		</div>
	);
}
