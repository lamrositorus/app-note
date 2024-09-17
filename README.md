
# App Note

App Note adalah aplikasi catatan sederhana berbasis web yang memungkinkan pengguna untuk membuat, mengedit, dan menghapus catatan. Aplikasi ini dirancang untuk memberikan pengalaman pengguna yang efisien dan responsif.

## Prasyarat
Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) dan [npm](https://www.npmjs.com/) di komputer Anda.

## Instalasi

### 1. Clone Repositori
Clone repositori ini ke komputer Anda:
```bash
git clone https://github.com/lamrositorus/app-note.git
cd app-note
```

### 2. Install Dependencies
Setelah berhasil masuk ke direktori proyek, jalankan perintah berikut untuk menginstal semua dependencies yang dibutuhkan:
```bash
npm install
```

### 3. Menjalankan Aplikasi Secara Lokal
Untuk menjalankan aplikasi dalam mode pengembangan:
```bash
npm run dev
```
Aplikasi akan berjalan di [http://localhost:8080](http://localhost:8080) secara default.

### 4. Build untuk Produksi
Jika Anda ingin membuild proyek untuk environment produksi, jalankan:
```bash
npm run build 
```
File build akan tersedia di folder `dist`.

## Struktur Proyek
Berikut adalah struktur folder utama dari proyek ini:
plaintext
app-note/
├── src/
│   ├── components/
│   │   ├── app-header.js
│   │   ├── loading-indicator.js
│   │   ├── note-form.js
│   │   └── note-item.js
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── template.html
├── .babelrc
├── .eslintrc.js
├── .prettierignore
├── .prettierrc
├── package.json
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js


## Teknologi yang Digunakan
- **JavaScript ES6**: Digunakan untuk fungsionalitas logika aplikasi.
- **Webpack**: Digunakan untuk module bundling.
- **CSS**: Mengatur tampilan dan tata letak aplikasi.
- **Babel**: Compiler untuk menggunakan fitur modern JavaScript.
- **ESLint**: Linter untuk memastikan kualitas kode.
- **Prettier**: Formatter kode untuk konsistensi gaya penulisan.

## Kontribusi
Jika Anda ingin berkontribusi dalam pengembangan proyek ini, silakan buat pull request atau buka issue baru.

---
