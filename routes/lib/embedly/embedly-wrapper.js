/**
 * A wapper for the Embedly API
 * 1. EmbedlyExtract API
 * 2. EmbedlyEmbody API
 */


module.exports = Embedly;

var EMBEDLY_KEY = 'bea49c8ae437401a9286e2909508495a';
var parseArticle = require('./parse-article.js');
var embedly = require('embedly'),
  util = require('util');
  // parseArticle = require('../../util/parseArticle');

var apiEmbedly;

function Embedly () {}

Embedly.extract = function(url, callback) {

  console.log("Calling embedly extract api ...");

  new embedly({key: EMBEDLY_KEY}, function(err, api) {
    if (!!err) {
      console.error('Error creating Embedly api');
      console.error(err.stack, api);
      return;
    }

    // ONLY call single url
    api.extract({url: url}, function(err, objs) {
      if (!!err) {
        console.error('request #1 failed');
        console.error(err.stack, objs);
        return;
      }
      
      callback(parseArticle(objs[0]));
    });
  });


}

Embedly.embody = function() {} 






