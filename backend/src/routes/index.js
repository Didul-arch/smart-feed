const express = require('express');
const cors = require('cors');
const handler = require('../core/handler');
const authMiddleware = require('../core/auth/auth.middleware');

function createRoute(app) {
  app.use(express.json());
  app.use(cors());

  app.use('/api/v1', v1());
  app.use(/(.*)/, handler.errorHandler.notFoundHandler);
  app.use(handler.errorHandler.globalErrorHandler);
}

function v1() {
  const router = express.Router();

  // Auth 
  router.post('/login', handler.authHandler.login);
  router.post('/refresh', handler.authHandler.refresh);

  router.use(authMiddleware);

  // Sapi routes
  router.post('/sapi', handler.sapiHandler.create);
  router.get('/sapi', handler.sapiHandler.getAll);
  router.get('/sapi/:id', handler.sapiHandler.getById);
  router.delete('/sapi/:id', handler.sapiHandler.delete);
  router.patch('/sapi/:id', handler.sapiHandler.update);

  // Kandang routes
  router.post('/kandang', handler.kandangHandler.create);
  router.get('/kandang', handler.kandangHandler.getAll);
  router.get('/kandang/:id', handler.kandangHandler.getById);
  router.delete('/kandang/:id', handler.kandangHandler.delete);
  router.patch('/kandang/:id', handler.kandangHandler.update);

  // Pakan routes
  router.post('/pakan', handler.pakanHandler.create);
  router.get('/pakan', handler.pakanHandler.getAll);
  router.get('/pakan/:id', handler.pakanHandler.getById);
  router.delete('/pakan/:id', handler.pakanHandler.delete);
  router.patch('/pakan/:id', handler.pakanHandler.update);

  // Jadwal routes
  router.post('/jadwal', handler.jadwalHandler.setJadwal); // Membuat/mengupdate jadwal harian untuk 1 sapi
  router.get('/jadwal/sapi/:sapiId', handler.jadwalHandler.getJadwalSapi); // Mendapatkan jadwal mingguan 1 sapi
  router.get('/jadwal/kandang/:kandangId/display', handler.jadwalHandler.getJadwalDisplay); // Tampilan utama jadwal kandang per tanggal
  router.patch('/jadwal/sapi/:sapiId/hari/:hari', handler.jadwalHandler.updateJadwalSapiHari); // Update jadwal 1 hari untuk 1 sapi
  router.delete('/jadwal/sapi/:sapiId/hari/:hari', handler.jadwalHandler.deleteJadwalSapiHari); // Hapus jadwal 1 hari untuk 1 sapi


  // Record routes
  router.post('/records', handler.recordHandler.create);
  router.get('/records', handler.recordHandler.getAll);


  return router;
}

module.exports = createRoute;
