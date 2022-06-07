const Users = require('../models/UserModel');
const Products = require('../models/ProductModel');
const product_data = require('../data/products.json')
const user_data = require('../data/users.json')


const getDataController = async (req,res)=>{
    try {
        user_data.map(user => {
            const new_user = new Users(user)
            new_user.save()
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




module.exports = getDataController;