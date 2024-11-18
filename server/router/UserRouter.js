const express = require("express")
const {registeUser,checkEmail,checkPassword, userDetails, logout} = require("../controller/UserController")


const router = express.Router()

router.post("/register",registeUser)
router.post("/email",checkEmail)
router.post('/checkPassword',checkPassword)
router.get('/user-details',userDetails)
router.get("/logout",logout)


module.exports = router