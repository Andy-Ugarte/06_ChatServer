require('dotenv').config();

const express = require('express');
const app = express();

const mongoose= require('mongoose')

const{PORT,MONGO} = process.env;

mongoose.connect(`${process.env.MONGO}/ChatReact`)

const db = mongoose.connection;

db.once('open', ()=> console.log(`Connected to: ${MONGO}`));

app.use(express.json());

//! PLACE CONTROLLERS HERE

const users = require('./Controllers/user.controller');
const rooms = require('./Controllers/rooms.controller');



app.use('/user',users);
app.use('/room',rooms);

app.get('/test', (req, res) => {
    res.status(200).json({ message: "Server is accessible", port: process.env.PORT });
    //* process.env will access the ".env" file, and we can dot notation to get whatever specific value we want from that file
  });

app.listen(PORT, ()=> console.log(`App is listening on ${PORT}`))