/**
 * Main entry
 */

"use strict";

var log = require('debug')('flightyogurt:main');
var express = require('express');
var app = module.exports.app = exports.app = express();
app.use(require('connect-livereload')());

// set base root
app.set('root', __dirname);

// Configuration

// 
require('./config')(app);


// Routes
require('./routes')(app);


