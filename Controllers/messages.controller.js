const router = require('express').Router();
const Messages = require('../models/messages.model');
const User = require('../models/users.model');
const validateSession=require('../middleware/validatesession');


function errorResponse(res,err){
  res.status(500).json({
    ERROR: err.message
  });
}

//! These endpoints are based off of Room Controller
//?  req.user._id
//?  ROOM = req.params.id? (_id?)


// TODO - post for creating message

router.post("/create/:room_id",validateSession, async(req,res)=>{
  try{
    const messagePost= {
      date: new Date().getFullYear(),
      text: req.body.text,
      owner: req.user,
      room: req.params.room_id
    }
    
    const message = new Messages(messagePost)

    const newMessage = await message.save()
   
    res.status(200).json({
      message:"new message created",
      newMessage
    })
  }catch (err){
    errorResponse(res,err)
  }
})


//TODO - get ALL messages

router.get("/:room_id",validateSession,async(req,res)=>{
  try{
    
    const allMessages= await Messages.find({room:req.params.room_id});
    console.log(allMessages)
    allMessages.length > 0 ?
    res.status(200).json({ allMessages })
    :
    res.status(404).json({ message: "No Messages Found" });
  }catch(error){
    res.json({message: error.message})
  }
})
//TODO - patch for updating message (validate session)

router.patch('/:room_id',validateSession, async(req,res)=>{
  try{
    let _id= req.params.id
    let owner= req.user.id
    let upadtedInfo= req.body

    const updated = await User.findOneAndUpdate({_id,owner},upadtedInfo,{new: true})
    if(!updated) throw new Error("invalid room/User combination")
    res.status(200).json({
      message:`${updated._id} Updated!`,
      updated
   });
  }catch (err){
    errorResponse(res,err);
  }
});

//TODO - delete for delete message (validate session)

router.delete('/:room_id',validateSession, async(req,res)=>{
try{
  let {id} = req.params
  let owner = req.user.id

  const deleteMessage = await Messages.deleteOne({_id:id,owner})
  if(!deleteMessage.deletedCount){
    throw new Error('could not find message')
  }
    res.status(200).json({
      message: 'Message Deleted',
      deleteMessage
    })
}catch (err){
  errorResponse(res,err);
}
})

module.exports=router