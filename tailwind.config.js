/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        bgBlue: 'rgb(16, 17, 76)',
        offWhite: '#f9f3f3',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.offWhite'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.600'),
              },
            },
            p: {
              color: theme('colors.offWhite'),
              marginTop: '1rem',
            },
          }
        }
      })
    },
  },
  plugins: [require("daisyui")],
};
