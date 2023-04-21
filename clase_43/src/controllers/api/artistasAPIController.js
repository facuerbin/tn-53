const path = require("path");
const db = require("../../database/models");
const { Artista } = db;

const artistasAPIController = {
  list: async (req, res) => {
    // Obtener los datos de los artistas
    try {
      const artistas = await Artista.findAll();
      return res.json({
        meta: {
          status: 200,
          length: artistas.length,
          url: req.baseUrl,
          method: req.method,
        },
        data: artistas,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send("Hubo un error");
    }
    // Manejar la promesa
    // res.json();

    // const resultado = await db....
    // acá trabajo con resultado

    // try {
    //     if (! req.params.id) {
    //         return res.send("No existe el id");
    //         // throw new Error("No existe el id");
    //     }

    // } catch (error) {

    // }
    // .then(resultado => {})
    // .catch(error => console.log(error))
    //return res.send('Devuelve datos de los artistas.');
  },
  create: (req, res) => {
    console.log(req.headers);
    const artist = {
      nombre: req.body.nombre,
    };

    Artista.create(artist)
      .then((result) => {
        res.json({
          meta: {
            status: 201,
            url: req.baseUrl,
            method: req.method,
          },
          data: result,
        });
      })
      .catch((error) => res.status(400).send("Hubo un error"));
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const artist = await Artista.update(
        {
          nombre: req.body.nombre,
        },
        {
          where: { id },
        }
      );

      res.json({
        meta: {
          status: 200,
          url: req.baseUrl,
          method: req.method,
        },
        data: artist,
      });
    } catch (error) {
      res.status(400).send("Hubo un error");
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Artista.destroy({ where: { id } });
      res.json({
        meta: {
          status: 200,
          url: req.baseUrl,
          method: req.method,
        },
        data: result,
      });
    } catch (error) {}
  },
};
module.exports = artistasAPIController;
