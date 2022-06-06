const { Router } = require('express');
const { getAllProductsController , createProductController , editProductController , deleteProductController } = require('../controllers/ProductController');

const router = Router();


router.get("/",getAllProductsController)

router.post("/",createProductController)

router.put("/",editProductController)

router.delete("/",deleteProductController)


module.exports = router;