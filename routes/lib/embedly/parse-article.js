/**
 * To parse the returned data from Embedly
 * 1. title
 * 2. author
 * 3. devide the paragraphs into pieces in order
 * 4. store the parsed data into the database
 * @type {[type]}
 */
'use strict';

var log = require('debug')('lemonade:routes:lib:embedly:parse-article');
var cheerio = require("cheerio");
var Md5 = require('bower/lib/util/md5.js');

/**
 * To parse the article
 * Reference about this data structure: http://embed.ly/docs/explore/extract?url=https%3A%2F%2Fmedium.com%2Fthe-year-of-the-looking-glass%2Fmanaging-with-martians-85aa70a0b87d
 * The content we care:
 * 1. data.content
 * 2. data.original_url
 * @param {[type]} data [description]
 */
function ParseArticle (data) {

	var parsedData = data;
	log("Parse Article ...");
	var parsedSections = [];
	var KEY_SECTIONS = "sections";

	var $ = cheerio.load(data.content);
	//A MD5 id for this specific article
	var articleMd5 = Md5(data.original_url);
	// Extract the paragraphs
	var paragraphs = $('p');
	//TODO: extract images
	//
	
	var cnt = 0;
	var pSize = paragraphs.length;	

	// Feed the parsedArticles with our paragraphs
	for (cnt = 0; cnt < pSize; cnt++) {
		var parsedSection = {};
		var sectionId = articleMd5 + "_" + cnt;

		parsedSection.id = sectionId;
		parsedSection.content= $(paragraphs[cnt]).text();
		parsedSections.push(parsedSection);
	}

	parsedData.parsedSections = parsedSections;

	return parsedData;

}

module.exports = ParseArticle;
