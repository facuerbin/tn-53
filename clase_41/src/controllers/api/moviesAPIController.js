const db = require('../../database/models');

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
};

module.exports = moviesAPIController;