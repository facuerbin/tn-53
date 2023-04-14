const db = require('../../database/models');

const genreAPIController = {
    list: (req, res) => {
        db.Genre.findAll()
        .then((genres) => {
            res.json({
                meta: {
                    status: 200,
                    total: genres.length,
                    url: req.originalUrl,
                },
                data: {...genres},
            });
        }).catch((error) => {
            res.status(400);
            res.send(error);
        });
    },
    detail: async (req, res) => {
        try {
            const genre = await db.Genre.findByPk(req.params.id);
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
};

module.exports = genreAPIController;