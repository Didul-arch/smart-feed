const prisma = require("../db");
const { CreateSapiBodySchema, PatchSapiBodySchema } = require("./sapiSchema");

const findSapi = async (sapiId) => {
  if (sapiId) {
    return await prisma.sapi.findUnique({
      where: {
        id: parseInt(sapiId),
      }
    });
  }
  return await prisma.sapi.findMany();
}

const tambahSapi = async (newSapiData) => {

  const requestBodyValidateRes = CreateSapiBodySchema.parse(newSapiData);
  const { bobot, jenis, image, tanggalLahir } = requestBodyValidateRes;

  return await prisma.sapi.create({
    data: {
      bobot,
      jenis,
      image,
      tanggalLahir
    }
  });
}

const delSapi = async (sapiId) => {
  return await prisma.sapi.delete({
    where: {
      id: parseInt(sapiId),
    }
  });
}

const updateSapi = async (sapiId, newSapiData) => {

  const requestBodyValidateRes = PatchSapiBodySchema.parse(newSapiData);
  const { bobot, jenis, image, tanggalLahir } = requestBodyValidateRes;

  return await prisma.sapi.update({
    where: {
      id: parseInt(sapiId),
    },
    data: {
      bobot,
      jenis,
      image,
      tanggalLahir
    },
  });
}

module.exports = {
  findSapi,
  tambahSapi,
  delSapi,
  updateSapi
}