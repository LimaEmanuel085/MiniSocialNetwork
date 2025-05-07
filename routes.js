const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const userController = require('./src/controllers/userController');
const loginController = require('./src/controllers/loginController');
const profileController = require('./src/controllers/profileController');
const adminController = require('./src/controllers/adminController');

const verifyJWT = require('./src/middlewares/verifyJWT');
const adminVerify = require('./src/middlewares/adminVerify');

//Public main route
route.get('/', homeController.viewUsers);

//Admin routes
route.get('/admin/users/:pass', adminVerify.checkAdmin ,adminController.viewUsers);
route.get('/admin/user/:pass', adminVerify.checkAdmin ,adminController.viewUser);
route.post('/admin/user/:pass', adminVerify.checkAdmin ,adminController.createUser);
route.delete('/admin/user/:pass', adminVerify.checkAdmin ,adminController.deleteUser);
route.put('/admin/user/:pass', adminVerify.checkAdmin ,adminController.updateUser);

//User routes - Public
route.post('/user/register', userController.createUser);
route.post('/user/login', loginController.loginUser);

//User routes - Private
route.get('/user/profile/:id', verifyJWT.checkToken ,profileController.viewProfile);
route.put('/user/profile/:id', verifyJWT.checkToken ,profileController.updateProfile);
route.delete('/user/profile/:id', verifyJWT.checkToken ,profileController.deleteProfile);

module.exports = route;