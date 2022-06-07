const { Router } = require('express');
const { getProductsController , createProductController , editProductController , deleteProductController } = require('../controllers/ProductController');

const router = Router();


router.get("/:id",getProductsController)

router.post("/",createProductController)

router.put("/",editProductController)

router.delete("/",deleteProductController)


module.exports = router;