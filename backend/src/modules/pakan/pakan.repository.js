const prisma = require('../../db');

class PakanRepository {
  async findAll() {
    return prisma.pakan.findMany({ include: { jadwal: true } });
  }

  async findById(id) {
    return prisma.pakan.findUnique({
      where: { id: Number(id) },
      include: { jadwal: true },
    });
  }

  async create(data) {
    return prisma.pakan.create({ data });
  }

  async update(id, data) {
    return prisma.pakan.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id) {
    return prisma.pakan.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new PakanRepository();