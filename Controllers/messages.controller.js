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

