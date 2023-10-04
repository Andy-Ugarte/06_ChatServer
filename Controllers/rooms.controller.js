// create room - post - client/user creating
// get one room - get - find info that soeone else creates
// get all rooms - get - 
// update - patch - change status 
// delete - delete 

const router = require("express").Router();
const room = require("../models/messageRooms.model");

router.post("/chatRoom", async (req, res) => {
    try {
        const chatRoom = {
            room: req.body.room
        }
//const 

    }catch(err){
        
    } 
})