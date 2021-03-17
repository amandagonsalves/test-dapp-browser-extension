module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        '30/100': '30% minmax(30%, 1fr) 30%',
      }
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(['disabled'])
  },
  plugins: [],
}
