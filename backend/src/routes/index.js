const express = require("express");
const handler = require("../core/handler");
const authMiddleware = require("../core/auth/auth.middleware");
const upload = require("../middleware/upload"); // Pastikan baris ini tidak dikomentari
const cors = require("cors");

// Import test controller
const testController = require("../modules/test/test.controller");

function createRoute(app) {
  // CORS HARUS PALING ATAS!
  app.use(
    cors({
      origin: [
        "http://localhost:5173", // development
        "https://smart-feed-frontend.vercel.app", // production frontend
        "https://smart-feed-frontend-avbrgdc50-syafiq-syadidul-azmis-projects.vercel.app", // deployment URL
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      optionsSuccessStatus: 200,
    })
  );

  // Handle preflight requests
  app.options("*", cors());

  // EXPRESS.JSON SETELAH CORS!
  app.use(express.json());

  app.use("/api/v1", v1());
  app.use("*", handler.errorHandler.notFoundHandler);
  app.use(handler.errorHandler.globalErrorHandler);
}

function v1() {
  const router = express.Router();

  // Test endpoints (temporarily disabled to debug)
  // router.get("/test/database", testController.testDatabase);
  // router.get("/test/storage", testController.testStorage);
  // router.get("/test/all", testController.testAll);

  const authHandler = require("../core/auth/auth.controller");
  const kandangHandler = require("../modules/kandang/kandang.controller");
  const sapiHandler = require("../modules/sapi/sapi.controller");
  const pakanHandler = require("../modules/pakan/pakan.controller");
  // const jadwalHandler = require("../modules/jadwal/jadwal.controller");
  const recordHandler = require("../modules/record/record.controller");

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

  return router;
}

module.exports = createRoute;
