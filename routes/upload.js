const Router = require('express').Router;
const router = Router();
const { Op } = require("sequelize");
const config = require('../config');
const authenticate = require('../middleware/authenticate');
const multer = require('multer');
const { v4 } = require('uuid');
const { dirname } = require('path');
const fs = require('fs');
const read = multer({
    dest: 'uploads/', filename: function (req, file, cb) {
        const fullName =
            v4().replace(/-/g, "") +
            path.extname(file.originalname);
        cb(null, fullName);
    }
});

router.post('/upload', authenticate, read.single('upload'), async (req, res) => {
    try {
        const Upload = require('../models').Upload;
        const upload = await Upload.create({
            name: req.file.filename,
            file: `/uploads/${req.file.filename}`,
            url: `/api/v1/upload/${req.file.filename}/base64`,
        });
        res.status(200).json({
            success: true,
            upload,
            message: 'File uploaded!'
        });
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
});

router.get('/upload/:id', authenticate, async (req, res) => {
    try {
        const Upload = require('../models').Upload;
        const upload = await Upload.findOne({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json({
            success: true,
            upload,
            message: 'Fetched the upload!'
        });
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
});

router.get('/upload/:uploadId/base64', authenticate, async (req, res) => {
    try {
        const Upload = require('../models').Upload;
        const upload = await Upload.findOne({
            where: {
                id: req.params.uploadId,
            }
        });
        let buffer = await fs.readFileSync(dirname(require.main.filename) + upload.file, { encoding: 'base64' })
        // res.sendFile(dirname(require.main.filename) + upload.file);
        res.status(200).send(buffer)
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
});


module.exports = router;