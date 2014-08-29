
/**
 * @jsx React.DOM
 */

// Bring in jQuery and React as a Bower component in the global namespace
require('script!react/react-with-addons.js');
require('script!jquery/jquery.js');

var StarterApp = require('./components/StarterApp.jsx');

React.renderComponent(
	<StarterApp />, 
	document.getElementById('app')
);

