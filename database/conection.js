require('dotenv').config();
const mongoose = require("mongoose");

// Función para conectar a la base de datos
const connectToDatabase = async () => {
    try {
        // Conexión a la base de datos MongoDB Atlas utilizando la cadena de conexión SRV URI definida en el archivo .env
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log("Conexión establecida con MongoDB");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        throw new Error("No se ha podido conectar a la base de datos");
    }
};

module.exports = {
    connectToDatabase
};