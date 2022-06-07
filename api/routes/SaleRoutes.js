const { Router } = require('express');
const { getSalesController , createSaleController , editSaleController , deleteSaleController } = require('../controllers/SaleController');

const router = Router();


router.get("/:id",getSalesController)

router.post("/",createSaleController)

router.put("/",editSaleController)

router.delete("/",deleteSaleController)


module.exports = router;