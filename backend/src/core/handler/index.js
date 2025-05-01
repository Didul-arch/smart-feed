const errorHandler = require('./error-handler');
const sapiHandler = require('../../modules/sapi/sapi.controller');
const kandangHandler = require('../../modules/kandang/kandang.controller');
const pakanHandler = require('../../modules/pakan/pakan.controller');

module.exports = { errorHandler, sapiHandler, kandangHandler, pakanHandler };