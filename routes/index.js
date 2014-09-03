/**
 * Routes
 */

"use strict";

module.exports = Routes;

var ContentApi = require('./api/content.js');
function Routes (app) {
	
	app.get('/*', function(req, res, next) {
	    if (req.headers.host.match(/^www\./) != null) {
	      res.redirect("http://" + req.headers.host.slice(4) + req.url, 301);
	    } else {
	      next();
	    }
	});

	app.get('/', function(req, res, next) {
		res.render("pages/home");
	});

	app.post('/api/content/new', function(req, res, next) {

		var api = new ContentApi();
		api.createNew(req, res, next);
	});
}