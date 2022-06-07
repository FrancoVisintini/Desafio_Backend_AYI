const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    id_user: mongoose.ObjectId,
    id_product: mongoose.ObjectId,
    quant: Number,
    unit_price: Number,
    total_price: Number
},{
    timestamps: true
})

const SaleModel = mongoose.model('Sales', SaleSchema)

module.exports = SaleModel