const prisma = require('../../db');

class SapiRepository {
  async findAll() {
    return prisma.sapi.findMany({ include: { kandang: true, jadwal: true } });
  }

  async findById(id) {
    return prisma.sapi.findUnique({
      where: { id: Number(id) },
      include: { kandang: true, jadwal: true },
    });
  }

  async create(data) {
    return prisma.sapi.create({ data });
  }

  async update(id, data) {
    return prisma.sapi.update({
      where: { id: Number(id) },
      data,
    });
  }
 
  async delete(id) {
    return prisma.sapi.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new SapiRepository();