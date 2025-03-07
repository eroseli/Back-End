const jwt = require('jsonwebtoken');
const { json } = require('sequelize');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');  
require('dotenv').config(); 
const User = require('../models/User');

const login = async(email,password)=>{ // funcional

    try {        

        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        const token = jwt.sign({user}, JWT_SECRET,{expiresIn: '1h'});
        return {token};
        
    } catch (error) {
        return json({msg:''+error.message});
    }   

}

const insertuser = async (firstname, lastname, email, password, phonenumber,role,status, address, profilepicture) => { // funcional
    
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
        throw new Error('El usuario ya existe');
    }

    const user = await User.create({
        firstname,
        lastname,
        email,
        role,
        status,
        password,
        phonenumber,
        address,
        profilepicture,
    });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

const updateuser = async (id, firstname, lastname, email, password, phonenumber, role, status, address, profilepicture) => {

    const user = await User.findOne({ where: { id } });

      try {

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (password) {
            password = await bcrypt.hash(password, 10);  // Encriptar la contraseña
        }
    
        // Actualizar los campos del usuario
        const updatedUser = await User.update({
            firstname,
            lastname,
            email,
            role,
            status,
            password,
            phonenumber,
            address,
            profilepicture,
        }, {
            where: {
              id: id  
            }
          });

          if (updatedUser[0] === 0) {
            throw new Error('Usuario no encontrado o no se realizaron cambios');
          }
         
          return updatedUser;

      } catch (error) {
        console.log("Errror generado :"+error);
        return error.message;
      }

};

const getUsers = async(page,limit,role,status,search)=>{ //funcional

    try {
        
        if (!page || !Number.isInteger(page)) {
            return({ msg: "Page es requerido numerico entero" });
        }

        if (!limit || !Number.isInteger(limit)) {
            return({ msg:"Limit es requerido numerico entero" });
        }

        const whereClause = {
        };
        
        if (role) {
            whereClause.role = role; 
        }

        if (status) {
            whereClause.status = status;
        }
        
        if (search) { // busqueda por like
            console.log("Buscara "+ search)
            whereClause[Op.or] = [
              { firstname: { [Op.iLike]: `%${search}%` } },
              { email: { [Op.iLike]: `%${search}%` } },
            ]; 
        }

        const users = await User.findAndCountAll({
            limit: limit,
            role: role,
            where: whereClause,
        });
        
        return users;       

    } catch (error) {
        return {msg: error};
    }

};

const deleteUser = async(IdUser)=>{

    try {

        if (!IdUser || !Number.isInteger(IdUser)) {
            return { msg: "El Identificador debe ser Numerico" };
        }

        const user = await User.destroy({
            where: {
              id: IdUser
            }
          });
          
          if (user === 0) {
            return null;
          }
          return {user};

    } catch (error) {
        return { msg: error};
    }

}

module.exports = {login, insertuser,getUsers,deleteUser,updateuser };