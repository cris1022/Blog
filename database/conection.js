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