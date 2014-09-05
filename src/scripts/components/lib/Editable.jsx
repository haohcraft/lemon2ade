/**
 * @jsx React.DOM
 */
'use strict';

require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/flat.css');
require('script!medium-editor/dist/js/medium-editor.js');
var emptyFunction = require('react/lib/emptyFunction');

var Editable = React.createClass({

	propTypes: {
		/**
		 * `options`, used to setup MediumEditor
		 * Examples:
		 * 
		 * ```jsx
		 * var App = React.creatClass({
		 * 	render: function () {
		 * 		return (
		 *   		<Editable 
		 *   		options={{
		 *   			targetBlank: true,
		 *   		 	 buttons: ['bold', 'italic', 'quote']
		 *   		}}> 
		 *   			<div>Title</div>
		 *   		</Editable>
		 * 		
		 * 		)
		 * 	}
		 * });
		 *
		 * ```
		 * @type {[type]}
		 */
		options: React.PropTypes.object
	},

	handleMouseDown: function (e) {

		var node = this.getDOMNode();
		console.log("Editable handleMouseDown ...",this.props.options);
		var edit = new MediumEditor(node, this.props.options);


	},

	getDefaultProps: function() {
		return {
			options: {}
		};
	},

	render: function() {

		// Reuse the child provided
		// This makes it flexible to use whatever element is wanted (div, ul, etc)
		return React.addons.cloneWithProps(React.Children.only(this.props.children), {
			className: 'react-editable',
			onMouseDown: this.handleMouseDown
		});
	}

});

module.exports = Editable;