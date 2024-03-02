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