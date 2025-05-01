const jadwalRepository = require('./pakan.repository');

class jadwalService {
  async getAll() {
    return jadwalRepository.findAll();
  }

  async getById(id) {
    return jadwalRepository.findById(id);
  }

  async create(data) {
    return jadwalRepository.create(data);
  }

  async update(id, data) {
    return jadwalRepository.update(id, data);
  }

  async delete(id) {
    return jadwalRepository.delete(id);
  }
}

module.exports = new jadwalService();