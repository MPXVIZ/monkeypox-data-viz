const Dotenv = require("dotenv-webpack")

module.exports = {
	entry: ["./client/index.js"],
	mode: "development",
	output: {
		path: __dirname,
		filename: "./public/bundle.js",
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-react"],
				},
			},
			{
				test: /\.scss$/i,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
		],
	},
	plugins: [new Dotenv()],
}
