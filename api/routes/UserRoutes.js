const { Router } = require('express');
const { getUsersController , createUserController , editUserController , deleteUserController } = require('../controllers/UserController');

const router = Router();


router.get("/:id",getUsersController)

router.post("/",createUserController)

router.put("/",editUserController)

router.delete("/",deleteUserController)


module.exports = router;