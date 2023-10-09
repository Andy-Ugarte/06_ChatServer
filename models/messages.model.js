const mongoose = require('mongoose')

const messagesSchema= new mongoose.Schema({
  date:{
    type: String,
    required: true
  },
  text:{
    type: String,
    required: true
  },
  //owner:_id,
  //room:_id
});

module.exports=mongoose.model('messages',messagesSchema);