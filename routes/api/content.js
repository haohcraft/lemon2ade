/**
 * Content API
 */

'use strict';

var log = require('debug')('lemonade:routes:api:contentApi');
var EmbedlyApi = require('../lib/embedly/embedly-wrapper.js');
var ContentApi = function () {};

ContentApi.prototype.createNew = function (req, res, next) {

	// if (req.body.url) {
		log("ContentApi.createNew with url ...", req.body.url);
		// var candidateUrl = req.body.url;
		var candidateUrl = "http://www.nytimes.com/2014/08/28/world/europe/ukraine-russia-novoazovsk-crimea.html?ref=todayspaper";
		if (_isURL(candidateUrl)) {
			
			EmbedlyApi.extract(candidateUrl, function (data) {
				log("Result from Embedly: ", data);
				res.status(200).send(data);
			}); 
		}

	// }
}

/**
 * Helpers
 */

/**
 * Check whether the {link} is valid
 * @param  {[type]}  link [description]
 * @return {Boolean}      [description]
 */
function _isURL (link) {

	var urlRegEx = /(http|https|ftp):\/\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?$&\/\/=]*)?/gi;
	 
	return urlRegEx.test(link); 
}

module.exports = ContentApi;