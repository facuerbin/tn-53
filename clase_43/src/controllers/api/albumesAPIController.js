const path = require('path');
const db = require('../../database/models');

const albumesAPIController = {
    'list': (req, res) => {
        return res.send('Devuelve la información de todos los albumes asociados con cada uno de los artistas registrados en nuestra plataforma.')
    },

    'detail': (req, res) => {
        return res.send('Devuelve el detalle de un album asociado a un (" id ") de un artista indicado en la ruta o en la query string.');
    }
}

module.exports = albumesAPIController;