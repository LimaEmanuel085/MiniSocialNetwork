//Importações//

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);

const mongoUser = process.env.DB_USER;
const mongoPassword = process.env.DB_USER_PASSWORD;

mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPassword}@clusterlogin.zdmop24.mongodb.net/?retryWrites=true&w=majority&appName=ClusterLogin`).then(() => {

    app.listen(3000, () => {        
        console.log('Conectado ao MongoDB Atlas');
        console.log('Serveridor rodando na porta 3000');
    });
    
}).catch((err) => console.log(err));

