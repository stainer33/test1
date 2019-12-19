var express = require ('express');
var app = express();
var UserModel = require('./Models/UserModel'); 
var BodyParser = require('body-parser');
var UserController = require('./Controllers/UserController');

app.use(BodyParser.urlencoded({extended: true}));
app.post('/registration', UserController.validation, UserController.Hashing,UserController.CheckIfExist,UserController.Registration);

app.listen(3000);



