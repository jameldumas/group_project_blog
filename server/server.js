require("dotenv").config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.MY_PORT;
const cors = require('cors');
const socketio = require('socket.io');
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
 
require('./config/mongoose.config');
 
require('./routes/user.routes')(app);

const server = app.listen(port, () => console.log("Your server is running for blog data!"));
 
const io = socketio(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: [ 'GET', 'POST' ],
        allowedHeaders: [ '*' ],
    }
});

