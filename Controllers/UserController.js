var bcrypt = require('bcrypt');
var users = require('../Models/UserModel');

//checking if username or password field empty or not
function validation(req, res, next)
{
    if(req.body.username == '' ||req.body.password == '')
    {
        res.json({ status: 400, message: 'Username/password is required!' });
        console.log('unsucccess');
    } 
    else{ 
        console.log('validation success');next();}
    
}

//checking username already exist or not
function CheckIfExist(req, res, next)
{//select query
    users.findOne({
        where:{UserName:req.body.username},
        
    })
    .then(function(result)
    {
        if(result===null)
        {
            console.log("no username found");
            next();
        }
        else
        {
            res.json({ status: 409, message: 'Username already exist' });
        }
    })
}
//password hashing
function Hashing (req, res, next)
{var saltRounds=10;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if(hash)
        {
            req.hashed = hash;//setting hashed password to req object
             console.log(hash); 
             next();
        }
        if(err)
        { console.log('failed');}
       
      });
}

//registration 
function Registration(req, res, next)
{
   
    users.create({
        UserName: req.body.username,
        Password: req.hashed
    })
    .then(function (result)
    {
        console.log("recorded");
        res.json({ status: 201, message: 'Registration done' });
    })
    .catch(function(err){
        console.log("failed");
        res.json({ status: 409, message: 'Registration failed' });
    })
}
//login 
function Login(req, res, next)
{//select query
  //  console.log(users);
  if(req.body.username == '' ||req.body.password == '')
  {
    res.json({ status: 400, message: 'Enter username or password!' });
      console.log('unsucccess');
  } 
  else{ 

      console.log('validation success');
      var saltRounds=10;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if(hash)
        {
            users.findOne({
                where:{UserName: req.body.username,Password:hash} })
            .then(function(result)
            {
                if(result===null)
                {
                    console.log('Login successful');
                    res.json({status: 201, message: "Login successful"});
                    next();
                    
                }
                else
                {
                    console.log("Login unsuccessful");
                    res.json({status: 404, message: "Invalid login"});   
                }
            })
             
             
        }
        else
        { console.log('failed');}
       
      });
   
     }
  
}
 //delete
 function Delete(req, res, next)
{
    console.log(req.params.id);
    if (req.body.id === null || req.body.id === undefined) {
        res.json({ status: 404, message: 'User not found' })
    }
    users.destroy({
      where:{ UserName: req.body.id}
        
    })
    .then(function (result)
    {
           
            res.json({ status: 201, message: 'User deleted successfully' });
        
    })
    .catch(function(err){
        console.log(err);
        
        res.json({ status: 500, message: 'could not delete' });
    })
}




//exporting functions
module.exports={validation, CheckIfExist, Hashing, Registration,Login,Delete};