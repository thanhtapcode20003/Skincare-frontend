const FormatDate = (dateString) => {
	if (!dateString) return "N/A";
	const date = new Date(dateString);
	if (isNaN(date.getTime())) return "Invalid Date";
	return date.toLocaleString("en-US", {
		month: "long",
		day: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};

export default FormatDate;
