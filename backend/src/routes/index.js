const express = require('express');
const cors = require('cors');
const handler = require('../core/handler');

function createRoute(app) {
  app.use(express.json());
  app.use(cors());

  app.use('/api/v1', v1());
  app.use(/(.*)/, handler.errorHandler.notFoundHandler);
  app.use(handler.errorHandler.globalErrorHandler);
}

function v1() {
  const router = express.Router();

  // Sapi routes
  router.post('/sapi', handler.sapiHandler.addSapi);
  router.get('/sapi', handler.sapiHandler.getAllSapi);
  router.get('/sapi/:id', handler.sapiHandler.getSapiById);
  router.delete('/sapi/:id', handler.sapiHandler.delSapi);
  router.patch('/sapi/:id', handler.sapiHandler.updateSapi);

  return router;
}

module.exports = createRoute;
