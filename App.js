// Import Modules
const express = require('express');
const session = require('express-session');

//Import http module
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
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: store
}));

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


