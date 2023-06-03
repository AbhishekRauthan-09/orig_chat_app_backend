const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res) => {
    try {
        const {from , to ,msg} = req.body;
        const data = await messageModel.create({
            message:{text:msg},
            users:[from,to],
            sender:from,
        })
        if(data){
            return res.json({msg:"Message Added Successfully"})
        }else{
            return res.json({msg:"Message not sent"})
        }
    } catch (error) {
        console.log(error);
    }
};


module.exports.getAllMessage = async (req, res) => {
    try {
        const {from,to} = req.body;
        const messages = await messageModel.find({
            users:{
                $all:[from,to],
            }
        }).sort({updatedAt:1})
        const projectedMessages = messages.map((msg)=>{
            return {
                fromSelf:msg.sender.toString() === from,
                message:msg.message.text,
            }
        })
        res.json(projectedMessages)

    } catch (error) {
        console.log(error)
    }
};
