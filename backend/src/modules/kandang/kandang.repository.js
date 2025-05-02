const prisma = require('../../db');

class KandangRepository {
  async findAll() {
    return prisma.kandang.findMany({ include: { sapi: true } });
  }

  async findById(id) {
    return prisma.kandang.findUnique({
      where: { id: Number(id) },
      include: { sapi: true },
    });
  }

  async create(data) {
    return prisma.kandang.create({ data });
  }

  async update(id, data) {
    return prisma.kandang.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id) {
    return prisma.kandang.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new KandangRepository();