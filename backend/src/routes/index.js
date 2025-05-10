const express = require('express');
const cors = require('cors');
const handler = require('../core/handler');
const authMiddleware = require('../core/auth/auth.middleware')


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

  // Sapi routes
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

  // Kandang Routes
  router.post('/kandang', handler.kandangHandler.create);
  router.get('/kandang', handler.kandangHandler.getAll);
  router.get('/kandang/:id', handler.kandangHandler.getById);
  router.delete('/kandang/:id', handler.kandangHandler.delete);
  router.patch('/kandang/:id', handler.kandangHandler.update);
  
  // JadwalRoutes
  router.post('/jadwal', handler.jadwalHandler.create);
  router.get('/jadwal', handler.jadwalHandler.getAll);

  // Status routes harus sebelum /jadwal/:id
  router.get('/jadwal/status', handler.jadwalHandler.getStatusAllSapi);
  router.get('/jadwal/status/:sapiId', handler.jadwalHandler.getStatusBySapiId);

  router.get('/jadwal/:id', handler.jadwalHandler.getById);
  router.delete('/jadwal/:id', handler.jadwalHandler.delete);
  router.patch('/jadwal/:id', handler.jadwalHandler.update);

// ...existing code...

  return router;
}

module.exports = createRoute;
