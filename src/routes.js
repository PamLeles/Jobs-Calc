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

const jobs = []

//req,res
//render - renderizar
routes.get('/', (req, res) => res.render( views +"index"));
routes.get('/job', (req, res) => res.render( views +"job"));
routes.post('/job', (req, res) => {
    //req.body = { name:"as", daily-hours:"3", 'total-hours':"3"}
    //req.body esta redirecionando os dados da pagina jobs para pag index
    jobs.push(req.body)
    return res.redirect('/')
 });
routes.get('/jobedit', (req, res) => res.render( views +"job-edit"));
routes.get('/profile', (req, res) => res.render( views +"profile", { profile: profile})); //enviando objeto


module.exports = routes; 
