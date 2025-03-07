const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/DataBase'); // Configuración de la base de datos

class User extends Model {
  // Método estático para comparar la contraseña
  static async comparePassword(password, hash) {
    return bcrypt.compare(password, hash); // Compara la contraseña ingresada con el hash almacenado
  }

  // Método estático para encriptar la contraseña antes de crear o actualizar
  static async hashPassword(user) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10); // Encripta la contraseña
    }
  }
}

// Definición del modelo utilizando el método init de Sequelize
User.init(
  {
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Debe ser una dirección de correo electrónico válida',
        },
      },
    },
    phonenumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('Admin', 'User'),
      defaultValue: 'User',
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      defaultValue: 'Active',
    },
    address: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    profilepicture: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false, 
    hooks: {
      beforeCreate: User.hashPassword, // Encriptar la contraseña antes de crear
      beforeUpdate: User.hashPassword, // Encriptar la contraseña antes de actualizar
    }
  }
);

module.exports = User;
