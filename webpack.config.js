var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname),
    filename: "./src/bundle.js"
	},
	devtool: "source-map",
  resolve: {
  extensions: [".js", ".jsx", "*"]
  }
};
