
var jwt = require('jsonwebtoken');




//generating token
function jwtTokenGen(req, res,next)
{	var myPayload = {username: req.body.username,
                    userLevel: 'superadmin'};
    jwt.sign( myPayload, 'secret', { expiresIn: '1h' },function(err, token)
    {if(err){ console.log(err);res.json(err);}
    else{console.log(token);res.json(token);}});

}
//verifying token
function VerifyToken(req, res, next)
{
   
    const token = req.headers.authorization.slice(7,req.headers.authorization.length);
   
    jwt.verify(token, 'key', function(err, decoded) {
        if (err) {
            console.log(err.message);
            res.json(err);
        } else {
            next();
        }
    })
}

	

module.exports={jwtTokenGen,VerifyToken};