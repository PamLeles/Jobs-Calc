const Database = require('./config')

const initdb = {
    async init() {

    const db = await Database()
    //criando tabela profile 
    await db.exec(`CREATE TABLE profile(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hour_per_day INT,
    vacation_per_year INT,
    value_hour INT
)`);
    //criando tabela jobs
    await db.exec(`CREATE TABLE jobs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
)`);
    //inserindo dados na tabela profile
    await db.run(` INSERT INTO profile (
    name,
    avatar,
    monthly_budget, 
    days_per_week,
    hour_per_day,
    vacation_per_year
    ) VALUES(
        "Pâmela",
        "https://avatars.githubusercontent.com/u/98628912?v=4",
        3000,
        5,
        5,
        4
    );`);

    await db.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES(
    "Pizzaria Guloso",
    2,
    1,
    1617514376018

);`)

    await db.run(` INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES(
    "OneTwo projects",
    3,
    47,
    1617514376018

);`)

        await db.close()

        // PRIMARY KEY => número identificador da informação 
    }
}

initdb.init()

