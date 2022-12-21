const Router = require('express').Router;
const router = Router();
const authenticate = require('../middleware/authenticate');
const fs = require('fs');

router.post('/movie', authenticate, async (req, res) => {
    try {
        const Movie = require('../models').Movie;
        const { name, year, genre, tags, poster } = req.body;
        const movie = await Movie.create({
            name, year, genre, tags, poster
        });
        res.status(200).json({
            success: true,
            movie,
            message: 'Movie created'
        });
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
});

router.get("/movie", authenticate, async (req, res) => {
  try {
    const Movie = require("../models").Movie;
    const movie = await Movie.findAll();
    res.status(200).json({
      success: true,
      movie,
      message: "Fetched the movies",
    });
  } catch (ex) {
    console.log(ex);
    res.status(400).json(ex);
  }
});

router.get('/movie/:id', authenticate, async (req, res) => {
    try {
        const Movie = require('../models').Movie;
        const movie = await Movie.findOne({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json({
            success: true,
            movie,
            message: 'Fetched the movie'
        });
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
});

router.put('/movie/:id', authenticate, async (req, res) => {
    try {
        const Movie = require('../models').Movie;
        let movie = await Movie.findOne({
            where: {
                id: req.params.id,
            }
        });
        if(movie) {
            movie = await movie.update(req.body);
        }
        res.status(200).json({
            success: true,
            movie,
            message: 'Updated the movie'
        });
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
});

router.delete('/movie/:id', authenticate, async (req, res) => {
    try {
        const Movie = require('../models').Movie;
        const Rating = require('../models').Rating;
        await Rating.destroy({
          where: {
            movie_id: req.params.id,
          },
        });
        const movie = await Movie.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json({
            success: true,
            movie,
            message: 'Deleted the movie'
        });
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
});


module.exports = router;