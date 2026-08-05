const { dynamoClient, TABLE_NAME } = require("../config/dynamo");
const {PutCommand, ScanCommand} = require("@aws-sdk/lib-dynamodb");
const crypto = require("crypto");

const verificarProductoDuplicado = async (nombre, correo) =>{

    const params = {
        TableName: TABLE_NAME,
        FilterExpression: "nombre = :nombre AND correo = :correo",
        ExpressionAttributeValues: {
            ":nombre": nombre,
            ":correo": correo
        }
    }
    const resultado = await dynamoClient.send(new ScanCommand(params));

    // Si se encuentra un resultado, significara que ya existe el producto
    return resultado.Items.length > 0;
}

const registrarProductoBD = async (datosProducto) => {

    // Con esto se generara un ID unico para cada producto
    const idProducto = crypto.randomUUID(); 

    // Se armara el objeto final que se guardara en DynamoDB
    const nuevoProducto = {
        idProducto,
        ...datosProducto
    }

    const params = {
        TableName: TABLE_NAME,
        Item:  nuevoProducto
    }

    //Se guarda en la base de datos
    await dynamoClient.send(new PutCommand(params));
    return nuevoProducto;
}

module.exports = {
    verificarProductoDuplicado,
    registrarProductoBD
};