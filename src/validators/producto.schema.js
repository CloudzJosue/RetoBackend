const {z} = require("zod");

const productoSchema = z.object({
    nombre: z.string({ 
        required_error: "El nombre es obligatorio",
        invalid_type_error: "El nombre debe ser un texto"
    }).min(1, "El nombre no puede estar vacío"),
    
    precio: z.number({ 
        required_error: "El precio es obligatorio",
        invalid_type_error: "El precio debe ser un número"
    }).gt(0, "El precio debe ser mayor que 0"),
    
    stock: z.number({ 
        required_error: "El stock es obligatorio",
        invalid_type_error: "El stock debe ser un número"
    }).gte(0, "El stock debe ser mayor o igual a 0"),
    
    correo: z.string({ 
        required_error: "El correo es obligatorio"
    }).email("Debe proporcionar un correo válido")
});

module.exports = {
    productoSchema
};