const prisma = require('../../db');

class JadwalRepository {
  // Ambil semua jadwal
  async findAll(filters = {}) {
    const { hari, sapiId, kandangId } = filters;
    const where = {};

    if (hari) where.hari = hari;
    if (sapiId) where.sapiId = Number(sapiId);

    // Filter by kandangId (butuh join)
    if (kandangId) {
      return prisma.jadwalMakan.findMany({
        where: {
          ...where,
          sapi: {
            kandangId: Number(kandangId)
          }
        },
        include: {
          sapi: true,
          pagiPakan: true,
          sorePakan: true,
          records: true
        }
      });
    }

    return prisma.jadwalMakan.findMany({
      where,
      include: {
        sapi: true,
        pagiPakan: true,
        sorePakan: true,
        records: true
      }
    });
  }

  async findById(id) {
    return prisma.jadwalMakan.findUnique({
      where: { id: Number(id) },
      include: {
        sapi: true,
        pagiPakan: true,
        sorePakan: true,
        records: true
      }
    });
  }

  async create(data) {
    return prisma.jadwalMakan.create({
      data,
      include: {
        sapi: true,
        pagiPakan: true,
        sorePakan: true
      }
    });
  }

  async update(id, data) {
    return prisma.jadwalMakan.update({
      where: { id: Number(id) },
      data,
      include: {
        sapi: true,
        pagiPakan: true,
        sorePakan: true
      }
    });
  }

  async delete(id) {
    return prisma.jadwalMakan.delete({
      where: { id: Number(id) }
    });
  }

  // Data untuk halaman utama
  async getDashboardData(date) {
    // Convert date ke nama hari
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const dayIndex = new Date(date).getDay();
    const hari = days[dayIndex];

    // Ambil semua kandang dengan sapi dan jadwalnya untuk hari ini
    const kandangs = await prisma.kandang.findMany({
      include: {
        sapi: {
          include: {
            jadwal: {
              where: { hari },
              include: {
                pagiPakan: true,
                sorePakan: true,
                records: {
                  where: {
                    waktu: {
                      gte: new Date(date + 'T00:00:00.000Z'),
                      lt: new Date(date + 'T23:59:59.999Z'),
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    // Ubah format data untuk frontend
    return kandangs.map(kandang => {
      // Hitung sapi yang sudah diberi makan
      const sapiDenganJadwal = kandang.sapi.filter(s => s.jadwal.length > 0);
      const totalSapi = sapiDenganJadwal.length;

      let sudahMakanPagi = 0;
      let sudahMakanSore = 0;

      const sapiData = sapiDenganJadwal.map(sapi => {
        const jadwal = sapi.jadwal[0]; // Harusnya cuma ada 1 jadwal per sapi per hari

        // Cek status makan
        const makanPagi = jadwal.records.some(r => r.sesi === 'pagi');
        const makanSore = jadwal.records.some(r => r.sesi === 'sore');

        if (makanPagi) sudahMakanPagi++;
        if (makanSore) sudahMakanSore++;

        return {
          sapiId: sapi.id,
          sapiJenis: sapi.jenis,
          jadwalId: jadwal.id,
          sudahMakanPagi: makanPagi,
          sudahMakanSore: makanSore,
          pagiJam: jadwal.pagiJam,
          soreJam: jadwal.soreJam,
          pagiPakan: jadwal.pagiPakan,
          sorePakan: jadwal.sorePakan
        };
      });

      return {
        kandangId: kandang.id,
        kandangNama: kandang.nama,
        totalSapi: totalSapi,
        sudahMakanPagi: sudahMakanPagi,
        sudahMakanSore: sudahMakanSore,
        sapi: sapiData
      };
    }).filter(k => k.totalSapi > 0); // Hilangkan kandang kosong
  }
}

module.exports = new JadwalRepository();