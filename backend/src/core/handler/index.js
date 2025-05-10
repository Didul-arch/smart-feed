const errorHandler = require('./error-handler');
const sapiHandler = require('../../modules/sapi/sapi.controller');
const kandangHandler = require('../../modules/kandang/kandang.controller');
const pakanHandler = require('../../modules/pakan/pakan.controller');
const jadwalHandler = require('../../modules/jadwal/jadwal.controller');
const authHandler = require('../../core/auth/auth.controller');

module.exports = { errorHandler, sapiHandler, kandangHandler, pakanHandler, authHandler, jadwalHandler };