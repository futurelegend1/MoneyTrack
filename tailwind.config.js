/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // scan React + TS files
  ],
  theme: {
    extend: {}, // you can customize your theme here // inside the extend you can add your own css styles 
    // you need to do fontFamily: {} this is build in tailwind css and inside you can have somthing like 
    // fontFamily: {
    //   'custom': ['YourFontName', 'sans-serif'],
    // }, and you can use font-custom in your classNames fontFamily is only used for fonts for other css properties you can directly add them here
    // use the officail website for more info https://tailwindcss.com/docs/theme
  },
  plugins: [],
};

