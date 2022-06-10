const Sales = require('../models/SaleModel');
const Users = require('../models/UserModel');
const Products = require('../models/ProductModel');

const validator = require('validator');

const getSalesController = async (req, res) => {
    
    try {
        let {id, user, product} = req.query
        let sales;
        if(id){
            sales = await Sales.findById(id)
        }
        else {
            if(user && product) sales = await Sales.find({id_user:user, id_product:product })
            if(user && !product) sales = await Sales.find({id_user:user})
            if(!user && product) sales = await Sales.find({id_product:product})
            if(!user && !product) sales = await Sales.find()
        }
        sales === null || sales.length === 0  ? res.status(404).send('Sale not found')
        : 
        res.send(sales)
    } catch (e) {
        res.status(500).send("There was a problem with the request")
    }
}

const createSaleController = async (req, res) => {
    let { id_user, id_product, quant} = req.body
    if (!validator.isMongoId(id_user) || !validator.isMongoId(id_product) || typeof quant !== 'number') {
        res.status(400).send("Invalid parameters")
        return
    }
    let user = await Users.findById(id_user);
    let product = await Products.findById(id_product)
    
    if(user && product){

        try {
            let unit_price = product.price
            let total_price = quant * unit_price
            const new_sale = new Sales({ id_user, id_product, quant, unit_price, total_price})
            await new_sale.save()
            res.send("Sale created")
        } catch (e) {
            res.status(500).send("Server error")
        }
    }
    else{
        res.status(400).send('Bad request')
    }
}

const editSaleController = async (req, res) => {
    const { id, id_user, id_product, quant} = req.body
    if (!validator.isMongoId(id_user) || !validator.isMongoId(id_product) || typeof quant !== 'number') {
        res.status(400).send("Invalid parameters")
        return
    }
    try {
        const sale = await Sales.findById(id)
        await sale.update({ $set: { id_user, id_product, quant } })
        res.send("Sale updated!")
    } catch (e) {
        res.status(500).send("There was a problem with the request")
    }
}

const deleteSaleController = async (req, res) => {
    const { id } = req.body
    if (!validator.isMongoId(id)) {
        res.status(400).send("Parametros invalidos")
        return
    }

    try {
        const saleToDelete = await Sales.findByIdAndDelete(id)
        if (saleToDelete) {
            res.send("Sale deleted")
        } else {
            res.status(404).send("Sale not found")
        }
    } catch (e) {
        res.status(500).send("Server error")
    }
}

module.exports = {
    getSalesController,
    createSaleController,
    editSaleController,
    deleteSaleController
}