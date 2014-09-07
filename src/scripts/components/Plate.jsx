/**
 * @jsx React.DOM
 */

require('styles/plate.less');

var HEIGHT_BLOCK = 210;
var Editable = require('./lib/Editable.jsx');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Plate = React.createClass({

	classSet: React.addons.classSet,

	getInitialState: function() {
		return {
			selectedId: 0,
			styleScroll: {top: 0}
		};
	},

	onMouseEnter: function (e) {

		console.log("onMouseEnter the p ", $(e.target).data('lemonid'));
		var order = parseInt($(e.target).data('lemonid'), 10);
		this.setState({
			selectedId: order,
			styleScroll: {
				top: -1 * HEIGHT_BLOCK * order,
				transition: "top .5s ease-in"
			}
		});
	},

	onMouseLeave: function (e) {
		console.log("onMouseLeave the p ", $(e.target).data('lemonid'));
		this.setState({
			selectedId: 0
		});
	},

	render: function() {

		var article = this.props.article;
		if (Object.keys(article).length < 1) {
			return <noscript />;
		}
		var optionsTitle = {buttons: []};
		var title = article.title;
		var authors = article.authors.map(function (author) {
			return author.name;
		});
		var provider = article.provider_display;
		var origin = article.original_url;

		var lemons = [];
		var lemonades = [];

		var filteredArticles = article.parsedSections.filter(function (paragraph) {
			return paragraph.content != ""
		});
		// console.log("The articles: ", filteredArticles.length);
		// console.log("The filtered articles: ", filteredArticles.length);
		for (key in filteredArticles) {
			var _article = filteredArticles[key];
			// console.log("The article is ", _article.id);
			var _id = _article.id;
			var classSetLemonade = this.classSet({
				'lemonade': true,
				'selected': _id == this.state.selectedId
			});	
			var optionsContent = {
				buttons: ['bold', 'italic', 'quote','underline', 'anchor'],
				targetBlank: true,
				placeholder: ''
			};

			lemons.push(<p key={_id} className="lemon" data-lemonid={_id} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>{_article.content}</p>);
			if (key >= this.state.selectedId) {
				lemonades.push(
					<Editable options={optionsContent}>
						<div key={_id} className={classSetLemonade} data-lemonadeid={_id}>{key}&nbsp;</div>
					</Editable>
				);
			}
		} 
		
		return (
			<div className="Plate section">
				<div className="container">
					<div className="row">
						<div className="col-md-6 Lemon" >
							<h3 className="demo-section-title">Lemon</h3>
							<div className="main">
								<h4 className="title">{title}</h4>
								<br></br>
								<div className="content" >
									{lemons}
								</div>
							</div>
						</div>
						<div className="col-md-6 Lemonade" >
							<h3 className="demo-section-title">Lemonade</h3>
							<div className="main edit">
								<Editable options={optionsTitle}>
									<h4 className="title" >标题： {title}</h4>
								</Editable>
								<div className="author">作者: {authors} | 发表于 {provider} | <a target="_blank" href={origin}>Origin</a></div>
								<Editable>
									<div className="translator">译者：</div>
								</Editable>
								<div className="content">
									<ReactCSSTransitionGroup className="scroll" transitionName="scroll">
										{lemonades}
									</ReactCSSTransitionGroup>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Plate;