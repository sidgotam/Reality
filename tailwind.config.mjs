/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
	theme: {
		extend: {
			colors: {
				// Dark theme palette with orange/red accents (Indian reality-show vibe)
				ink: {
					DEFAULT: '#0a0a0a',
					soft: '#111111',
					elevated: '#1a1a1a',
					'800': '#1f1f1f',
					'700': '#2a2a2a',
					'600': '#3a3a3a',
				},
				brand: {
					orange: '#ff6a00',
					'orange-soft': '#ff8a3d',
					red: '#ff2d55',
					'gold': '#ffb700',
				},
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				display: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			boxShadow: {
				card: '0 10px 30px -12px rgba(0,0,0,0.7)',
				glow: '0 0 40px -10px rgba(255,106,0,0.45)',
			},
			backdropBlur: {
				xs: '4px',
			},
			keyframes: {
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				'slide-up': {
					from: { opacity: '0', transform: 'translateY(12px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
			},
			animation: {
				'fade-in': 'fade-in 0.5s ease-out both',
				'slide-up': 'slide-up 0.5s ease-out both',
			},
		},
	},
	plugins: [],
};