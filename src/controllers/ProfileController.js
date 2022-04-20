const Profile = require('../model/Profile');


module.exports = {
    index(req, res) {
        return res.render("profile", { profile: Profile.get() });
    },

    update(req, res) {
        //req.body para pegar oos dados
        const data = req.body;

        //definir quantas semanas tem no ano
        const weeksPerYear = 52;

        //remover as semanas de ferias do ano, p/ pegar quantas semanas tem 1 mês
        const weeksPerMonth = (weeksPerYear - +data["vacation-per-year"]) / 12;

        //total de horas trabalhdas na semana
        const weekTotalHours = +data["hours-per-day"] * +data["days-per-week"];

        // total de horas trabalhadas no mes
        const monthlyTotalHours = weekTotalHours * weeksPerMonth;

        // qual o valor da hora
        const valueHour = +data["monthly-budget"] / monthlyTotalHours;

        Profile.update({
            ...Profile.get(),
            ...req.body,
            "value-hour": valueHour
        });

        return res.redirect('/profile');

    }
}
