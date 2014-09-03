/**
 * @jsx React.DOM
 */

var Header = require("./Header.jsx");
var Footer = require("./Footer.jsx");
var Candidate = require('./Candidate.jsx');
var Plate = require('./Plate.jsx');
var ReactTransitionGroup = React.addons.TransitionGroup

var Lemonade = React.createClass({

  onGetArticle: function (data) {
    this.setState({
      parsedArticle: data
    });
  },

  getInitialState: function() {
    return {
      parsedArticle: {}
    };
  },
  render: function() {
    return (
      <div className="Lemonade">
        <Header title="Lemon2ade" />
        <Candidate onGetArticle={this.onGetArticle}/>
        <Plate article={this.state.parsedArticle} />
        <Footer />
      </div>
    );
  }

});

module.exports = Lemonade;