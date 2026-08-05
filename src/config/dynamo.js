const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");


//Configuracion del la base de datos con las credenciales en el env
const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Creamos documentclient
// traductor de datos de la base de datos a objetos de javascript
const dynamoClient = DynamoDBDocumentClient.from(client);

module.exports = {
    dynamoClient,
    TABLE_NAME: process.env.DYNAMO_TABLE_NAME
}