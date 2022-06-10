const { Router } = require('express');
const { getUsersController , signUpUserController ,loginUserController, logoutUserController, editUserController , deleteUserController } = require('../controllers/UserController');
const verifyToken = require('../middlewares/authentication')


const router = Router();


router.get("/",getUsersController)

router.post("/signup",signUpUserController)

router.post("/login", loginUserController)

router.put("/",editUserController)

router.delete("/",deleteUserController)

router.get('/privado', verifyToken, (req,res) =>{
    res.send('VERIFICO')
} )

router.get('/logout', verifyToken, logoutUserController)

module.exports = router;