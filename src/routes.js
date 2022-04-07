const express = require('express');
const routes = express.Router();

//concatenar
const views = __dirname + "/views/"


const profile = {
    name: "Pâmela ",
    avatar: "https://avatars.githubusercontent.com/u/98628912?v=4",
    "monthly-budget": 3000 ,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

//req,res
//render - renderizar
routes.get('/', (req, res) => res.render( views +"index"));
routes.get('/job', (req, res) => res.render( views +"job"));
routes.post('/job', (req, res) => {
    console.log(req.body)
});
routes.get('/jobedit', (req, res) => res.render( views +"job-edit"));
routes.get('/profile', (req, res) => res.render( views +"profile", { profile: profile})); //enviando objeto


module.exports = routes; 
