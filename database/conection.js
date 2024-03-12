const mongoose = require("mongoose");

// URL de conexión a tu base de datos (cambia según tus credenciales y configuración)
const dbUrl = "mongodb+srv://abondano930719:Novo12345@cluster9307.lknvmo6.mongodb.net/mi_blog"; // Cambia "mi_blog" al nombre de tu base de datos

// Opciones de conexión de MongoDB
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Conexión a MongoDB
mongoose.connect(dbUrl, dbOptions)
  .then(() => console.log("Conexión exitosa a la base de datos"))
  .catch(error => console.error("Error de conexión:", error));

// Manejo de eventos de conexión
const db = mongoose.connection;

// Exporta la conexión para usarla en otros archivos
module.exports = db;