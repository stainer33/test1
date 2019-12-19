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
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'authorization',
            in: 'header',
            schema: 'bearer'
        }
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
/**
 * @swagger
 * /registration:
 *  post:
 *   tags:
 *    - Users
 *   description: User-registration testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: username
 *      in: formData
 *      type: string 
 *      required: true
 *      description: Enter unique username
 *    - name: password
 *      in: formData
 *      type: string
 *      required: true
 *      description: Enter password
 *   responses:
 *    201:
 *     description: registerion done
 *    409:
 *     description: username already exist
 *    500:
 *     description: internal server errors
 *
 */
app.post('/login',UserController.Login,AuthController.jwtTokenGen);

/**
 * @swagger
 * /login:
 *  post:
 *   tags:
 *    - Users
 *   description: User login testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: username
 *      in: formData
 *      type: string 
 *      required: true
 *      description: Enter username
 *    - name: password
 *      in: formData
 *      type: string
 *      required: true
 *      description: Enter password
 *   responses:
 *    201:
 *     description: Login successfully
 *    400:
 *     description: Invalid Login
 *    500:
 *     description: Internal server errors
 *
 */
app.delete('/delete',AuthController.VerifyToken,UserController.Delete);

/**
 * @swagger
 * /user/{id}:
 *  delete:
 *   tags:
 *    - Users
 *   security:
 *    - bearerAuth: []
 *   description: User delete testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: pleasae provide id
 *   responses:
 *    201:
 *     description: User deleted successfully
 *    404:
 *     description: User not found
 *    500:
 *     description: Could not delete
 *
 */

app.listen(3000);



