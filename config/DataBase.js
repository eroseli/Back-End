const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.development); // Usamos la configuración para desarrollo

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a PostgreSQL establecida correctamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
        process.exit(1);
    }
};

module.exports = sequelize;
