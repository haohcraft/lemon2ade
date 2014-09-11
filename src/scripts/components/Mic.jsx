/**
 * @jsx React.DOM
 */

require('styles/mic.less');
var Mic = React.createClass({

	onClick: function (e) {
		e.preventDefault();
		console.log("Mic button clicked ...", e);
	},

	render: function() {
		return (
			<div className="Mic" onClick={this.onClick}>
				<span className="control fui-mic"></span>
			</div>
		);
	}

});

module.exports = Mic;