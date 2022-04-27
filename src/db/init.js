const Database = require('config');

Database()

Database.exec(`CREATE TABLE profile(
    id INTERGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    mothly-budget INT,
    days-per-week INT,
    hour-per-day INT,
    vacation-per-year INT,
    value-hour INT
)`);

Database.close()

 // PRIMARY KEY => número identificador da informação 