const { Router } = require('express');
const { chargeDataController  } = require('../controllers/DataController');

const router = Router();


router.post("/",chargeDataController)

module.exports = router;