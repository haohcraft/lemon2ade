/**
 * @jsx React.DOM
 */
var Header = require("./Header.jsx")
var ReactTransitionGroup = React.addons.TransitionGroup
var Lemonade = React.createClass({

  render: function() {
    return (
      <div className="Lemonade">
        <Header title="Lemon2ade" />
      </div>
    );
  }

});

module.exports = Lemonade;