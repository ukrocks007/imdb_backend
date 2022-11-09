const Router = require('express').Router;
const router = Router();
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const config = require('../config');
const authenticate = require('../middleware/authenticate');

router.post('/user/login', async (req, res) => {
    try {
        const User = require('../models').User;
        const user = await User.findOne({
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
        if (!user) {
            res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        } else {
            user.password = undefined;
            const token = jwt.sign(JSON.parse(JSON.stringify(user)), config.jwtSecret, { expiresIn: `${24 * 60 * 60} s` });
            res.status(user ? 200 : 404).json({
                success: !!user,
                user,
                token,
                message: 'LoggedIn'
            });
        }
    } catch (ex) {
        console.log(ex);
        res.status(400).json({ success: false, message: ex.message });
    }
});

router.post('/user/checkEmail', async (req, res) => {
    try {
        const User = require('../models').User;
        if (req.body.email) {
        const user = await User.findOne({
            where:
            {
                email: req.body.email
            }
        });
        if (user) {
            throw new Error("User already registered!");
        } else {
            res.status(200).json({
                success: true
            });
        }
    } else {
        throw new Error("Email not provided!");
    }
    } catch (ex) {
        console.log(ex);
        res.status(400).json({ success: false, message: ex.message });
    }
});

router.post('/user/signup', async (req, res) => {
    try {
        const User = require('../models').User;
        const user = await User.findOne({
            where:
            {
                email: req.body.email
            }
        });
        if (user) {
            throw new Error("User already registered!");
        }
        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(201).json({
            success: true,
            message: 'User signed up!'
        });
    } catch (ex) {
        console.log(ex);
        res.status(400).json({ success: false, message: ex.message });
    }
});

router.get('/user/currentUser', authenticate, async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
})

module.exports = router;