const jwt = require("jsonwebtoken");
require('dotenv').config();
const {SECRET_KEY} = process.env
const {expired_tokens} = require('../controllers/UserController')

function verifyToken(req, res, next){
    const bearerHeader =  req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined' && bearerHeader.startsWith('Bearer')){
        const token = bearerHeader.split(" ")[1];

        expired_tokens.includes(token) ? res.send('This token is already expired') :


        jwt.verify(token, SECRET_KEY, (error,decoded)=>{
            if(error){
                return res.send({
                    error: "token not valid",
                    token
                })
            }
            else{
               req.decoded = decoded
               next()
            }
        })
    }else{
        return res.status(403).send({error: 'you need athorization'});
    }
}

module.exports = verifyToken;
