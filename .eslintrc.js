module.exports = {
  parser: "babel-eslint",
  extends: [
    "react-app",
    "airbnb"
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/destructuring-assignment": [1],
    "react/prop-types": [1]
  }
}