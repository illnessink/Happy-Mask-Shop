const express = require('express');
const mongoose = require('mongoose');
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
const data = require('./data');
app.get('/masks/seed', (req, res) => {
    Mask.deleteMany({}, (error, results) => {
        Mask.create(data, (error, products) => {
            res.redirect('/masks');
        });
    });
});

// Index - GET - /masks
app.get('/masks', (req, res) => {
    Mask.find({}, (error, allMasks) => {
        res.render('index.ejs', {
            masks: allMasks,
        });
    });
});

// New - GET - /masks/new
app.get('/masks/new', (req, res) => {
    res.render('new.ejs');
});

// Delete - DELETE - /masks/:id
app.delete('/masks/:id', (req, res) => {
    Mask.findByIdAndDelete(req.params.id, (error, data) => {
        res.redirect('/masks');
    });
});
// Update - PUT - /masks/:id
// Create - POST - /masks
app.post('/masks', (req, res) => {
    req.body.owned = !!req.body.owned;
    Mask.create(req.body, (error, createdMask) => {
        res.redirect('/masks');
    });
});

// Edit - GET - /masks/:id/edit
app.get('/masks/:id/edit', (req, res) => {
    Mask.findById(req.params.id, (error, foundMask) => {
        res.render('edit.ejs', {
            mask: foundMask,
        });
    });
});

// Show - GET - /masks/:id
app.get('/masks/:id', (req, res) => {
    Mask.findById(req.params.id, (error, foundMask) => {
        res.render('show.ejs', {
            mask: foundMask,
        });
    });
});


app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
});