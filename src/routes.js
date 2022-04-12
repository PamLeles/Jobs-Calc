const express = require('express');
const routes = express.Router();

//concatenar
const views = __dirname + "/views/"


const Profile = {
    data:{
        name: "Pâmela ",
        avatar: "https://avatars.githubusercontent.com/u/98628912?v=4",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    controllers:{
        index(){
            return res.render(views + "profile", { profile: Profile.data });
        },
    },
    
}
const job = {
    //obj
    data: [

        {
            id: 1,
            name: 'Pizzaria Guloso',
            "daily-hours": 2,
            "total-hours": 2,
            created_at: Date.now()

        },
        {
            id: 2,
            name: 'OneTwo Project',
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now()

        }


    ],

    controllers: {
        index(req, res) {
            const updatedJobs = job.data.map((job) => {
                //ajustes no job
                const remaining = job.services.remainingDays(job);
                const status = remaining <= 0 ? 'done' : 'progress'; //ternario

                return { //espalhamento
                    ...job,
                    remaining,
                    status,
                    budget: profile["value-hour"] * job["total-hours"]
                }
            })

            return res.render(views + "index", { jobs: updatedJobs });


        },
        create(req,res){
            return res.render(views + "job")
        },
        save(req, res) {
            //req.body = { name:"as", daily-hours:"3", 'total-hours':"3"}
            //req.body esta redirecionando os dados da pagina jobs para pag index
            const lastId = job.data[job.data.length - 1]?.id || 1;

            jobs.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()//atribuindo a data de hoje.
            })
            return res.redirect('/')
        },
    },

    services: {
        remainingDays(job) {
            //calculo de tempo restante
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

            const createdDate = new Date(job.created_at);
            const dueDay = createdDate.getDate() + Number(remainingDays);
            const dueDateInMs = createdDate.setDate(dueDay);

            const timeDiffInMs = dueDateInMs - Date.now();
            // Transformas milisegundos em dias
            // 1000 de mls, 60s, 60min, 24hrs
            const dayInMs = 1000 * 60 * 60 * 24;
            const dayDiff = Math.floor(timeDiffInMs / dayInMs);

            return dayDiff

        },

    },
}


    //req,res
    //render - renderizar
routes.get('/', job.controllers.index);
routes.get('/job',job.controllers.create);
routes.post('/job', job.controllers.save);
routes.get('/jobedit', (req, res) => res.render(views + "job-edit"));
routes.get('/profile',Profile.controllers.index); //enviando objeto


module.exports = routes; 
