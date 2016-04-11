var articles = [];

function Article (articleIndex) {
  // TODO: Use the js object passed in to complete this contructor function:
  // Save ALL the properties of `articleIndex` into `this`.
  this.title = articleIndex.title;
  this.category = articleIndex.category;
  this.author = articleIndex.author;
  this.authorUrl = articleIndex.authorUrl;
  this.publishedOn = articleIndex.publishedOn;
  this.body = articleIndex.body;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();

  $newArticle.attr('data-author', this.author);

  // TODO: Use jQuery to fill in the template with properties
  // from this particular Article instance. We need to fill in:
  // the author name and url, the article title and body, and the
  // publication date.

  $newArticle.attr('data-title', this.title);
  $newArticle.attr('data-category', this.category);
  $newArticle.attr('data-authorUrl', this.authorUrl);
  $newArticle.attr('data-body', this.body);

  // Include the publication date as a 'title' attribute to show on hover:
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn)

  // Display the date as a relative number of "days ago":
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago')

  $newArticle.append('<hr>');

  // TODO: This cloned article is no longer a template, so we should remove that class...

  $newArticle.removeClass('template');

  return $newArticle;
}

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  articles.push(new Article(ele));
})

articles.forEach(function(a){
  $('#articles').append(a.toHtml())
});
