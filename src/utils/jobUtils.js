 module.exports = {
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

}