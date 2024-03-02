// Otro archivo (por ejemplo, index.js)
const db = require("./database/conection"); // Ajusta la ruta según la ubicación de tu archivo
// Importamos express
const express=require("express");
// Importamos cors 
const cors=require("cors");


// Ahora puedes usar la conexión para interactuar con la base de datos
// Ejemplo: consulta, inserción, actualización, eliminación, etc.

//Creamos el servidor de node 
const app= express();
const puerto=3900;

//configuramos cors 
app.use(cors());

//Leer y convertir el body a un objeto js 
app.use(express.json());//recibir datos con content type app/json
app.use(express.urlencoded({extended:true}));//form /undencoded 

//rutas

const rutas_articulo=require("./rutas/articulo");

//cargamos las rutas 

app.use("/api", rutas_articulo);

app.use(express.json());

//Crear rutas 
//prueba
app.get("/probando",(req, res)=>{
    console.log("Se ha ejecutado el end point probando")
    return res.status(200).send({

    });
});

//Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log(" Servidor corriendo en el puerto " + puerto)

});