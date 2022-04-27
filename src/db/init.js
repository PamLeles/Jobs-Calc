const Database = require('./config');

Database() //abriu conexão

//criou tabela profile 
Database.exec(`CREATE TABLE profile(
    id INTERGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    mothly_budget INT,
    days_per_week INT,
    hour_per_day INT,
    vacation_per_year INT,
    value_hour INT
)`);
//criou tabela jobs
Database.exec(`CREATE TABLE jobs(
    id INTERGER PRIMARY KEY AUTOINCREMENT,
    name TEXTm
    daily_hours INT,
    total_hours INT,
    created_at DATETIME,
)`);
//inserindo dados na tabela profile
Database.run(` INSERT INTO profile (
    name,
    avatar,
    monthly_budget, 
    days_per_week,
    hour_per_day,
    vacation_per_year,
    value_hour
    ) VALUES(
        "Pâmela",
        "https://avatars.githubusercontent.com/u/98628912?v=4",
        3000,
        5,
        5,
        4
    );`);

Database.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at,
) VALUES(
    "Pizzaria Guloso",
    2,
    1,
    1617514376018

);`)

Database.run(` INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at,
) VALUES(
    "OneTwo projects",
    3,
    47,
    1617514376018

);`)

Database.close()

 // PRIMARY KEY => número identificador da informação 


