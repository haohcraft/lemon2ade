/**
 * @jsx React.DOM
 */

require('styles/mic.less');
var Mic = React.createClass({

	render: function() {
		return (
			<div className="Mic">
				<span key={_id} className="control fui-mic"></span>
			</div>
		);
	}

});

module.exports = Mic;