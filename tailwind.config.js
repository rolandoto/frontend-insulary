/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // ajusta según tu framework
    ],
    theme: {
        extend: {
          fontFamily: {
            lusitana: ['Lusitana', 'latin'],
          },
        },
      },
    plugins: [],
  }