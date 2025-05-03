const express = require('express');
const cors = require('cors');
const handler = require('../core/handler');
const AppError = require('../core/helper/AppError');
const authMiddleware = require('../core/auth/auth.middleware')
const bcrypt = require('bcryptjs');
const { generateToken } = require('../core/auth/jwt')

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
  router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {email}
    });
    if(!user) throw new AppError('user not found!', 404);

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) throw new AppError('Password salah', 401);

    const token = generateToken({
      id: user.id
    })
    res.json({ token });
  });

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

  return router;
}

module.exports = createRoute;
