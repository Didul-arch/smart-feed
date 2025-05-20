const jadwalRepository = require('./jadwal.repository');

class JadwalService {
  async getAll(filters) {
    return jadwalRepository.findAll(filters);
  }

  async getById(id) {
    const jadwal = await jadwalRepository.findById(id);
    if (!jadwal) {
      throw new Error('Jadwal tidak ditemukan');
    }
    return jadwal;
  }

  async create(data) {
    // Cek apakah jadwal untuk sapi dan hari ini sudah ada
    const existing = await jadwalRepository.findAll({
      sapiId: data.sapiId,
      hari: data.hari
    });

    if (existing.length > 0) {
      throw new Error(`Jadwal untuk sapi ID ${data.sapiId} pada hari ${data.hari} sudah ada`);
    }

    return jadwalRepository.create(data);
  }

  async update(id, data) {
    // Cek apakah jadwal ada
    const jadwal = await this.getById(id);

    // Kalau ganti sapi atau hari, cek konflik
    if (data.sapiId || data.hari) {
      const sapiId = data.sapiId || jadwal.sapiId;
      const hari = data.hari || jadwal.hari;

      const existing = await jadwalRepository.findAll({ sapiId, hari });

      // Kalau ada jadwal lain dengan kombinasi yang sama
      if (existing.length > 0 && existing[0].id !== Number(id)) {
        throw new Error(`Jadwal untuk sapi ID ${sapiId} pada hari ${hari} sudah ada`);
      }
    }

    return jadwalRepository.update(id, data);
  }

  async delete(id) {
    // Cek apakah jadwal ada
    await this.getById(id);
    return jadwalRepository.delete(id);
  }

  async getDashboardData(date) {
    if (!date) {
      date = new Date().toISOString().split('T')[0]; // Default hari ini
    }

    return jadwalRepository.getDashboardData(date);
  }
}

module.exports = new JadwalService();