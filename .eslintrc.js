module.exports = {
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true,
    "mocha": true,
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "rules": {
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": 0,
    "comma-dangle": ["warn", "always-multiline"],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-unused-vars": ["warn"],
    "no-console": 0,
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2017,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
};
