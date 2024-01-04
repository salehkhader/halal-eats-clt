/** @type {import('tailwindcss').Config} */

import tailwindForms from "@tailwindcss/forms"

export default {
	content: [
		"./index.html",
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [tailwindForms],
}
