const catchAsync = require("../core/helper/catchAsync")

const {
    getAll,
    getById,
    add,
    deleteSapi,
    patchSapi
} = require("./sapi.service")

const getAllSapi = catchAsync(async (req, res) => {
    const sapi = await getAll();
    res.json(sapi);
    return;
});

const getSapiById = catchAsync(async (req, res) => {
    const sapiId = req.params.id;
    const sapi = await getById(sapiId);
    res.json(sapi);
})

const addSapi = catchAsync(async (req, res) => {
    const sapi = await add(req.body);
    res.json(sapi);
})

const delSapi = catchAsync(async (req, res) => {
    const sapiId = req.params.id;
    const sapi = await deleteSapi(sapiId)
    res.json({
        message: "sapi deleted",
        data: sapi
    });
})

const updateSapi = catchAsync(async (req, res) => {
    const sapiId = req.params.id;
    const newSapiData = req.body;
    const sapi = await patchSapi(sapiId, newSapiData)
    res.json({
        message: "Data sapi berhasil di update!",
        data: sapi
    })
})

module.exports = { getAllSapi, getSapiById, addSapi, delSapi, updateSapi };

// router.get('/', async (req, res) => {
//     const sapi = await getAllSapi();
//     res.json(sapi);
// });

// router.get('/:id', async (req, res) => {
//     try {
//         const sapiId = req.params.id;
//         const sapi = await getSapiById(sapiId);
//         res.json(sapi);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });


// router.post("/", async (req, res) => {
//     try {
//         const newSapiData = req.body;
//         const sapiBaru = await addSapi(newSapiData);
//         res.status(201).json({
//             message: "Sapi berhasil ditambahkan",
//             data: sapiBaru
//         });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// router.delete("/:id", async (req, res) => {
//     try {
//         const sapiId = req.params.id
//         await deleteSapi(sapiId);

//         res.json({
//             message: `sapi dengan id ${sapiId} berhasil dihapus`
//         });
//     } catch (err) {
//         if (err.name === "PrismaClientKnownRequestError") {
//             if (err.code === "P2025") {
//                 res.status(404).json({ error: "Sapi tidak ditemukan" });
//             }
//         }
//         console.error(err.name);
//         res.status(400).json({ error: err.message });
//     }
// })

// router.patch("/:id", async (req, res) => {
//     try {
//         const sapiId = req.params.id
//         const newSapiData = req.body;

//         const updatedSapi = await patchSapi(sapiId, newSapiData);
//         res.json({
//             message: "berhasil update data sapi",
//             data: updatedSapi,
//         })
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// })

// module.exports = router;

