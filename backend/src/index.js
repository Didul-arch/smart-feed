const express = require('express');
const app = express();
const dotenv = require('dotenv');
const createRoute = require('./routes/index');
dotenv.config();

const PORT = process.env.PORT;

app.get('/healthcheck', (req, res) => {
    res.json({
        message: 'Halalaloaoo! Page utama',
        uptime: process.uptime(),
    });
});

createRoute(app);

//anuan
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});