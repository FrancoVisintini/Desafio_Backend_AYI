const { Router } = require('express');

const { getUsersController , signUpUserController ,loginUserController, logoutUserController, editUserController , deleteUserController } = require('../controllers/UserController');
const verifyToken = require('../middlewares/authentication')


const router = Router();

router.post("/signup",signUpUserController)

router.post("/login", loginUserController)

router.post('/logout', verifyToken, logoutUserController)

router.put("/", verifyToken, editUserController)

router.delete("/", verifyToken, deleteUserController)

router.get("/", verifyToken, getUsersController)

router.get('/privado', verifyToken, (req,res)=>{
    res.send('VERIFICADO')
})


module.exports = router;