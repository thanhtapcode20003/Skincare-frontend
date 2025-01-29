/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure Tailwind scans your files
	theme: {
		extend: {
			colors: {
				hasaki: "#326e51",
			},
		},
	},
	plugins: [],
};
