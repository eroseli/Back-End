const { response } = require('express');
const User = require('../models/User');
const UserService = require('../services/userService');
const { json } = require('sequelize');
const { user } = require('pg/lib/defaults');

const users = [
    new User(1, 'Daniel Diaz','@daniel.diaz'),
    new User(2, 'Ricardo','@daniel.diaz')
]

function getUserById(req,res){

    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id == userId);

    if(user){
        res.json(user)
    }
    else{
        res.status(404).json({message : 'User not Found'})
    }

}

const login = async(req,res)=> // Operativo
{
    try {
        const { email, password } = req.body;
        const response = await UserService.login(email,password);
        return  res.status(200).json({ response });
    } catch (error) {      
    }
}

// Registrar un usuario
const registerUser = async (req, res) => { // Operativo
    const { firstname, lastname, email, password, phonenumber,role, status, address, profilepicture } = req.body;
    try {
        const user = await UserService.insertuser(firstname, lastname, email, password, phonenumber,role,status, address, profilepicture);
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const updateUsers = async(req,res)=>{ //Actualizar Usuario
    
    const { id,firstname, lastname, email, password, phonenumber,role, status, address, profilepicture } = req.body;

    try {
        const user = await UserService.updateuser(id,firstname, lastname, email, password, phonenumber,role,status, address, profilepicture);
        res.status(201).json({ user });      
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}

const getUsers = async (req,res)=>{ // obtener usuarios

    const {page, limit,role,status, search} = req.body;
    try {
        
        const response = await UserService.getUsers(page,limit,role,status,search);
        res.status(200).json({response});

    } catch (error) {
        res.status(500).json({msg:error.message});
    }

}

const deleteUsers = async(req,res)=>{ // Eliminar usuario

    const IdUser = parseInt(req.params.id);

    try {

        const user = await UserService.deleteUser(IdUser);

        console.log("Valor "+user); 

        if (user != null) {
            res.json(user);
        } else {
            res.status(404).json({ msg: 'Usuario no encontrado' });
        }

    } catch (error) {
      res.status(500).json({ msg: error.message });
    }

}

module.exports = {  getUserById, login, registerUser,getUsers, deleteUsers, updateUsers };

