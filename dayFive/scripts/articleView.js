// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

function putObjectTogether() {
  var jsonObject = {};

  // this pushes the stringified text to the bottom right corner of our new.html page
  jsonObject.title = $('#article-title').val();
  jsonObject.category = $('#article-category').val();
  jsonObject.author = $('#article-author').val();
  jsonObject.authorUrl = $('#article-author-url').val();
  jsonObject.publishedOn = $('#article-published').val();
  jsonObject.body = marked($('#text-body').val()); // converts the markup to HTML, this is the raw article markup

  return jsonObject;
}

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#author-filter').append(optionTag);

      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any artcile body.

  $('#articles').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

articleView.initNewArticlePage = function() {
  // DONE: Ensure the main .tab-content area is revealed. We might add more tabs later.

  $('.tab-content').show();

  // DONE: The new articles we create will be copy/pasted into our source data file. Set up this "export" functionality. We can hide it for now, and show it once we have data to export. Also, let's add focus event to help us select the JSON.

  $('input, textarea').on('blur', function() {
    $('#article-export label').css('display', 'block');
  });

    function render() {

      var jsonTemp = putObjectTogether();
      var aMarkOut = $('#articles');
      var aJson = $('#article-export label');
      var newArticle = new Article(jsonTemp);

      // this pushes the markup'd format text to the bottom left corner of our new.html page
      aMarkOut.empty();
      aMarkOut.append(newArticle.toHtml())

      aMarkOut.find('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });

      // this is making a JSON object from the jsonObject object, keys and values are already paired up
      var jsonString = aJson.text(JSON.stringify(jsonTemp));

    }

  // DONE: Add an event handler to update the preview and the export field if any inputs change.

  $('input, textarea').on('input', render);
};

// DONE: Set up a var to hold the new article we are creating. Clear out the #articles element, so we can put in the updated preview

// DONE: Instantiate an article based on what's in the form fields:

// DONE: Use our interface to the Handblebars template to put this new article into the DOM:

// DONE: Activate the highlighting of any code blocks:

// DONE: Export the new article as JSON, so it's ready to copy/paste into blogArticles.js:

articleView.initIndexPage = function() {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
  articleView.initNewArticlePage();
};
