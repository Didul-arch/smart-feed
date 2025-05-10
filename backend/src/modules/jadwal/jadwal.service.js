const jadwalRepository = require("./jadwal.repository");

class jadwalService {
  async getStatusBySapiId(sapiId, tanggal = new Date()) {
    const start = new Date(tanggal);
    start.setHours(0, 0, 0, 0);
    const end = new Date(tanggal);
    end.setHours(23, 59, 59, 999);

    const sapi = await jadwalRepository.findSapiById(sapiId);
    if (!sapi) return null;

    const pagi = await jadwalRepository.getJadwalMakan(sapiId, start, end, "pagi");
    const sore = await jadwalRepository.getJadwalMakan(sapiId, start, end, "sore");

    return {
      sapiInfo: { id: sapi.id, jenis: sapi.jenis },
      kandangInfo: sapi.kandang ? { id: sapi.kandang.id, nama: sapi.kandang.nama } : null,
      makanPagi: pagi
        ? {
            user: pagi.user?.nama || null,
            pakan: pagi.pakan?.jenis || null,
            tanggal: pagi.tanggal,
          }
        : null,
      makanSore: sore
        ? {
            user: sore.user?.nama || null,
            pakan: sore.pakan?.jenis || null,
            tanggal: sore.tanggal,
          }
        : null,
    };
  }

  async getStatusAllSapi({ kandangId, tanggal = new Date() }) {
    const start = new Date(tanggal);
    start.setHours(0, 0, 0, 0);
    const end = new Date(tanggal);
    end.setHours(23, 59, 59, 999);

    const sapiList = await jadwalRepository.findAllSapi(kandangId);

    return Promise.all(
      sapiList.map(async (sapi) => {
        const pagi = await jadwalRepository.getJadwalMakan(sapi.id, start, end, "pagi");
        const sore = await jadwalRepository.getJadwalMakan(sapi.id, start, end, "sore");

        return {
          sapiInfo: { id: sapi.id, jenis: sapi.jenis },
          kandangInfo: sapi.kandang ? { id: sapi.kandang.id, nama: sapi.kandang.nama } : null,
          makanPagi: pagi
            ? {
                user: pagi.user?.nama || null,
                pakan: pagi.pakan?.jenis || null,
                tanggal: pagi.tanggal,
              }
            : null,
          makanSore: sore
            ? {
                user: sore.user?.nama || null,
                pakan: sore.pakan?.jenis || null,
                tanggal: sore.tanggal,
              }
            : null,
        };
      })
    );
  }
}

module.exports = new jadwalService();