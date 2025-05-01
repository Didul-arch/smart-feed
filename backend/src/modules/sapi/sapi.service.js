const sapiRepository = require('./sapi.repository');

class SapiService {
  async getAll() {
    return sapiRepository.findAll();
  }

  async getById(id) {
    return sapiRepository.findById(id);
  }

  async create(data) {
    return sapiRepository.create(data);
  }

  async update(id, data) {
    return sapiRepository.update(id, data);
  }

  async delete(id) {
    return sapiRepository.delete(id);
  }
}

module.exports = new SapiService();