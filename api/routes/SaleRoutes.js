const { Router } = require('express');
const { getSalesController , createSaleController , editSaleController , deleteSaleController } = require('../controllers/SaleController');
const verifyToken = require('../middlewares/authentication')

const router = Router();


router.get("/", verifyToken, getSalesController)

router.post("/", verifyToken, createSaleController)

router.put("/", verifyToken, editSaleController)

router.delete("/", verifyToken, deleteSaleController)


module.exports = router;