/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class', // Включаем режим темной темы
    theme: {
        extend: {
            backgroundColor: {
                'theme-light': '#ffffff',
                'theme-dark': '#000000',
            },
            textColor: {
                'theme-light': '#000000',
                'theme-dark': '#ffffff',
            },
        },
    },
    plugins: [],
}
