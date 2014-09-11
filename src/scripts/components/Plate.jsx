/**
 * @jsx React.DOM
 */

require('styles/plate.less');

var Win = typeof window !== 'undefined' ? window : false;
var MIN_SCROLL = -2310;
var MAX_SCROLL = 0; 
var HEIGHT_BLOCK = 210;
var Editable = require('./lib/Editable.jsx');
var ViewportMetrics = require('react/lib/ViewportMetrics');
var _ = require('underscore');
var Plate = React.createClass({

	classSet: React.addons.classSet,

	getInitialState: function() {
		return {
			selectedId: -1,
			styleScroll: {top: 0},
			styleScrollable: {'overflow-y': 'hidden'}
		};
	},

	setNewScrollTop : function (deltaY) {

		console.log("setNewScrollTop ...", deltaY);
		var currentSrollTop = this.state.styleScroll.top;
		var deltaScrollTop = 0;
		var newScrollTop = 0;

		if (deltaY > 0) {
			deltaScrollTop = -1 * HEIGHT_BLOCK / 2;
		} else {
			deltaScrollTop = HEIGHT_BLOCK / 2;
		}
		
		newScrollTop = currentSrollTop + deltaScrollTop;

		newScrollTop = newScrollTop > MAX_SCROLL ? MAX_SCROLL : newScrollTop;
		newScrollTop = newScrollTop < MIN_SCROLL ? MIN_SCROLL : newScrollTop;
		console.log("onWheelLemonade ... newScrollTop ..", newScrollTop);

		this.setState({
			styleScroll: {
				top: newScrollTop ,
				transition: "top .5s ease-in"
			}
		});
	},

	onWheelLemonade: function (e) {

		//Prevent the window scrolling
		if (Win) {
			Win.event.preventDefault();
		}
		_.debounce(this.setNewScrollTop(e.deltaY), 1000, true);
	},


	onMouseEnterLemonade: function (e) {

		console.log("onMouseEnterLemonade ... ");
		this.setState({
			styleScrollable: {'overflow-y': 'auto'}
		});
	},

	onMouseLeaveLemonade: function (e) {

		console.log("onMouseLeaveLemonade ... ");
		this.setState({
			styleScrollable: {'overflow-y': 'hidden'}
		});
	},

	onMouseEnterLemon: function (e) {

		console.log("onMouseEnterLemon the p ", $(e.target).data('lemonid'));
		var order = parseInt($(e.target).data('lemonid'), 10);
		this.setState({
			selectedId: order,
			styleScroll: {
				top: -1 * HEIGHT_BLOCK * order,
				transition: "top .5s ease-in"
			}
		});
	},

	onMouseLeaveLemon: function (e) {
		console.log("onMouseLeaveLemon the p ", $(e.target).data('lemonid'));

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
		var lemonades_backfilled = [];

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

			lemons.push(<p key={_id} className="lemon" data-lemonid={_id} onMouseEnter={this.onMouseEnterLemon} onMouseLeave={this.onMouseLeaveLemon}>{_article.content}</p>);
			lemonades.push(
				<Editable options={optionsContent}>
					<div key={_id} className={classSetLemonade} data-lemonadeid={_id}>{key}&nbsp;</div>
				</Editable>
			);
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
								<div className="content" >
									<div className="scroll" style={this.state.styleScroll} onWheel={this.onWheelLemonade} >
										{lemonades}
									</div>
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