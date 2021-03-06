const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  target: "web",
  entry: path.join(__dirname, "client", "src", "index.tsx"),
  output: {
    publicPath: "/",
    path: path.join(__dirname, "client", "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx|ts$/,
        loader: "awesome-typescript-loader",
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join("client", "src", "public", "index.html"),
      inject: "body",
    }),
  ],
  devServer: {
    writeToDisk: true,
    contentBase: path.join("client", "src", "public"),
    historyApiFallback: true,
    port: 8080,
    proxy: {
      "/profile/api": {
        target: "http://localhost:5000",
        pathRewrite: {
          "/profile": "",
        },
      },
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
};
