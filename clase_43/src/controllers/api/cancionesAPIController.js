const path = require("path");
const db = require("../../database/models");

const cancionesAPIController = {
  list: async (req, res) => {
    try {
      const canciones = await db.Cancion.findAll({
        include: {
          all: true,
          nested: true,
        },
      });
      res.json({
        meta: {
          status: 200,
          url: req.baseUrl,
          method: req.method,
        },
        data: canciones,
      });
    } catch (error) {
      res.status(400).send("Hubo un error");
    }
  },
};
module.exports = cancionesAPIController;
