/**
 * A validation mixin
 * Credit from https://stackoverflow.com/questions/21854938/using-mixins-vs-components-for-code-reuse-in-facebook-react/21857309#21857309
 */


define(function () {

  'use strict';

  var _ = require('underscore');

  var ValidationMixin = {
    getInitialState: function () {
      return {
        errors: []
      };
    },

    componentWillMount: function () {
      this.assertValidatorsDefined();
    },

    assertValidatorsDefined: function () {
      if (!this.validators) {
        throw new Error('ValidatorMixin requires this.validators to be defined on the component.');
      }

      _.each(_.keys(this.validators), function (key) {
        var validator = this.validators[key];

        if (!_.has(this.state, key)) {
          throw new Error('Key "' + key + '" is defined in this.validators but not present in initial state.');
        }

        if (!_.isFunction(validator)) {
          throw new Error('Validator for key "' + key + '" is not a function.');
        }
      }, this);
    },

    hasError: function (key) {
      return _.contains(this.state.errors, key);
    },

    resetError: function (key) {
      this.setState({
        'errors': _.without(this.state.errors, key)
      });
    },

    validate: function () {
      var errors = _.filter(_.keys(this.validators), function (key) {
        var validator = this.validators[key],
            value = this.state[key];

        return !validator(value);
      }, this);

      this.setState({
        'errors': errors
      });

      return _.isEmpty(errors);
    }
  };

  return ValidationMixin;

});