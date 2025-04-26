const express = require("express")
const router = express.Router();
const {
    getAllSapi,
    getSapiById,
    addSapi,
    deleteSapi,
    putSapi,
    patchSapi
} = require("./sapi.service")

router.get('/', async (req, res) => {
    const sapi = await getAllSapi();
    res.send(sapi);
});

router.get('/:id', async (req, res) => {
    try {
        const sapiId = req.params.id;
        const sapi = await getSapiById(sapiId);
        res.send(sapi);
    } catch (err) {
        res.status(400).json(err.message);
    }
});


router.post("/", async (req, res) => {
    try {
        const newSapiData = req.body;
        const sapiBaru = await addSapi(newSapiData);
        res.status(201).send({
            message: "Sapi berhasil ditambahkan",
            data: sapiBaru
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const sapiId = req.params.id
        await deleteSapi(sapiId);

        res.send({
            message: `sapi dengan id ${sapiId} berhasil dihapus`
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.put("/:id", async (req, res) => {
    try {
        const sapiId = req.params.id;
        const newSapiData = req.body;

        const updatedSapi = await putSapi(sapiId, newSapiData);
        console.log(updatedSapi)
        res.send({
            message: "Berhasil update data sapi",
            data: updatedSapi,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const sapiId = req.params.id
        const newSapiData = req.body;
    
        const updatedSapi = await patchSapi(sapiId, newSapiData);
        res.send({
            message: "berhasil update data sapi",
            data: updatedSapi,
        })
    } catch (err) {
        res.status(400).send({error: err.message });
    }
})

module.exports = router;


