const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

//Login
router.post('/login',userController.login); 
//middle
router.post('/users',authMiddleware, userController.registerUser); 
router.get('/users',authMiddleware, userController.getUsers);
router.delete('/users/:id', authMiddleware, userController.deleteUsers);
router.put('/users/:id',authMiddleware, userController.updateUsers);

module.exports = router;