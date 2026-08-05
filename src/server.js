const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Se usara middleware para que la api entienda los json que envie el cliente
app.use(express.json());

//Ruta de prueba para verificar que el serivor esta respondiendo
app.get("/api", (req, res) => {
    res.status(200).json({message: "Servidor corriendo correctamente"});
});

//Prueba en postman para enviar datos al servidor y responder
app.post("/enviar", (req, res) => {
    console.log(req.body);
    res.status(200).json({message: "Datos recibidos de manera correcta"});
});

//Iniciar el puerto del servidor
app.listen(PORT, () => {
    console.log("Servidor corriendo en este puerto: " + PORT);
})