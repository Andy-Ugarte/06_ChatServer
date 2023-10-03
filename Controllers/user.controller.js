const router = require('express').Router();

const User = require('../models/users.model');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

const encryptPassword = (password)=>{
  const encrypt = bcrypt.hashSync(password,10);
  console.log('ENCRYPT:',encrypt)
};

//! User Signup - register account
router.post('/signup',async (req,res)=>{

  try{

    const user= new User({
      firstName: req.body.name,
      email: req.body.mail,
      password: bcrypt.hashSync(req.body.pass,10)
    });
      
    const newUser= await user.save();

    const token = jwt.sign({id: newUser['_id']},process.env.JWT, {expiresIn: '1 day'});
    
    res.status(200).json({
      user: newUser,
      message: 'Success! User Created',
      token
    });
  }catch(err){
    res.status(500).json({
      ERROR: err.message
    });
  }
});

router.post('/login', async(req,res)=>{
  try{
    const {email,password} = req.body

    const user= await User.findOne({email:email})

    if(!user) throw new Error('Email or password does not match');

    const token = jwt.sign({id:user._id},process.env.JWT,{expiresIN:'1 day'});

    const passwordMatch= await bcrypt.compare(password,user.password);

    if(!passwordMatch) throw new Error("Email or password does not match")

    res.status(200).json({
      user,
      message:'successful Login!',
      token
    })
  }catch(err){
    res.status(500).json({
      ERROR: err.message
    });
  }
});

module.exports=router