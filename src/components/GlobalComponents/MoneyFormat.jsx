// components/GlobalComponents/MoneyFormat.jsx
const MoneyFormat = (price) => {
	if (typeof price !== "number") {
		price = parseFloat(price);
	}
	if (isNaN(price)) {
		return "Invalid Price";
	}
	return (
		<span style={{ whiteSpace: "nowrap" }}>
			{price.toLocaleString("vi-VN", {
				style: "decimal",
				minimumFractionDigits: 0,
			}) + " ₫"}
		</span>
	);
};

export default MoneyFormat;
