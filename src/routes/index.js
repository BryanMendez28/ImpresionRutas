const express = require("express");
const route = express.Router();
const { getRuta, getRutas} = require("../controllers/index")



route.get("/ruta", getRuta);
route.get("/rutas", getRutas);



module.exports = route;