define([
  "jquery"
], function ($) {

  var docs = {

    topics: {
      '#object_types' : 'https://github.com/chernser/DummyAPI-frontend/wiki/Object-Type-Creation',
      '#general_settings' : 'https://github.com/chernser/DummyAPI-frontend/wiki/General-Application-Settings',
      '#notifications' : 'https://github.com/chernser/DummyAPI-frontend/wiki/Notifications',
      '#authentication' : 'https://github.com/chernser/DummyAPI-frontend/wiki/Authentication',
      '#static_routes' : 'https://github.com/chernser/DummyAPI-frontend/wiki/Static-Routes'
    }
  };

  docs.init = function ($view_el) {
    debug("init app docs", $('.wiki-link'));
    var links = $(".wiki-link");
    if ($view_el !== void 0) {
      links = $view_el.find('.wiki-link');
    }

    links.each(function (index, item) {
      var topic = $(item).attr("href");
      debug("item topic", topic);
      $(item).attr("href", docs.topics[topic]);
    });
  };

  return docs;
});