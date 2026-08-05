const { productoSchema } = require("../validators/producto.schema");
const productosService = require("../services/productos.service");

const crearProducto = async (req, res) => {
    try {
        //Validacion
        const datosValidos = productoSchema.parse(req.body);
        const {nombre, correo} = datosValidos;

        //Verificar si el producto existe
        const existe = await productosService.verificarProductoDuplicado(nombre, correo);
        if(existe) {
            return res.status(409).json({ error: `El producto "${nombre}" ya existe.`});
        }

        await productosService.registrarProductoBD(datosValidos);
        return res.status(200).json({ message: "Producto registrado" });

    } catch (error) {
        // Manejo de errores de validación
        if(error.name === "ZodError") {
            return res.status(400).json({ 
                error: "Campos requeridos o con validaciones incorrectas."
            });
        }

        console.error("Error al crear el producto:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    };
}

module.exports = {
    crearProducto
};