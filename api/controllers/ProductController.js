const Products = require('../models/ProductModel');
const validator = require('validator');

const getProductsController = async (req, res) => {
    
    try {
        let {id} = req.params
        let products;
        if(id){
            products = await Products.findById(id)
        }
        else {
            products = await Products.find()
        }
        products !== null ?
        res.send(products)
        : res.status(404).send('Product not found')
    } catch (e) {
        res.status(500).send("There was a problem with the request")
    }
}

const createProductController = async (req, res) => {
    let { name, price } = req.body
    if (!validator.isAlpha(name,'en-US', {ignore: ' -'}) || typeof price !== 'number') {
        res.status(400).send("Invalid parameters")
        return
    }
    try {
        const new_product = new Products(req.body)
        await new_product.save()
        res.send("Product created")
    } catch (e) {
        res.status(500).send("Server error")
    }
}

const editProductController = async (req, res) => {
    const { id, name, price } = req.body
    if (!validator.isMongoId(id) || !validator.isAlpha(name,'en-US', {ignore: ' -'}) || typeof price !== 'number') {
        res.status(400).send("Invalid parameters")
        return
    }
    try {
        const producto = await Products.findById(id)
        await producto.update({ $set: { name, price } })
        res.send("Product updated!")
    } catch (e) {
        res.status(500).send("There was a problem with the request")
    }
}

const deleteProductController = async (req, res) => {
    const { id } = req.body
    if (!validator.isMongoId(id)) {
        res.status(400).send("Parametros invalidos")
        return
    }

    try {
        const productToDelete = await Products.findByIdAndDelete(id)
        if (productToDelete) {
            res.send("Product deleted")
        } else {
            res.status(404).send("Product not found")
        }
    } catch (e) {
        res.status(500).send("Server error")
    }
}

module.exports = {
    getProductsController,
    createProductController,
    editProductController,
    deleteProductController
}