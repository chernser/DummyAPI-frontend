define([
  "app.config",

  // Libraries.
  "jquery",
  "underscore",
  "backbone",

  // Plugins.
  "plugins/backbone.marionette",

  "helpers"
],

  function (config, $, _, Backbone, Marionette, Helpers) {
    debug(config);
    var TEMPLATE_PREFIX = 'app/templates/';
    var TEMPLATE_EXT = '.hbs';

    var app = new Marionette.Application({
      // The root path to run the application.
      root:"/",

      getJSTTemplate:function (template, data) {
        return JST[template](data);
      }
    });

    app.addRegions({
      main:"#main",
      upper_context:"#upper_context"
    });

    // Tunes
    Marionette.Renderer.render = function (template, data) {
      return app.getJSTTemplate(template, data);
    };


    app.config = config; // for easy access

    app.updateBackendInfo = function () {
      var url = ['//', app.config.backend, '/api/1/'].join('');

      Helpers.doHttpRequest(url, null, {method:'GET'}, function (err, response) {
        var version = 'unknown';
        if (err === null && response.version !== null) {
          version = response.version;
        }

        $("#_backend_version").text(version);
      });


      var current_backend_title = _.keys(app.config.backends)[0];
      debug("current backend title: ", current_backend_title);
      $("#current_backend").text(current_backend_title);


      $("#current_backend").text(current_backend_title);
    };

    app.updateBackendInfo();

    return app;

  });
