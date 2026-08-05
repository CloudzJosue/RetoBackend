const express = require("express");
const router = express.Router();
const productos = require("../controllers/productos.controller");

router.post("/producto", productos.crearProducto);
router.get("/productos", productos.listarProductos);
router.delete("/producto", productos.eliminarProducto);

module.exports = router;