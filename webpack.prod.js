// Import merge dari webpack-merge untuk menggabungkan konfigurasi
const { merge } = require("webpack-merge");
// Import konfigurasi umum
const common = require("./webpack.common.js");

// Ekspor konfigurasi untuk mode produksi
module.exports = merge(common, {
  mode: "production", // Mode produksi
});
