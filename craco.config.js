import tailwindcss from 'tailwindcss';

export const style = {
  postcss: {
    plugins: [
      tailwindcss('./tailwind.config.js'),
      require('autoprefixer'),
    ],
  },
};