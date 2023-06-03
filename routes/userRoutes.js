const {register , login , setavatar , getAllusers} = require('../controllers/userController')
const router = require('express').Router();

router.get('/',(req,res)=>{
    res.send("Hello this is Home Page")
})

router.get('/user',(req,res)=>{
    res.send("THis is user Abhishek")
})
router.post("/register",register)
router.post("/login",login)
router.post("/setavatar/:id",setavatar)
router.get("/allusers/:id",getAllusers)

module.exports = router;