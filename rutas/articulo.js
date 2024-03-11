const express = require("express");
const multer = require("multer");
const ArticuloController = require("../controladores/articulo");

const router = express.Router();

// donde almacenaremos la imagen 

const almacenamiento=multer.diskStorage({
    //metodo 
    destination: function(req,file,cb){
        cb(null, './imagenes/articulos/')
    },

    //metodo conseguimos el nombre de cada uno de los archivos 
    filename: function(req, file, cb){
        cb(null, "articulo"+ Date.now()+file.originalname)
    }
})
// debem,os decirle a multer que ese va a aser el almacenamiento de los archivos 

const subidas = multer({storage:almacenamiento})


const Articulo = require("../modelos/Articulo");

// Rutas de prueba
// router.get("/ruta-de-prueba", Articulo.prueba);

// Rutas útiles

// Guardar un artículo
router.post("/crear", ArticuloController.crear);

// Obtener todos los artículos (opcionalmente los últimos)
router.get("/articulos/:ultimos?", ArticuloController.listar);

// Obtener un solo artículo por su ID
router.get("/articulo/:id", ArticuloController.uno);

// Borrar un artículo por su ID
router.delete("/articulo/:id", ArticuloController.borrar);

// Editar articulo 
router.put("/articulo/:id", ArticuloController.editar);

// subir archivo  
router.post("/subir-imagen/:id", subidas.single("file0"),ArticuloController.subir);

// subir archivo  
router.get("/imagen/:fichero",ArticuloController.imagen);

// subir buscador  
router.get("/buscar/:busqueda",ArticuloController.buscador);


module.exports=router;