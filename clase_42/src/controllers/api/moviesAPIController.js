const db = require('../../database/models');
//  -Requerir fetch
const fetch = require('node-fetch');
const { Op } = require("sequelize");
const API_KEY = 'a3e08f0a';

const moviesAPIController = {
    list: (req, res) => {
        db.Movie.findAll()
        .then((movies) => {
            res.json({
                meta: {
                    status: 200,
                    total: movies.length,
                    url: req.originalUrl,
                },
                data: {...movies},
            });
        }).catch((error) => {
            res.status(400);
            res.send(error);
        });
    },
    detail: async (req, res) => {
        try {
            const genre = await db.Movie.findByPk(req.params.id);
            res.json({
                meta: {
                    status: 200,
                    url: req.originalUrl,
                },
                data: genre,
            });
        } catch (error) {
            res.status(400);
            res.send(error);
        }
    },
    create: async (req, res) => {
        try {
            const movie = await db.Movie.create(
                {
                    title: req.body.title,
                    rating: req.body.rating,
                    awards: req.body.awards,
                    release_date: req.body.release_date,
                    length: req.body.length,
                    genre_id: req.body.genre_id
                }
            );
            const statusCreated = 201;
            res.status(statusCreated).json({
                meta: {
                    status: statusCreated,
                    url: req.originalUrl,
                },
                data: movie,
            });
        } catch (error) {
            res.status(400);
            res.send(error);
        }
    },
    delete: async (req, res) =>{
        try {
            const deletedMovie = await db.Movie.findByPk(req.params.id);
            await db.Movie.destroy({where: {id: req.params.id}, force: true});

            res.json({
                meta: {
                    status: 200,
                    url: req.originalUrl,
                },
                data: deletedMovie,
            });
        } catch (error) {
            res.status(400);
            res.send(error);  
        }

    },
    // Acá implementar lógica de search
    search: async (req, res) => {
        const { title } = req.query;

        try {
            const result = await db.Movie.findAll({where: {
                 title: {[Op.like]: '%' + title + '%'}
             }});
    
             //  -Ver si la pelicula está en DB
             if (result.length == 0) {
                 //  -Hacer el request
                 //  -Manejar la promesa que retorne el fetch
                 const apiResult = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=${API_KEY}`);
                 apiJson = await apiResult.json();
                 result.push( ...apiJson.Search );
             }            
             res.json(result);
        } catch (error) {
            res.send('Error');            
        }
    },
    // db.Movie.findAll({where: {
    //     title: {[Op.like]: '%' + title + '%'}
    // }})
    // .then( result => {
    //     res.json(result);
    // });
    createMovieFromApi: async (req, res) => {
        const { id } = req.params;

        const apiResult = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        apiJson = await apiResult.json();
        let awardsString = apiJson.Awards.match(/\d+ wins/);
        const awards = awardsString ? parseInt(awardsString[0].slice(0,2)) : 0;

        const newMovie = {
            title: apiJson.Title,
            rating: parseFloat(apiJson.imdbRating),
            release_date: apiJson.Released,
            length: parseInt(apiJson.Runtime.slice(0,3)),
            awards: awards
        };

        const createdMovie = await db.Movie.create(newMovie);
        // genre_id: dataTypes.BIGINT(10)

        res.json(createdMovie);
    },
};

module.exports = moviesAPIController;