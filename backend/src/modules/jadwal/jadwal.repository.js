// jadwal.repository.js
const prisma = require('../../db/');

class JadwalRepository {
  async findAll() {
    return prisma.jadwalMakan.findMany({
      include: { sapi: true, pakan: true, user: true }
    });
  }
  
  async create(data) {
    return prisma.jadwalMakan.create({ data })
  } 

  async update (id, data) {
    return prisma.jadwalMakan.create({
      where: { id: Number(id) },
      data
    })
  }

  async delete(id){
    return prisma.jadwalMakan.delete({
      where:{
        id: { id: Number(id) }
      }
    });
  }
  // ...findById, create, update, delete mirip module lain
}
module.exports = new JadwalRepository();

