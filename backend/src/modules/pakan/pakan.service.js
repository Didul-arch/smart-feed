const pakanRepository = require('./pakan.repository');

class PakanService {
  async getAll() {
    return pakanRepository.findAll();
  }

  async getById(id) {
    return pakanRepository.findById(id);
  }

  async create(data) {
    return pakanRepository.create(data);
  }

  async update(id, data) {
    return pakanRepository.update(id, data);
  }

  async delete(id) {
    return pakanRepository.delete(id);
  }
}

module.exports = new PakanService();