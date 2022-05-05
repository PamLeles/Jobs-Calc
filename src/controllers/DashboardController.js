const Job = require('../model/job')
const jobUtils = require('../utils/jobUtils')
const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        const jobs = await Job.get();
        const profile = await Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length

        }

        //total de horas por dia de cada job em progresso
        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {
            //ajustes no job
            const remaining = jobUtils.remainingDays(job);
            const status = remaining <= 0 ? 'done' : 'progress'; //ternario

            //status = done ou progress
            //statusCount[done ou progress] += 1
            //somando a quantidade de status
            statusCount[status] += 1;

            //total de horas por dia de cada job em progresso
            //codigo refatorado
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours;

            return { //espalhamento
                ...job,
                remaining,
                status,
                budget: jobUtils.calculateBudget(job, profile["value-hour"])
            }
        });
        //quant de horas/dias que irá trabalhar (profile)
        //menos
        // quant de horas/dias de cada jab em progess
        const freeHours = profile["hours-per-day"] - jobTotalHours;

        return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours });
    }

}
