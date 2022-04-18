const Job = require ('../model/job')
const jobUtils = require('../utils/jobUtils')
const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();
        const updatedJobs = jobs.map((job) => {
            //ajustes no job
            const remaining = jobUtils.remainingDays(job);
            const status = remaining <= 0 ? 'done' : 'progress'; //ternario
    
            return { //espalhamento
                ...job,
                remaining,
                status,
                budget: jobUtils.calculateBudget(job, profile["value-hour"])
            }
        })
        return res.render("index", { jobs: updatedJobs });
    }

}
