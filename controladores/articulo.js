const fs=require ("fs");
const path=require("path");
const validator=require("validator");
const Articulo=require("../modelos/Articulo");


// relaizaremos porgramacion funcional 
const prueba=(req,res)=>{ //recordemos req y res es el requeriemiento y su respuesta 

    return res.status(200).json({
        mensaje:"Soy una accion de prueba en mi controladfor de articulos "
    })

};

//creamos un nuvo metodo para guardar 

const crear = async (req, res) => {
    try {
        // Recoger los parámetros por POST a guardar
        let parametros = req.body;

        // Validar los datos
        let validarTitulo = !validator.isEmpty(parametros.titulo) && validator.isLength(parametros.titulo, { min: 1, max: 100 });
        let validarContenido = !validator.isEmpty(parametros.contenido);

        if (!validarTitulo || !validarContenido) {
            throw new Error("No se ha validado la información");
        }

        // Crear el objeto a guardar
        const articulo = new Articulo(parametros);

        // Guardar el artículo en la base de datos
        const articuloGuardado = await articulo.save();

        return res.status(200).json({
            status: "success",
            articulo: articuloGuardado,
            mensaje: "Artículo creado con éxito"
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }
};
//vamos a listar los articulos 

const listar = async (req, res) => {
    try {
        // Obtener todos los artículos
        let consulta = await Articulo.find({})
        .limit(20)
       
        
       .sort({fecha:1});
                                        

        if (!consulta || consulta.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado artículos"
            });
        }

        return res.status(200).json({
            status: "success",
            parametro:req.params.ultimos,
            contador:consulta.length,
            consulta
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener los artículos"
        });
    }
};
const uno = async (req, res) => {
    try {
        // Recoger un id por la url
        let Id = req.params.Id;

        // Buscar el artículo
        const articulo = await Articulo.findById(Id);

        // Si no existe, devolver error
        if (!articulo) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado artículos"
            });
        }

        // Devolver resultado
        return res.status(200).json({
            status: "Success",
            articulo
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener el artículo"
        });
    }
};
 // Borrar un artículo por su ID
 const borrar = async (req, res) => {
    try {
        const articuloId = req.params.Id; // Obtener el ID del artículo desde los parámetros de la solicitud

        // Buscar y eliminar el artículo por su ID
        const articuloEliminado = await Articulo.findOneAndDelete(articuloId)

        if (!articuloEliminado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontró ningún artículo con ese ID"
            });
        }

        return res.status(200).json({
            status: "success",
            articulo:articuloEliminado,
            mensaje: "Artículo eliminado correctamente"
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al procesar la solicitud"
        });
    }
};
// Editar un artículo por su ID
const editar = async (req, res) => {
    try {
        const articuloId = req.params.Id; // Obtener el ID del artículo desde los parámetros de la solicitud
        const nuevosParametros = req.body; // Obtener los nuevos parámetros desde el cuerpo de la solicitud

        // Validar los datos (puedes agregar más validaciones según tus necesidades)
        const validarTitulo = !validator.isEmpty(nuevosParametros.titulo) && validator.isLength(nuevosParametros.titulo, { min: 5, max: 30 });
        const validarContenido = !validator.isEmpty(nuevosParametros.contenido);

        if (!validarTitulo || !validarContenido) {
            throw new Error("No se ha validado la información");
        }
        if (validarTitulo.length === 0 || validarContenido.length === 0) {
            throw new Error("campos incompletos");
        }


        // Buscar y actualizar el artículo por su ID
        const articuloActualizado = await Articulo.findByIdAndUpdate(articuloId, nuevosParametros, { new: true });

        if (!articuloActualizado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontró ningún artículo con ese ID"
            });
        }

        return res.status(200).json({
            status: "success",
            articulo: articuloActualizado,
            mensaje: "Artículo actualizado correctamente"
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al procesar la solicitud"
        });
    }
};
const subir = async (req, res) => {
    // Recoger el fichero de imagen subido y comprobar que siempre se suba uno 
    if (!req.file) {
        return res.status(404).json({
            status: "error",
            mensaje: "No hay archivo para subir"
        });
    }

    // Nombre del archivo
    let archivo = req.file.originalname;

    // Comprobar la extensión 
    let archivo_split = archivo.split(".");
    // La extensión sería 
    let extension_archivo = archivo_split[1];

    // Comprobar que la extensión sea la correcta 
    if (extension_archivo != "png" && extension_archivo != "jpg" &&
        extension_archivo != "jpeg" && extension_archivo != "gif") {
        // Borramos la respuesta
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: error,
                mensaje: "Imagen inválida"
            });
        });
    } else {
        try {
            const articuloId = req.params.Id; // Obtener el ID del artículo desde los parámetros de la solicitud

            // Buscar y actualizar el artículo por su ID
            const articuloActualizado = await Articulo.findByIdAndUpdate(articuloId, { imagen: req.file.filename }, { new: true });

            if (!articuloActualizado) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "No se encontró ningún artículo con ese ID"
                });
            }

            return res.status(200).json({
                status: "success",
                articulo: articuloActualizado,
                mensaje: "Artículo actualizado correctamente"
            });
        } catch (error) {
            return res.status(400).json({
                status: "error",
                mensaje: "Error al procesar la solicitud"
            });
        }
    }
}

const imagen = (req,res)=>{
    let fichero= req.params.fichero;
    //ruta fisica 
    let ruta_fisica="./imagenes/articulos/"+fichero;
    fs.stat(ruta_fisica,(error, stats)=>{
        if (!error && stats.isFile()){
            return res.sendFile(path.resolve(ruta_fisica));
        }else{
            return res.status(404).json({
                status:"error",
                mensaje:"La imagen no existe"
            });
        }
    })
}
const buscador = async (req,res)=>{
    //sacra el string de busqueda 
    let busqueda= req.params.busqueda;

    try {
        //Find OR
        let articulosEncontrados = await Articulo.find({"$or":[
            {"titulo":{"$regex":busqueda,"$options":"i"}},
            {"contenido":{"$regex":busqueda,"$options":"i"}},
        ]}) 

        //Ordenar
        .sort({fecha:-1});

        if(!articulosEncontrados||articulosEncontrados.length<=0){
            return res.status(404).json({
                status:"error",
                mensaje:"No se han encontrado articulos "
            });
        }

        return res.status(200).json({
            status:"success",
            articulos:articulosEncontrados
        });

    } catch(error) {
        return res.status(500).json({
            status:"error",
            mensaje:"Error al buscar los articulos"
        });
    }
}
    
module.exports = {
    prueba,
    crear,
    listar,
    uno,
    borrar,
    editar,
    subir,
    imagen,
    buscador
};

