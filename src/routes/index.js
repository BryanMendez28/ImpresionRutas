const express = require("express");
const route = express.Router();
const { getRuta} = require("../controllers/index")



route.get("/ruta", getRuta);



module.exports = route;