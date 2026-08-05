const crearProducto = async (req, res) => {
    try {
        const { nombre, precio, stock, correo } = req.body;
        console.log("Intentando registrar producto:", { nombre, precio , stock, correo});

        return res.status(200).json({ message: "Controlador POST /producto alcanzado correctamente" });
    } catch (error) {
        console.error("Error en crearProducto:", error);
        res.status(500).json({ message: "Error al registrar producto" });
    }
};

module.exports = {
    crearProducto
};