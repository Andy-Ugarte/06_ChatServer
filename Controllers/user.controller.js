const router = require('express').Router();

const User = require('../models/users.model');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const encryptPassword = (password) => {
    const encrypt = bcrypt.hashSync(password, 10);
    console.log('ENCRYPT:', encrypt);
  }

  //! User Signup - Register a new account with credentials 
  router.post('/signup', async(req, res) => {

  
  try {
    const user = new User ({
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 13)
    });

    const newUser = await user.save();

    const token = jwt.sign({ id: newUser ['_id']} ,process.env.JWT, {
        expiresIn: "1 day"});

    res.status(200).json ({
        user: newUser,
        message: 'Success! User Created',
        token
    })
    } catch (err) {
        res.status(500).json({
            ERROR: err.message
        });
    }
  });
// any comment on a new line
router.post('/login', async function (req, res){
    try {
        const user = await User.findOne ({ email: email});
    if (!user) throw new Error('Email or password does not match');

    const token = jwt.sign({ id: user._id}, process.env.JWT,{ expiresIn: '1 day'});

    const passwordMatch = await bcrypt.compare(password, user.passwords);

    if (!passwordMatch) throw new Error('Email or Password does not match');

    res.status(200).json({
        user, 
        message: 'Successful Login',
        token
    });
    } catch (err) {
        res.status(500).json ({
            ERROR: err.message
        })
    }
})

module.exports = router;