const express = require('express');
const routes = express.Router();

//concatenar
const views = __dirname + "/views/"


const profile = {
    name: "Pâmela ",
    avatar: "https://avatars.githubusercontent.com/u/98628912?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

const jobs = [
    {
        id: 1,
        name: 'Pizzaria Guloso',
        "daily-hours": 2,
        "total-hours": 60,
        created_at: Date.now()
    },
    {
        id: 2,
        name: 'OneTwo Project',
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now()
    }
    
]

//req,res
//render - renderizar
routes.get('/', (req, res) => res.render(views + "index", { jobs }));
routes.get('/job', (req, res) => res.render(views + "job"));
routes.post('/job', (req, res) => {
    //req.body = { name:"as", daily-hours:"3", 'total-hours':"3"}
    //req.body esta redirecionando os dados da pagina jobs para pag index
    const lastId = jobs[jobs.length - 1] ?.id || 1;

    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
         created_at: Date.now()//atribuindo a data de hoje.
    })
    return res.redirect('/')
});
routes.get('/jobedit', (req, res) => res.render(views + "job-edit"));
routes.get('/profile', (req, res) => res.render(views + "profile", { profile: profile })); //enviando objeto


module.exports = routes; 
