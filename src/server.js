const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path")

//usando template engine
server.set('view engine', 'ejs');

//habilitar arquivos statics
server.use(express.static("public"));

//mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'));

//habilitado o uso do req.body
server.use(express.urlencoded({extended: true}));

//routes
server.use(routes);

server.listen(3000, () => console.log('rodando'));

