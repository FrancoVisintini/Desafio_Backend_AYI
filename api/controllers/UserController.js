const Users = require('../models/UserModel');
const jwt = require("jsonwebtoken")
require('dotenv').config();
const validator = require('validator');
const bcrypt = require('bcrypt')
const {SECRET_KEY} = process.env

const expired_tokens = []

const getUsersController = async (req, res) => {

    let id = req.query.id ? req.query.id : ''
    console.log(id)
    
    try {
    
        let users;
        if(id){
            users = await Users.findById(id)
        }
        else {
            users = await Users.find()
        }
        users !== null ?
        res.send(users)
        : res.status(404).send('User not found')
    } catch (e) {
        res.status(500).send("There was a problem with the request")
    }
}

const signUpUserController = async (req, res) => {
    let { first_name, last_name, email, password} = req.body
    if (!validator.isAlpha(first_name,'en-US', {ignore: ' -'}) || !validator.isAlpha(last_name,'en-US', {ignore: ' -'}) || !validator.isEmail(email) || !validator.isAlphanumeric(password)) {
        res.status(400).send("Invalid parameters")
        return
    }
    try {
        const rounds = 10
        bcrypt.hash(password,rounds, (err,hash)=>{
            password_hashed = hash
            const new_user = new Users({first_name, last_name, email, password: password_hashed})
            new_user.save()
            .then(() => {res.send("User created")})
        })
    } catch (e) {
        res.status(500).send("Server error")
    }
}

const loginUserController = async (req, res) =>{
    let {email, password} = req.body
    
    try{
        const user = await Users.find({email})

        console.log(user)
        
        if(!user){
            return res.status(400).send('User not found')
        }

        const stored_password = user[0].password
        bcrypt.compare(password, stored_password, (err)=>{
            if(err){
                res.status(400).send("User can not be authenticated")
                return;
            }

            const payload = {
                email,
                password
            }

            const token = jwt.sign(payload, SECRET_KEY ,{
                expiresIn : 60 * 1
                })

            res.send({
                message: 'token created',
                token
            })
        })
    }
    catch(e){
        res.status(500).send("Server Error")
      }
}

const logoutUserController = async (req, res) =>{
    const bearerHeader =  req.headers['authorization'];
    const token = bearerHeader.split(" ")[1]

    expired_tokens.push(token)
    res.send('User logged out')
}



const editUserController = async (req, res) => {
    const { id, first_name, last_name, email} = req.body
    if (!validator.isMongoId(id) || !validator.isAlpha(first_name,'en-US', {ignore: ' -'}) || !validator.isAlpha(last_name,'en-US', {ignore: ' -'}) || !validator.isEmail(email)) {
        res.status(400).send("Invalid parameters")
        return
    }
    try {
        const usero = await Users.findById(id)
        await usero.update({ $set: { first_name, last_name, email } })
        res.send("User updated!")
    } catch (e) {
        res.status(500).send("There was a problem with the request")
    }
}

const deleteUserController = async (req, res) => {
    const { id } = req.body
    if (!validator.isMongoId(id)) {
        res.status(400).send("Parametros invalidos")
        return
    }

    try {
        const userToDelete = await Users.findByIdAndDelete(id)
        if (userToDelete) {
            res.send("User deleted")
        } else {
            res.status(404).send("User not found")
        }
    } catch (e) {
        res.status(500).send("Server error")
    }
}

module.exports = {
    getUsersController,
    signUpUserController,
    loginUserController,
    logoutUserController,
    editUserController,
    deleteUserController,
    expired_tokens
}