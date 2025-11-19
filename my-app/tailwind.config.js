// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
	// ... other configs
	theme: {
		extend: {
			fontFamily: {
				// This adds 'Inter' to the start of the default sans font stack
				sans: ["Arial", "sans-serif"],
			},
		},
	},
	// ...
};
