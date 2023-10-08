// create room - post - client/user creating
// get one room - get - find info that soeone else creates
// get all rooms - get - 
// update - patch - change status 
// delete - delete 

const router = require("express").Router();


//TODO  Create a Room (POST)
const Room = require("../models/messageRooms.model");

router.post("/chatRoom", validatesession async (req, res) => {
    try {
        const chatRoom = {
            title: req.body.title,
            description: req.body.description,
            messages: req.body.messages,
            owner: req.user._id
            
        }
    } catch (err) {
        errorResponse(res, err);
    } 
});

//TODO  Get one room (GET)

router.get('/room/:id', async (req, res) => {
//room: req.params.room_id (mongo) id
    try {
        const singleRoom = await Room.findOne({_id: req.params.id }); 
        const room = await Room.findById(singleRoom.owner);
        res.status(200).json({ found: singleRoom, owner: user});
    }   catch (err) {
        errorResponse(res, err);
    }
}); 

//TODO  Get all Rooms (GET)
router.get("/list", async (req, res) => {
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


//TODO  Delete a Room (DELETE)