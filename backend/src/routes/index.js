const express = require("express");
const {
errorHandler, sapiHandler, kandangHandler, pakanHandler, authHandler, jadwalHandler, recordHandler
} = require("../core/handler");
const authMiddleware = require("../core/auth/auth.middleware");
const upload = require("../middleware/upload"); // Pastikan baris ini tidak dikomentari
const cors = require("cors");

function createRoute(app) {
  // CORS HARUS PALING ATAS!
  app.use(
    cors({
      origin: [
        "http://localhost:5173", 
        "https://smart-feed-frontend.vercel.app", 
        "https://smart-feed-frontend-avbrgdc50-syafiq-syadidul-azmis-projects.vercel.app",
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Pastikan OPTIONS ada di sini
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      optionsSuccessStatus: 204, // Menggunakan 204 untuk preflight success
    })
  );

  // app.options("*", cors()); // Baris ini dihapus karena app.use(cors(options)) di atas seharusnya sudah menangani preflight

  // EXPRESS.JSON SETELAH CORS!
  app.use(express.json());

  app.use("/api/v1", v1());
  app.use("*", errorHandler.notFoundHandler);
  app.use(errorHandler.globalErrorHandler);
}

function v1() {
  const router = express.Router();
  // Auth
  router.post("/login", authHandler.login);

  // Kandang
  router.get("/kandang", authMiddleware, kandangHandler.getAll);
  router.get("/kandang/:id", authMiddleware, kandangHandler.getById);
  router.post("/kandang", authMiddleware, kandangHandler.create);
  router.put("/kandang/:id", authMiddleware, kandangHandler.update);
  router.delete("/kandang/:id", authMiddleware, kandangHandler.delete);

  // Sapi
  router.get("/sapi", authMiddleware, sapiHandler.getAll);
  router.get("/sapi/:id", authMiddleware, sapiHandler.getById);
  router.post(
    "/sapi",
    authMiddleware,
    upload.single("image"),
    sapiHandler.create
  );
  router.put(
    "/sapi/:id",
    authMiddleware,
    upload.single("image"),
    sapiHandler.update
  );
  router.delete("/sapi/:id", authMiddleware, sapiHandler.delete);

  // Pakan
  router.get("/pakan", authMiddleware, pakanHandler.getAll);
  router.get("/pakan/:id", authMiddleware, pakanHandler.getById);
  router.post("/pakan", authMiddleware, pakanHandler.create);
  router.put("/pakan/:id", authMiddleware, pakanHandler.update);
  router.delete("/pakan/:id", authMiddleware, pakanHandler.delete);

  // Record
  router.get("/records", authMiddleware, recordHandler.getAll);
  router.get("/records/:id", authMiddleware, recordHandler.getById);
  router.post("/records", authMiddleware, recordHandler.create);
  router.put("/records/:id", authMiddleware, recordHandler.update);
  router.delete("/records/:id", authMiddleware, recordHandler.delete);

  // Jadwal
  router.post("/jadwal", jadwalHandler.setJadwal); // Membuat/mengupdate jadwal harian untuk 1 sapi
  router.get("/jadwal/sapi/:sapiId", jadwalHandler.getJadwalSapi); // Mendapatkan jadwal mingguan 1 sapi
  router.get(
    "/jadwal/kandang/:kandangId/display",
    jadwalHandler.getJadwalDisplay
  ); // Tampilan utama jadwal kandang per tanggal
  router.patch(
    "/jadwal/sapi/:sapiId/hari/:hari",
    jadwalHandler.updateJadwalSapiHari
  ); // Update jadwal 1 hari untuk 1 sapi
  router.delete(
    "/jadwal/sapi/:sapiId/hari/:hari",
    jadwalHandler.deleteJadwalSapiHari
  ); // Hapus jadwal 1 hari untuk 1 sapi


  return router;
}

module.exports = createRoute;
