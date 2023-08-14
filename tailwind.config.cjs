/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			sans: ['Gotham SSm A', 'sans-serif'],
            montserrat: ['Montserrat', 'sans-serif'],
            raleway: ['Raleway', 'sans-serif'],
            roboto: ['Roboto', 'sans-serif']
		},
		extend: {},
	},
	plugins: [],
}
