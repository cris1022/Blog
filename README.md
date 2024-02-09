--Inicialisamos nuestro proyecto 
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
------
configuramos scripts y dependencias 
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


