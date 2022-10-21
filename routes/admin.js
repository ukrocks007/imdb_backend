const Router = require('express').Router;
const router = Router();
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const config = require('../config');
const authenticate = require('../middleware/authenticate');

router.post('/admin/login', async (req, res) => {
    try {
        const Admin = require('../models').Admin;
        const admin = await Admin.findOne({
            where: {
                [Op.and]: [
                    {
                        email: req.body.email
                    },
                    {
                        password: req.body.password
                    }
                ]
            }
        });
        admin.password = undefined;
        const token = jwt.sign(JSON.parse(JSON.stringify(admin)), config.jwtSecret, { expiresIn: `${24 * 60 * 60} s` });
        res.status(admin ? 200 : 404).json({
            success: !!admin,
            admin,
            token,
            message: admin ? 'LoggedIn' : 'Invalid email or password'
        });
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
});

router.post('/admin/signup', async (req, res) => {
    try {
        const Admin = require('../models').Admin;
        const admin = await Admin.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(201).json({
            success: true,
            admin,
            message: 'Admin signed up!'
        });
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
});

router.get('/admin/currentAdmin', authenticate, async(req, res) => {
    res.status(200).json({
        success: true,
        admin: req.user
    });
})

module.exports = router;