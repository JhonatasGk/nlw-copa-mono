/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      backgroundImage:{
        app: 'url(/bg-web-app.png)',
      },
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },
      colors:{
        brand:{
          green:{
            '500':'#129E57',
          },
          red:{
            '500': '#DB4437'
          },
          yellow:{
            '200': '#fef08a',
            '500': '#F7DD43',
            '700': '#BEAD44'
          }
          
        },
        gray:{
          '100': '#E1E1E6',
          '200': '#C4C4CC',
          '300': '#8D8D99',
          '600': '#323238',
          '800': '#202024',
          '900': '#121214'
        }
      }
    },
  },
  plugins: [],
}
