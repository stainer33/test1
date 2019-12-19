var express = require ('express');
var app = express();
var AuthController = require('./Controllers/AuthController');
var BodyParser = require('body-parser');
var UserController = require('./Controllers/UserController');

app.use(BodyParser.urlencoded({extended: true}));


app.post('/registration', UserController.validation, UserController.Hashing,UserController.CheckIfExist,UserController.Registration);
app.post('/login',UserController.Login,AuthController.jwtTokenGen);
app.delete('/delete',AuthController.VerifyToken,UserController.Delete);
app.listen(3000);



