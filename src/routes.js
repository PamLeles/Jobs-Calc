const express = require('express');
const routes = express.Router();
const ProfileController = require ('./controllers/ProfileController');

const Job = {
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
            const updatedJobs = Job.data.map((job) => {
                //ajustes no job
                const remaining = Job.services.remainingDays(job);
                const status = remaining <= 0 ? 'done' : 'progress'; //ternario

                return { //espalhamento
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                }
            })

            return res.render("index", { jobs: updatedJobs });


        },
        create(req, res) {
            return res.render("job")
        },
        save(req, res) {
            //req.body = { name:"as", daily-hours:"3", 'total-hours':"3"}
            //req.body esta redirecionando os dados da pagina jobs para pag index
            const lastId = Job.data[Job.data.length - 1]?.id || 0;
            // nome do ? optional chaining operator
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()//atribuindo a data de hoje.
            })
            return res.redirect('/')
        },
        show(req, res) {

            const jobId = req.params.id;

            const job = Job.data.find(job => Number(job.id) === Number(jobId));

            if (!job) {
                return res.send('Job not found!!')
            };
            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"]);

            return res.render("job-edit", { job });
        },
        update(req, res) {

            const jobId = req.params.id;

            const job = Job.data.find(job => Number(job.id) === Number(jobId));

            if (!job) {
                return res.send('Job not found!!')
            };

            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"],
            }
            Job.data = Job.data.map(job => {
                if (Number(job.id) === Number(jobId)) {
                    job = updatedJob
                };
                return job;
            });
            res.redirect('/job/' + jobId);
        },
        delete(req,res){
            const jobId = req.params.id;
            
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId));

            return res.redirect('/');
            
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

            return dayDiff;

        },
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"],

    },
}



//req,res
//render - renderizar
routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);
routes.get('/job/:id', Job.controllers.show);
routes.post('/job/:id', Job.controllers.update);
routes.post('/job/delete/:id', Job.controllers.delete);
routes.get('/profile', ProfileController.index); //enviando objeto
routes.post('/profile', ProfileController.update); //enviando objeto


module.exports = routes; 
