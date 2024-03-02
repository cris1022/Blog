1.--Inicialisamos nuestro proyecto 
-ejecutamos el comando npm init en la consola 
-- obserbaremos la creacion del paquete incial 
{
  "name": "blog",
  "version": "1.0.0",
  "description": "Apirest_para_un_blog",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "cabondano@novopayment",
  "license": "ISC"
}
--
2.--configuramos scripts y dependencias 
instalamos express para manejas las peticiones http
con el siguinete comando npm install express --save
--Intalamos mongoose
usando el siguiente comandonpm install mongoose --save 
--Instalamos una librearia para poder subir archivos (fotos documentos)
npm install multer --save

---instalamos una libreria que nos permita validar datos 
    npm install validator --save

---Instalamos dependidecian para no tener problemas de origen o cors 
      npm install cors --save  
---Intalamos la dependencia que automaticamente va actualizando el servidor sollo en desarrollo 
        npm install nodemon --save-dev

--Actualizacion package 
    en el script del paquete principal añadimos "start":"nodemon index.js" para observas los cambios en tiempo real

3.---Conexion a la base de datos 
creamos la carpeta database 
creamos el archivo conection.js
configuramos la conexion 
--
const mongoose = require("mongoose");

// URL de conexión a tu base de datos (cambia según tus credenciales y configuración)
const dbUrl = "mongodb+srv://abondano930719:Novo12345@cluster9307.lknvmo6.mongodb.net/mi_blog"; // Cambia "mi_blog" al nombre de tu base de datos

// Conexión a MongoDB
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
});

// Manejo de eventos de conexión
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexión:"));
db.once("open", () => {
    console.log("Conexión exitosa a la base de datos");
});

// Exporta la conexión para usarla en otros archivos
module.exports = db;

4.-importamos la conexion al documento index 
// Otro archivo (por ejemplo, index.js)
const db = require("./database/conection"); // Ajusta la ruta según la ubicación de tu archivo

// Ahora puedes usar la conexión para interactuar con la base de datos
// Ejemplo: consulta, inserción, actualización, eliminación, etc.

5.-Creamos el servidor de node 
  *Importamos express 
//
6.-Creamos el esquema para los artyiculos en un archivo llamadao 
  Articulo.js dentro de una carpeta nueva llamada modelos 
  const{Schema,model}=require("mongoose");

const ArticuloSchema=Schema({
    titulo:{
        type: String,
        require:true
    },
    contenido:{
        type:String,
        require:true},
    fecha:{
        type:Date,
        default:Date.now
    },
    imagen:{
        type:String,
        default:"default.png"
    }
})
//Exportamos la colexion, el tercer parametyro es la colleccion a la 
module.exports=model("Articulo",ArticuloSchema,"articulos");
//
7.Creamos los contyroladores los cuales manejaran cviertas acciones 

// relaizaremos porgramacion funcional 
const prueba=(req,res)=>{ //recordemos req y res es el requeriemiento y su respuesta 

    return res.status(200).json({
        mensaje:"Soy una accion de prueba en mi controladfor de articulos "
    })

}

module.exports={
    prueba
}
8