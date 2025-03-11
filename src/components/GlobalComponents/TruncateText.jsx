const TruncateText = (text, maxLength) => {
	if (!text) return "";

	// If the text length is less than or equal to maxLength, return it as is
	if (text.length <= maxLength) return text;

	// Split the text into words
	const words = text.split(/\s+/); // Split by one or more whitespace characters
	let truncatedText = "";
	let currentLength = 0;

	// Add words until we exceed maxLength
	for (const word of words) {
		// Include the space after the word in the length calculation
		const wordLength = word.length + (truncatedText ? 1 : 0); // Add 1 for the space if not the first word
		if (currentLength + wordLength > maxLength) {
			break; // Stop if adding the next word would exceed maxLength
		}
		// Add the word to the truncated text
		truncatedText += (truncatedText ? " " : "") + word;
		currentLength += wordLength;
	}

	// If no words fit within maxLength, fall back to character-based truncation
	if (!truncatedText) {
		return text.substring(0, maxLength) + "...";
	}

	// Append ellipsis if the text was truncated
	return truncatedText + "...";
};

export default TruncateText;
