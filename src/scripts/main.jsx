
/**
 * @jsx React.DOM
 */

// Bring in jQuery and React as a Bower component in the global namespace
require('script!react/dist/react-with-addons.js');
require('script!jquery/jquery.js');
require('flat-ui/bootstrap/css/bootstrap.css');
require('flat-ui/less/flat-ui.less');
require('flat-ui/less/demo.less');
require('styles/main.less');

var Lemonade = require('./components/Lemonade.jsx');

React.renderComponent(
	<Lemonade />, 
	document.getElementById('app')
);

