// lint-staged.config.cjs
module.exports = {
  '*.{js,ts,tsx,json,css,md}': ['prettier --write'],
  '*.{js,ts,tsx}': ['eslint --fix'],
};
