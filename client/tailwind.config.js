/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-color-2": "#212121",
        "dark-color-1": "#030014",
        "main-color-1": "#0bb39f",
        "secondary-color": "#049d8e", 
        "dark-layer-1": "#282828",
        "dark-layer-2": "#1a1a1a",
        "dark-label-2": "rgba(239, 241, 246, 0.75)",
        "dark-divider-border-2": "#3d3d3d",
        "dark-fill-2": "rgba(255, 255, 255, 0.14)",
        "dark-fill-3": "rgba(255, 255, 255, 0.1)",
        "dark-gray-6": "#8a8a8a",
        "dark-gray-7": "#b3b3b3",
        "gray-8": "#262626",
        "dark-gray-8": "#dbdbdb",
        "brand-orange": "#ffa116",
        "brand-orange-s": "#c17a0f",
        "dark-yellow": "#ffc01e",
        "dark-pink": "#ff375f",
        olive: "#00b8a3",
        "dark-green-s": "#2cbb5d",
        "dark-blue-s": "#0a84ff",
      },
    },
  },
  plugins: [],
};