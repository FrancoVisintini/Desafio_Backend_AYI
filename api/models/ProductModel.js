const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number
},{
    timestamps: true
})

const ProductModel = mongoose.model('Products', ProductSchema)

module.exports = ProductModel