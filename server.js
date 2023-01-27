const express = require('express');
const { default: mongoose } = require('mongoose');
const methodOverride = require('method-override');
const Mask = require('./models/mask');


const app = express();


require('dotenv').config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.set('strictQuery', false);
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on('error', (error) => {
    console.log('MongoDB Error:' + error.message);
});
db.on('connected', () => {
    console.log('MongoDB is connected');
});

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

// Mount Route - INDUCES

// Seed Route 

// Index - GET - /masks
app.get('/masks', (req, res) => {
    res.send('Index Page')
});

// New - GET - /masks/new
// Delete - DELETE - /masks/:id
// Update - PUT - /masks/:id
// Create - POST - /masks
// Edit - GET - /masks/:id/edit
// Show - GET - /masks/:id
























app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
});