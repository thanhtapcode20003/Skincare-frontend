/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				hasaki: "#326e51",
				primary: "#065f46", // Ensure this is correctly set
			},
		},
	},
	plugins: [],
};
