const { Router } = require('express');
const { getDataController  } = require('../controllers/DataController');

const router = Router();


router.get("/",getDataController)

module.exports = router;