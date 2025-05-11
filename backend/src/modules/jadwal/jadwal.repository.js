const prisma = require('../../db');

class JadwalRepository {
  async findAll() {
    return prisma.jadwalMakan.findMany({
      include: {
        sapi: true,
        pakan: true,
        user: true,
      },
    });
  }

  async findById(id) {
    return prisma.jadwalMakan.findUnique({
      where: { id: Number(id) },
      include: {
        sapi: true,
        pakan: true,
        user: true,
      },
    });
  }

  async create(data) {
    return prisma.jadwalMakan.create({ data });
  }

  async update(id, data) {
    return prisma.jadwalMakan.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id) {
    return prisma.jadwalMakan.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new JadwalRepository();