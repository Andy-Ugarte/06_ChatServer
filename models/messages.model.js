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
  owner:String,
  room:String
});

module.exports=mongoose.model('messages',messagesSchema);