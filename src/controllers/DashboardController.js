const Job = require ('../model/job')
const jobUtils = require('../utils/jobUtils')
const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();

        let statusCount = {
            progress: 0,
            done:0,
            total:jobs.length

        }

        const updatedJobs = jobs.map((job) => {
            //ajustes no job
            const remaining = jobUtils.remainingDays(job);
            const status = remaining <= 0 ? 'done' : 'progress'; //ternario
            
            //status = done
            //statusCount[done] += 1
            //somando a quantidade de status
            statusCount[status] += 1; 
    
            return { //espalhamento
                ...job,
                remaining,
                status,
                budget: jobUtils.calculateBudget(job, profile["value-hour"])
            }
        })
        return res.render("index", { jobs: updatedJobs, profile: profile, statutsCount: statusCount });
    }

}
