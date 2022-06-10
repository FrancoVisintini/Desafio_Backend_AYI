const Users = require('../models/UserModel');
const Products = require('../models/ProductModel');
const product_data = require('../data/products.json')
const user_data = require('../data/users.json')
const bcrypt = require('bcrypt')


const chargeDataController = async (req,res)=>{
    try {
        user_data.map(user => {
            const rounds = 10
            bcrypt.hash(user.password,rounds, (err,hash)=>{
                password_hashed = hash
                const new_user = new Users({first_name: user.first_name, last_name: user.last_name, email: user.email, password: password_hashed})
                new_user.save()
            })
        })
        product_data.map(prod => {
            const new_product = new Products(prod)
            new_product.save()
        })

        res.send('database is ok')
        
    } catch (error) {
        res.status(500).send('database could not be charged')
    } 
}




module.exports = chargeDataController;