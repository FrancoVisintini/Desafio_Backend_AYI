const { Router } = require('express');
const { getProductsController , createProductController , editProductController , deleteProductController } = require('../controllers/ProductController');
const verifyToken = require('../middlewares/authentication')

const router = Router();

router.get("/", verifyToken, getProductsController)

router.post("/", verifyToken, createProductController)

router.put("/", verifyToken, editProductController)

router.delete("/", verifyToken, deleteProductController)


module.exports = router;