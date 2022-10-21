const express = require('express');
const cors = require('cors');
const db = require('./models');
const initializeRoutes = require('./routes/index');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());

app.get('/health', (req, res) => {
    res.json({
        success: true,
        ts: +new Date()
    });
});

initializeRoutes(app);

app.listen(2323, () => {
    console.log("Listending on 2323");
});