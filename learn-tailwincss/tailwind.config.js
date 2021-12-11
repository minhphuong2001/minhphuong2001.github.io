module.exports = {
  mode: 'jit',
  content: [
    './**/*.html',
    './**/*.{js,jsx,ts,tsx,vue}',
  ],
  content: [],
  theme: {
    extend: {
      spacing: {
        35: '35px'
      },
      color: {
        gray33: '#333'
      }
    },
  },
  plugins: [],
}
