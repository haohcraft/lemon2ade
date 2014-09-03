/**
 * @jsx React.DOM
 */

require('styles/plate.less');

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
								<h4 className="title">标题： {title}</h4>
								<small>作者: {authors} 发表于 {provider}</small>
								<div className="editable">
									正文：	
								</div>
								<div>
									<small>Source: <a target="_blank" href={origin}>{origin}</a></small>
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