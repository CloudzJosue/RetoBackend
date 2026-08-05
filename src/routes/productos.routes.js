const express = require("express");
const router = express.Router();
const productos = require("../controllers/productos.controller");

router.post("/producto", productos.crearProducto);

module.exports = router;