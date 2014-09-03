/**
 * @jsx React.DOM
 */


require('styles/footer.less');

var Footer = React.createClass({

	render: function() {
		return (
			<div className="Footer">
				<div className="container">
					@ 2014 by <a target="_blank" href="https://twitter.com/haohmobile" className="author">Hao Huang</a>
				</div>
			</div>
		);
	}

});

module.exports = Footer;