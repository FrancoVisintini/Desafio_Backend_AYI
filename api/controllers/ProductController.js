// const Productos = require('../models/ProductosModel');
// const validator = require('validator');

const getAllProductsController = async (req, res) => {
    try {
        // const productos = await Productos.find()
        // res.send(productos)
        res.send('entré al controller')
    } catch (e) {
        res.status(500).send("Hubo un error en la consulta")
    }
}

const createProductController = async (req, res) => {
    const { nombre } = req.body
    if (!validator.isAlpha(nombre)) {
        res.status(400).send("Parametros invalidos")
        return
    }
    try {
        const nuevo_producto = new Productos(req.body)
        await nuevo_producto.save()
        res.send("Producto creado")
    } catch (e) {
        res.status(500).send("Hubo un error en la consulta")
    }
}

const editProductController = async (req, res) => {
    const { id, nombre } = req.body
    if (!validator.isMongoId(id)) {
        res.status(400).send("Parametros invalidos")
        return
    }
    if (!validator.isAlpha(nombre)) {
        res.status(400).send("Parametros invalidos")
        return
    }
    try {
        const producto = await Productos.findById(id)
        await producto.update({ $set: { nombre } })
        res.send("Se guardo la nueva informacion!")
    } catch (e) {
        res.status(500).send("Hubo un error en la consulta")
    }
}

const deleteProductController = async (req, res) => {
    const { id } = req.body
    if (!validator.isMongoId(id)) {
        res.status(400).send("Parametros invalidos")
        return
    }

    try {
        const encontrado = await Productos.findByIdAndDelete(id)
        if (encontrado) {
            res.send("Producto Borrado")
        } else {
            res.status(400).send("El producto no existe / No se puede borrar")
        }
    } catch (e) {
        res.status(500).send("Hubo un error en la consulta")
    }
}

module.exports = {
    getAllProductsController,
    createProductController,
    editProductController,
    deleteProductController
}