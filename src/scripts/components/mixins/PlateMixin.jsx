/**
 * Mixin for the Plate
 */

'use strict';
var emptyFunction = require('react/lib/emptyFunction');
var PlateMixin = {

	propTypes: {
		/**
		 * The authors' names
		 */
		authors: React.PropTypes.arrayOf(React.PropTypes.string),
		/**
		 * The provider for the article
		 */
		provider: React.PropTypes.string,
		/**
		 * The tile of the article
		 */
		title: React.PropTypes.string,
		/**
		 * Where the article comes from
		 */
		origin: React.PropTypes.string,
		/**
		 * The articles
		 */
		articles: React.PropTypes.arrayOf(React.PropTypes.object),
		/**
		 * [onMouseEnterLemon description]
		 */
		onMouseEnterLemon: React.PropTypes.func,
		/**
		 * The ID of the selected paragraph
		 */
		selectedId:React.PropTypes.number,
	},

	getDefaultProps: function () {
		authors: null,
		provider: null,
		title: null,
		origin: null,
		articles: null,
		onMouseEnterLemon: emptyFunction,
		selectedId: -1;

	}
};

module.exports = PlateMixin;