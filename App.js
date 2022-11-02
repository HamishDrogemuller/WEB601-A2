// Import Modules
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const http = require("http");

// Import Routes
const order = require('./routes/order');
const product = require('./routes/product');
const user = require('./routes/user');
const type = require('./routes/type');

// Create Express App  
const store = new session.MemoryStore(); 
const app = express();

// Configure Express App
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: store
}));

// Token generation
app.post('/token', (req, res) => {
    const {value} = req.body;

    switch(value) {
        case 1:
            const user = jwt.sign({value: 1}, 'secret', {expiresIn: '1h'});
        case 2:
            const admin = jwt.sign({value: 2}, 'secret', {expiresIn: '3h'});
        default:
            res.status(500).send({message: 'Error generating Token'});
    }
});

const user = {
    username: 'user',
    password: 'user'
};

const admin = {
    username: 'admin',
    password: 'admin'
};

const secret = 'secret';

jwt.sign(user, secret, (err,token) => {
    res.json({token: token})
});



//Home

app.get("/", (req, res) => {
    //res.send("Welcome to the Store");
    res.sendFile(__dirname + "/src/index.html");
})

// Configure Routes
app.use('/order', order);
app.use('/product', product);
app.use('/user', user);
app.use('/type', type);



// Start Server
app.listen(3000, () => {
    console.log('Server Started');
});


