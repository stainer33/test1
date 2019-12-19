
var jwt = require('jsonwebtoken');




//generating token
function jwtTokenGen(req, res,next)
{	var myPayload = {username: req.body.username,
                    userLevel: 'superadmin'};
    jwt.sign( myPayload, 'secret', { expiresIn: '1h' },function(err, token)
    {if(err){ console.log(err);res.json(err);}
    else{console.log(token);res.json(token);}});

}



	

module.exports={jwtTokenGen};