module.exports = {
  parser: "babel-eslint",
  extends: "airbnb",
  env: {
    browser: true,
    node: true
  },
  rules: {
    "linebreak-style": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-console":"off",
    "quotes":["error","double"],
    "no-undef":"off",
    "react/react-in-jsx-scope":"off",
    "func-names":"off",
    "class-methods-use-this": "off",
    "react/jsx-one-expression-per-line":"off",
    "jsx-a11y/media-has-caption":"off"
  },
};
