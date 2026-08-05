# API REST - Gestion de productos - Reto tecnico CBN Tech
En este proyecto es un API REST desarrollada en Node.js y express para la gestion de productos, utilizando Amazon DynamoDB como base de datos principal

---

## 1. Definiciones y especificacion de requerimientos
### a) Definicion general del proyecto de software
*   **Idea general:** Desarrollo de un servicio backend (API REST) que permita registrar, listar y eliminar productos interactuando con una tabla ya existente en AWS Dynamodb, asegurando el aislamiento de los datos.
*   **Objetivos:**
    *   Implementar operaciones CRUD especificas cumpliendo reglas de negocio estrictas.
    *   Garantizar la correcta interaccion con los servicios de la nube (AWS SDK)
    *   Establecer una arquitectura limpia y escalable.
*   **Usuarios:** Evaluadores tecnicos y desarrollador (Mi persona)

### b) especificacion de requerimientos del proyecto
*   **Requisitos generales:** Uso de Express js, Nodejs y el SDK oficial de AWS para conectar con la base de datos Dynamodb
*   **Requisitos funcionales:**
    *   Generacion automatica de identificadores (`idProducto`).
    *   Validaciones estrictas de entrada (precios > 0, stock >= 0)
    *   Manejo de estado http especificos (200, 400, 409) segun los escenarios de exito o conflicto.
*   **Informacion de autoria y Legacy del proyecto:**
    *   **Autor:** Josue Aaron Arteaga Huapaya
    *   **Contexto:** Evaluacion tecnica para la posicion de backend developer en CBN Tech
*   **Alcances del sistema:** El sistema abarca endpoints solicitados y esta preparado para ser ejecutado en entornos y desplegado en plataformas PaaS (Render, Railway, etc)

### c) Procedimientos de instalacion y prueba
*   **Procedimientos de desarrollo:**
    *   **Herramientas utilizadas:** nodejs, Expressjs, AWS SDK, Git y Zod para validaciones
*   **Procedimientos de instalacion y prueba:**
    *   **Requisitos no funcionales:** Conexion a internet, Nodejs v18+
    *   **Obtencion e instalacion:**
        ```bash
        # Clonar el repositorio
        git clone + url del repositorio remoto
        
        # Instalacion de dependencias
        npm install
        ```
    *   **Especificaciones de prueba y ejecucion:**
        1. Crear un archivo `.env` en la raiz del proyecto basandose en el archivo `.env.example`
        2. Ingresar las credenciales 
        3. Ejecutar el servidor
        ```bash
        # Modo produccion / evaluacion
        npm start

        # Modo desarrollo
        npm run dev
        ```

---

## 2. Arquitectura del sistema
### Descripcion jerarquica y de modulos
El proyecto sigue una arquitectura basada en la separacion de responsabilidades

*   **`src/config/`**: Configuracion de variables de entorno e inicializacion del cliente de AWS Dynamodb
*   **`src/controllers/`**: Orquestadores que reciben las peticiones http (req, res), delegan la logica y devuelven los codigos de estado.
*   **`src/services/`**: Contiene la logica de negocio pura y la interaccion directa con Dynamodb
*   **`src/routes/`**: Definicion de los endpoints y verbos http. 

### Dependencias externas principales
*   `express`: Framework web
*   `@aws-sdk/client-dynamodb` / `@aws-sdk/lib-dynamodb`: Interaccion con aws.
*   `dotenv`: Manejo de variables de entorno

---

## 3. Diseño del modelo de datos.
La API interactua con la tabla NoSQL `ProductosReto` en DynamoDB (Region: us-east-2).

*   **Datos de entrada / internos:**
    *   `idProducto` (String): Partition Key (Generado internamente por el sistema).
    *   `correo` (String): Identificador del candidato.
    *   `nombre` (String): Nombre del producto.
    *   `precio` (Number): Valor monetario.
    *   `stock` (Number): Cantidad disponible.

---

## 4. Descripcion de procesos y servicios ofrecidos por el sistema

1.  **Registro de Producto:** Verifica la existencia de un producto con el mismo nombre bajo el mismo correo. Si no existe y los datos son validos, genera un ID unico y persiste el registro.
2.  **Eliminacion de Producto:** Valida que el producto exista y pertenezca al correo del solicitante. Posteriormente, verifica que el stock sea exactamente `0` antes de proceder con la eliminacion.
3.  **Listado de Productos:** Escanea/Consulta los productos asociados al correo del solicitante y los devuelve ordenados alfabeticamente (A-Z) en tiempo de ejecucion.

---

## 5. Documentacion tecnica - Especificacion APi

### Aspectos relevantes y modo de invocacion
Se incluye en la raiz del proyecto un archivo `.json` de postman (`CBN-Reto.postman_collection.json) con todos los endpoints configurados y listos para ser importados e invocados por los evaluadores

### Endpoints (Diagramas logicos)
*   **POST `/producto`**
    *   **Exito (200):** Producto registrado.
    *   **Error (400):** Campos requeridos o con validaciones incorrectas
    *   **Error (409):** El producto "<nombre> ya existe.
*   **DELETE `/producto`**
    *   **Exito (200):** producto eliminado
    *   **Error (409):** El producto indicado no existe / El producto tiene stock mayor a 0
*   **GET `/productos`**
    *   **Exito (200):** Lista de productos filtrados por correo y ordenados alfabeticamente

### Herramientas
*   Nodejs
*   Postman
*   AWS console