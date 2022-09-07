/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",'./node_modules/tw-elements/dist/js/**/*.js'
  ],
  plugins: [
    require('tw-elements/dist/plugin')
  ],
  theme: {
    extend: {
      colors: {
        'black': '#000000DE',
      },
      zIndex:{
        '100':'100',
      },
    }
  }
}
