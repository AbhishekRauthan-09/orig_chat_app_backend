const mongoose  = require('mongoose');

const messageSchema = mongoose.Schema({
    message:{
        text:{
            type:'string',
            required: true,
        },
    },
        users:Array,
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
    },
        {

            timestamps:true,
        },
    
)

module.exports = mongoose.model('Messages',messageSchema)