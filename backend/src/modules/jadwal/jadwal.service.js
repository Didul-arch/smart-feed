const jadwalRepository = require('./jadwal.repository');

class JadwalService {
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

  async resetDailyRecords(jadwalId, userId) {
    const today = new Date();
    const records = {
      userId,
      timestamp: today,
    };
    return jadwalRepository.resetRecords(jadwalId, records);
  }
}

module.exports = new JadwalService();