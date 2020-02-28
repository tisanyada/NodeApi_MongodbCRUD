const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const path = require('path');


// dot env
require('dotenv').config();

// static files
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');
// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// using routes
app.use('/', indexRouter);
app.use((req, res) => {
    res.status(400).send('page/route not found');
});

// the server
const PORT = process.env.PORT || '3000';
mongoose.connect('mongodb://localhost:27017/CRUD',
    {
        useUnifiedTopology: true,
        useFindAndModify: true
    }
)
    .then(success => {
        app.listen(PORT, () => {
            console.log(`\n\nserver is running on port `, PORT);
            console.log('connected to db');
        });
    })
    .catch(err => console.log(err));


