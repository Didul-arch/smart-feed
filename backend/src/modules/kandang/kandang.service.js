const kandangRepository = require('./kandang.repository');

class KandangService {
  async getAll() {
    return kandangRepository.findAll();
  }

  async getById(id) {
    return kandangRepository.findById(id);
  }

  async create(data) {
    return kandangRepository.create(data);
  }

  async update(id, data) {
    return kandangRepository.update(id, data);
  }

  async delete(id) {
    return kandangRepository.delete(id);
  }
}

module.exports = new KandangService();