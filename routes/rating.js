const Router = require('express').Router;
const router = Router();
const { Op } = require("sequelize");
const authenticate = require('../middleware/authenticate');

router.post('/rating', authenticate, async (req, res) => {
    try {
        const Rating = require('../models').Rating;
        const { movieId: movie_id, star } = req.body;
        const rating = await Rating.create({
            movie_id,
            user_id: req.user.id,
            star
        });
        res.status(200).json({
            success: true,
            rating,
            message: 'Rating created'
        });
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
});

router.get('/rating/movie/:movieId', authenticate, async (req, res) => {
    try {
        const Rating = require('../models').Rating;
        const rating = await Rating.findOne({
            where: {
                [Op.and]: [
                    {
                        user_id: req.user.id,
                    },
                    {
                        movie_id: req.params.movieId
                    }
                ]
            }
        });
        res.status(200).json({
            success: true,
            rating,
            message: 'Fetched the rating'
        });
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
});

router.get('/rating/:id', authenticate, async (req, res) => {
    try {
        const Rating = require('../models').Rating;
        const rating = await Rating.findOne({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json({
            success: true,
            rating,
            message: 'Fetched the rating'
        });
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
});

router.put('/rating/:id', authenticate, async (req, res) => {
    try {
        const Rating = require('../models').Rating;
        let rating = await Rating.findOne({
            where: {
                id: req.params.id,
            }
        });
        if(rating) {
            rating = await rating.update(req.body);
        }
        res.status(200).json({
            success: true,
            rating,
            message: 'Updated the rating'
        });
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
});

router.delete('/rating/:id', authenticate, async (req, res) => {
    try {
        const Rating = require('../models').Rating;
        const rating = await Rating.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json({
            success: true,
            rating,
            message: 'Deleted the rating'
        });
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
});


module.exports = router;