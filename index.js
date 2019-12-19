var express = require ('express');
var app = express();
var AuthController = require('./Controllers/AuthController');
var BodyParser = require('body-parser');
var UserController = require('./Controllers/UserController');
var swaggerUI =require('swagger-ui-express');
var swaggerJSDoc=require('swagger-jsdoc');

app.use(BodyParser.urlencoded({extended: true}));
//documentation
var swaggerDefinition = {
    info: {
        title: 'Node Assignment',
        description: 'This is documentation of my project',
        version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/'
  };
  
  var swaggerOptions = {
    swaggerDefinition,
    apis: ['./index.js']
  };
  
  var swaggerSpecs = swaggerJSDoc(swaggerOptions);
  
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));


app.post('/registration', UserController.validation, UserController.Hashing,UserController.CheckIfExist,UserController.Registration);
app.post('/login',UserController.Login,AuthController.jwtTokenGen);
app.delete('/delete',AuthController.VerifyToken,UserController.Delete);
app.listen(3000);



