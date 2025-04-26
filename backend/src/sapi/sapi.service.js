const {
    findSapi,
    tambahSapi,
    delSapi,
    updateSapi,
} = require('./sapi.repository');

const getAll = async () => {
    const sapi = await findSapi();
    return sapi;
};

const getById = async (sapiId) => {
    const sapi = await findSapi(sapiId);
    if (!sapi) {
        throw Error("Sapi not found!");
    }

    return sapi;
}

const add = async (newSapiData) => {
    const newSapi = await tambahSapi(newSapiData);
    return newSapi;
}

const deleteSapi = async (sapiId) => {
    const deletedSapi = await delSapi(sapiId);
    return deletedSapi;
}

const patchSapi = async (sapiId, newSapiData) => {
    if (!(newSapiData.jenis || newSapiData.bobot || newSapiData.image || newSapiData.tanggalLahir)) {
        throw new Error("Minimal satu field harus diisi.");
    }
    return await updateSapi(sapiId, newSapiData);
}

module.exports = {
    getAll,
    getById,
    add,
    deleteSapi,
    patchSapi
}