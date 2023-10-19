const router = require("express").Router()
const validateSessions = require('../middleware/validatesession')

function errorResponse(res, err) {
    res.status(500).json({
      ERROR: err.message,
    });
  };
  

//TODO  Create a Room (POST)
const Room = require("../models/messageRooms.model");

router.post("/chatRoom", validateSessions, async (req, res) => {

    try {
        const chatRoom = {
            title: req.body.title,
            description: req.body.description,
            messages: req.body.messages,
            owner: req.user._id
            
        }

        const room = new Room(chatRoom);

        const newRoom = await room.save();

        res.status(200).json({
            message: "New Room Created!",
            room: newRoom
        });
    } catch (err) {
        errorResponse(res, err);
    } 
});


//TODO  Get all Rooms (GET)
router.get("/list", async (req, res) => {
    try {
        //console.log('user:', req.user.id);
        const getAllRooms = await Room.find();
        // res.status(200).json({ getAllRooms, message: "Success!" })
        getAllRooms.length > 0 ?
            res.status(200).json({getAllRooms})
            :
            res.status(404).json({ message: "No Rooms Found"});    
        } catch (err) {
            errorResponse(res, err)
        }
});

//TODO  Get one room (GET)

router.get('/:id',validateSessions, async (req, res) => {
//room: req.params.room_id (mongo) id
    try {
        const singleRoom = await Room.findOne({_id: req.params.id }); 
        const room = await Room.findById(singleRoom.owner);
        res.status(200).json({ found: singleRoom, owner: room});
    }   catch (err) {
        errorResponse(res, err);
    }
}); 




//TODO  Update a Room (PATCH)
router.patch('/:id', validateSessions, async (req, res)=>{
    try {
       let _id = req.params.id;
        console.log(_id);
        let updatedInfo = req.body;
        const updated = await Room.findOneAndUpdate({ _id, owner: req.user._id  } ,

            updatedInfo, { new: true });
            if (!updated)
                throw new Error("Invalid Room/User Combination");

            res.status(200).json({
                message: `${updated._id} Updated!`, updated
            });
    } catch (err) {
        errorResponse(res, err);
    }
})


//TODO  Delete a Room (DELETE)
router.delete('/:id', async function(req, res){
    try {
        let {id} = req.params;
        const deleteRoom = await Room.deleteOne({ _id: id})
        res.status(200).json ({
            message: 'Room Deleted!',
            deleteRoom
        });
    } catch(err){
        errorResponse(res, err);
    }
})


module.exports = router;