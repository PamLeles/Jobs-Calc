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

function remainingDays(job){
     //calculo de tempo restante
     const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

     const createdDate = new Date(job.created_at);
     const dueDay = createdDate.getDate() + Number(remainingDays);
     const dueDate = createdDate.setDate(dueDay);
     
     const timeDiffInMs = dueDateInMs - Date.now();
     // Transformas milisegundos em dias
     // 1000 de mls, 60s, 60min, 24hrs
     const dayInMs = 1000 * 60 * 60 * 24;
     const dayDiff = Math.floor(timeDiffInMs / dayInMs);

     return dayDiff 

}

//req,res
//render - renderizar
routes.get('/', (req, res) => {

    const updatedJobs = jobs.map((job) => {
        //ajustes no job
      const remaining = remainingDays(job);
      const status = remaining <= 0 ? 'done' : 'progress'; //ternario

        return { //espalhamento
            ...job,
            remaining,
            status
        }
    })

    return res.render(views + "index", { jobs })
});







routes.get('/job', (req, res) => res.render(views + "job"));
routes.post('/job', (req, res) => {
    //req.body = { name:"as", daily-hours:"3", 'total-hours':"3"}
    //req.body esta redirecionando os dados da pagina jobs para pag index
    const lastId = jobs[jobs.length - 1]?.id || 1;

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
