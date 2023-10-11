const router = require("express").Router()
const validateSessions = require('../middleware/validatesession')


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
        const room = new Room(chatroom);

        const newRoom = await room.save();
            
        res.status(200).json({ 
            message: "new room"
            room: newRoom
        })
            


    } catch (err) {
        errorResponse(res, err);
    } 
});

//TODO  Get one room (GET)

router.get('/room/:id',validateSessions, async (req, res) => {
//room: req.params.room_id (mongo) id
    try {
        const singleRoom = await Room.findOne({_id: req.params.id }); 
        const room = await Room.findById(singleRoom.owner);
        res.status(200).json({ found: singleRoom, owner: room});
    }   catch (err) {
        errorResponse(res, err);
    }
}); 

//TODO  Get all Rooms (GET)
router.get("/list",validateSessions, async (req, res) => {
    try {
        console.log('user:', req.user.id);
        const getAllRooms = await Room.find();
        getAllRooms.length > 0 ?
            res.status(200).json({getAllRooms})
            :
            res.status(404).json({ messages: "No Rooms Found"});    
        } catch (err) {
            
        }
})


//TODO  Update a Room (PATCH)
router.patch('/:id', async (req, res)=>{
    try {
        let _id = params.id;
        let owner = req.user.id;

        console.log(_id);
        console.log(owner);

        let updatedInfo = req.body;
        const updated = await room.findOneAndUpdate({ _id },
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
            deletedRoom
        });
    } catch(err){
        errorResponse(res, err);
    }
})


module.exports = router;