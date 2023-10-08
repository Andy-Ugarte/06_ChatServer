
const jwt= require('jsonwebtoken')
const User = require('../models/users.model')

async function validateSession(req,res,next){
  try{
    // checks our headers for User
    const token = req.headers.authorization;
      // waiting to verify decoded token for user
    const decoded = await jwt.verify(token, process.env.JWT);
      // find the id within the database
    const user = await User.findById(decoded.id);

    if (!user) throw new Error('User Not Found');

    req.user = user;

    return next();
  }catch (err){
    res.status(403).json({message: err.message})
  }

}
module.exports= validateSession