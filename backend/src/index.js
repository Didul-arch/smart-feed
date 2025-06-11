const express = require("express");
const app = express();
const dotenv = require("dotenv");
const createRoute = require("./routes/index");
const cors = require("cors"); // Tambahkan ini
dotenv.config();

const PORT = process.env.PORT;

// Konfigurasi CORS
const whitelist = [
  'http://localhost:5173', // URL frontend lokal kamu (sesuaikan port jika berbeda)
  'https://nama-project-frontend-kamu.vercel.app' // GANTI DENGAN URL FRONTEND VERCEL KAMU
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) { // Izinkan juga request tanpa origin (misal dari Postman)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Izinkan cookies
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); // Gunakan middleware cors dengan opsi

// Middleware untuk parsing body JSON
app.use(express.json()); // Pastikan ini ada untuk mem-parse body JSON dari request

app.get("/healthcheck", (req, res) => {
  res.json({
    message: "Halalaloaoo! Page utama",
    uptime: process.uptime(),
  });
});

// HAPUS function createRoute ini, udah ada di routes/index.js
createRoute(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
