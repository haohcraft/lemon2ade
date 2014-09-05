/**
 * @jsx React.DOM
 */

require('styles/plate.less');

var Editable = require('./lib/Editable.jsx');

var Plate = React.createClass({

	render: function() {

		var article = this.props.article;
		
		if (Object.keys(article).length < 1) {
			return <noscript />;
		}

		var title = article.title;
		var authors = article.authors.map(function (author) {
			return author.name;
		});
		var provider = article.provider_display;
		var origin = article.original_url;

		var paragraphs = article.parsedSections.map(function (paragraph) {
			return (
				<p key={paragraph.id}>{paragraph.content}</p>
			);
		}); 

		var optionsTitle = {buttons: []};
		var optionsContent = {
			buttons: ['bold', 'italic', 'quote','underline', 'anchor'],
			targetBlank: true,
			placeholder: ''
		};

		return (
			<div className="Plate section">
				<div className="container">
					<div className="row">
						<div className="col-md-6 Lemon" >
							<h3 className="demo-section-title">Lemon</h3>
							<div className="main">
								<h4 className="title">{title}</h4>
								
								<br></br>
								<div className="content">
									{paragraphs}
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
								<Editable options={optionsContent}>
									<div className="content">
										&nbsp;	
									</div>
								</Editable>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Plate;