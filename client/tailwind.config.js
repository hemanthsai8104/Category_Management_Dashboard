/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#4f46e5',
                    hover: '#4338ca',
                },
                secondary: '#cbd5e1',
                sidebar: {
                    bg: '#1e293b',
                    text: '#e2e8f0',
                }
            }
        },
    },
    plugins: [],
}
