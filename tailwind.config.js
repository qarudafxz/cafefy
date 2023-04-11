/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundColor: {
				primary: "#131313",
				secondary: "#8B2801",
				cream: "#F8DEC6",
			},
			textColor: {
				cream: "#F8DEC6",
			},
			backgroundImage: {
				bg: "url('/src/assets/images/bg.svg')",
			},
			fontFamily: {
				primary: ["Poppins", "sans-serif"],
			},
			margin: {
				xxxsm: "35px",
				xxsm: "45px",
				xsm: "55px",
				sm: "65px",
				md: "75px",
				lg: "105px",
			},
			height: {
				max: "50vh",
			},
			screens: {
				xxxsm: "275px",
				xxsm: "375px",
				xsm: "425px",
				sm: "768px",
				md: "1024px",
				lg: "1280px",
				xl: "1536px",
			},
		},
	},
	plugins: [],
};
