/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'];
export const theme = {
  extend: {
    textColor: ['hover'],
  },
};
export const plugins = [require('flowbite/plugin')];
