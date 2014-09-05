/**
 * @jsx React.DOM
 */

/**
 * TODO:
 * To adjust the size of the area
 */
'use strict';

var emptyFunction = require('react/lib/emptyFunction');
var React = require('react/addons');

var Adjustable = React.createClass({

	propTypes: {

		/**
		 * `start` specifies the width|height of the div
		 */
		start: React.PropTypes.object,
	},

	componentWillUnmount: function() {
		//Remove any leftover event handlers
	},

	getDefaultProps: function() {
		return {
			start: {
				width: 0,
				height: 0
			}	
		};
	},

	getInitialState: function() {
		return {
			// Start width/height of this.getDOMNode()
			startWidth: 0, startHeight: 0,
			
			// Current width/height of this.getDOMNode()
			currentW: this.props.start.width, currentH: this.props.start.height
		};
	},

	render: function() {

		var style = {

			width: this.state.currentW,
			height: this.state.currentH

		};

		// Reuse the child provided
		// This makes it flexible to use whatever element is wanted (div, ul, etc)
		return React.addons.cloneWithProps(React.Children.only(this.props.children), {

			style: style,
			className: 'react-adjustable',
			onMouseUp: this.handleMouseUp,
			onMouseDown: this.handleMouseDown
		});
	}

});

module.exports = Adjustable;