const Users = require('../models/UserModel');
const validator = require('validator');
const bcrypt = require('bcrypt')

const getUsersController = async (req, res) => {
    
    try {
        let {id} = req.params
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

const createUserController = async (req, res) => {
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
    createUserController,
    editUserController,
    deleteUserController
}