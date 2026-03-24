/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Laundry', 'Nunito', 'Inter', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
        'cute': ['Comfortaa', 'cursive'],
        'brand': ['AtoZ', 'cursive'],
        'main': ['Laundry', 'Nunito', 'sans-serif'],
      },
      colors: {
        'cream': '#F8F6F0',
        'charcoal': '#1A1A1A',
        'accent': '#FF4500',
        'pink': '#FF69B4',
        'lavender': '#E6E6FA',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'bounce-soft': 'bounceSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}