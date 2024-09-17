// Import module path untuk menangani path file
const path = require("path");
// Import HtmlWebpackPlugin untuk menghasilkan file HTML secara otomatis
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Ekspor konfigurasi Webpack yang umum digunakan di semua lingkungan
module.exports = {
  // Titik masuk aplikasi, berisi file JavaScript utama
  entry: "./src/script.js",
  output: {
    // Lokasi folder output untuk file hasil build
    path: path.resolve(__dirname, "dist"),
    // Nama file bundle hasil build
    filename: "bundle.js",
  },
  module: {
    rules: [
      // Loader untuk file CSS
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // Loader untuk file JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/, // Abaikan folder node_modules
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // Preset untuk transpilasi JavaScript modern
          },
        },
      },
    ],
  },
  plugins: [
    // Plugin untuk menghasilkan file HTML
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: "index.html",
    }),
  ],
};
