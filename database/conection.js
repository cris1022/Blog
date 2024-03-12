const mongoose = require("mongoose");

// Función para conectar a la base de datos
const connectToDatabase = async () => {
    try {
        // Conexión a la base de datos
        await mongoose.connect("mongodb://localhost:27017/Blog");

        console.log("Conexión establecida con MongoDB");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        throw new Error("No se ha podido conectar a la base de datos");
    }
};

module.exports = {
    connectToDatabase
};