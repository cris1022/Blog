const { connectToDatabase } = require("./database/conection");
const express = require("express");
const cors = require("cors");

//Creamos el servidor de node 
const app = express();
const puerto = 3900;

// Configuramos cors 
app.use(cors());

// Leer y convertir el body a un objeto js 
app.use(express.json()); // Recibir datos con content type app/json
app.use(express.urlencoded({ extended: true })); // Form /undencoded 

// Conectar a la base de datos
connectToDatabase()
    .then(() => {
        // Rutas
        const rutasArticulo = require("./rutas/articulo");

        // Cargamos las rutas 
        app.use("/api", rutasArticulo);

        // Crear rutas 
        // Prueba
        app.get("/probando", (req, res) => {
            console.log("Se ha ejecutado el endpoint probando");
            return res.status(200).send({});
        });

        // Crear servidor y escuchar peticiones http
        app.listen(puerto, () => {
            console.log("Servidor corriendo en el puerto " + puerto);
        });
    })
    .catch(error => {
        console.error("Error al conectar con la base de datos:", error.message);
        process.exit(1); // Salir de la aplicación si no se puede conectar a la base de datos
    });