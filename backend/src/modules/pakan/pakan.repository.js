const prisma = require('../../db');

class PakanRepository {
  async findAll() {
    // Cukup ambil data pakan saja, tanpa include relasi jadwal apapun
    return prisma.pakan.findMany();
  }

  async findById(id) {
    return prisma.pakan.findUnique({
      where: { id: Number(id) }, // pastikan id number
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