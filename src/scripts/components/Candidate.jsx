/**
 * @jsx React.DOM
 */

var ValidationMixin = require('./mixins/ValidationMixin.jsx');
var _ = require('underscore');

var URL_PARSE = '/api/content/new';

require('styles/candidate.less');

var Candidate = React.createClass({

	classSet: React.addons.classSet,

	mixins: [React.addons.LinkedStateMixin, ValidationMixin],

	validators: {
		url: function (url) {

			var urlRegEx = /(http|https|ftp):\/\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?$&\/\/=]*)?/gi;
		 
			return urlRegEx.test(url); 
		}
	},

	componentDidMount: function() {
		this.parseUrl("");
	},

	parseUrl : function (data) {
		$.ajax({
			url: URL_PARSE,
			type: 'POST',
			data: data,
			success: function(data) {
				this.props.onGetArticle(data);
				console.log("/api/contnt/new response: ",data);
			}.bind(this)
		}).error(function(e) {
		}.bind(this));
	},

	onButtonClick: function  () {

		var url = "";
		if (this.validate()) {
			url = this.refs.CandidateInput.getDOMNode().value;
			this.parseUrl({
				url: url
			});
		}
		console.log("Candidate onButtonClick ....", url);
	},

	getInitialState: function () {
		return {
			url: ""
		};
	},

	render: function() {

		var classSetCandidateInput = this.classSet({
			'col-md-9': true,
			'form-group has-error': this.hasError('url')
		});

		return (
		
			<div className="container">
				<div className="CandidateMain row">
					<div className={classSetCandidateInput}>
						<input 
							type="text" 
							placeholder="Submit the article's URL ->" 
							className="CandidateInput form-control" 
							valueLink={this.linkState('url')}
							ref="CandidateInput"
							onFocus={_.partial(this.resetError, 'url')}
							/>
					</div>
					<div className="col-md-3">
						<div type="button"
							className="CandidateButton btn btn-block btn-lg btn-primary "
							value="Submit"
							onClick={this.onButtonClick}
							ref="CandidateButton"
							>Submit
						</div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Candidate;