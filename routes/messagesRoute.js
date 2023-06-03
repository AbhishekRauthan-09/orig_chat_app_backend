const {addMessage , getAllMessage} = require('../controllers/messagesController')
const router = require('express').Router();

router.post("/addmessage",addMessage)
router.post("/getmessage",getAllMessage)

module.exports = router;