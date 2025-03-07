// config/config.js
module.exports = {
    development: {
        username: 'postgres',
        password: 'root',
        database: 'Karimnot',
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
    },
};
