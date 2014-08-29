/**
 * Main entry
 */

"use strict";

var log = require('debug')('flightyogurt:main');
var express = require('express');



// Express 3.x --> Express 4.x 



var app = express();

// set base root
app.set('root', __dirname);

// Configuration

// 
require('./config')(app);


// Routes
require('./routes')(app);


