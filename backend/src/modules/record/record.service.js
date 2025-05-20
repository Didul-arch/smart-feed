const recordRepository = require('./record.repository');

class RecordService {
  async create(data) {
    // Cek apakah waktu sesuai dengan sesi
    const waktu = new Date(data.waktu);
    const jam = waktu.getHours();

    if (data.sesi === 'pagi' && jam >= 12) {
      throw new Error('Sesi pagi hanya boleh sebelum jam 12:00');
    }

    if (data.sesi === 'sore' && jam < 12) {
      throw new Error('Sesi sore hanya boleh setelah jam 12:00');
    }

    // Cek duplikasi record
    const tanggal = waktu.toISOString().split('T')[0];
    const existing = await recordRepository.findByJadwalDateSesi(
      data.jadwalId,
      tanggal,
      data.sesi
    );

    if (existing) {
      throw new Error(`Record untuk jadwal ini pada tanggal ${tanggal} dan sesi ${data.sesi} sudah ada`);
    }

    return recordRepository.create(data);
  }

  async getAll(filters) {
    return recordRepository.findAll(filters);
  }
}

module.exports = new RecordService();