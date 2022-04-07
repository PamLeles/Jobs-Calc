const express = require('express');
const routes = express.Router();

//concatenar
const views = __dirname + "/views/"

//req,res
//render - renderizar
routes.get('/', (req, res) => res.render( views +"index"));
routes.get('/job', (req, res) => res.render( views +"job"));
routes.get('/jobedit', (req, res) => res.render( views +"job-edit"));
routes.get('/profile', (req, res) => res.render( views +"profile"));


module.exports = routes; 
