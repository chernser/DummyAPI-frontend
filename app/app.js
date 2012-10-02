define([
  "app.config",

  // Libraries.
  "jquery",
  "underscore",
  "backbone",

  // Plugins.
  "plugins/backbone.marionette",

  "helpers",
  "handlebars"
],

  function (config, $, _, Backbone, Marionette, Helpers, Handlebars) {
    debug(config);
    var TEMPLATE_PREFIX = 'app/templates/';
    var TEMPLATE_EXT = '.hbs';

    var app = new Marionette.Application({
      // The root path to run the application.
      root:"/",

      handlebarsRenderCompiledTemplate:function (template, data) {
        //cache the handlebars compiled template function
        if(!("cache" in Handlebars)) {
          Handlebars.cache = {};
        }
        if(!(template in Handlebars.cache)) {
          Handlebars.cache[template] = Handlebars.VM.template(JST[template]);
        }
        return Handlebars.cache[template](data);
      }
    });

    app.addRegions({
      main:"#main",
      upper_context:"#upper_context"
    });

    // Tunes
    Marionette.Renderer.render = function (template, data) {
      return app.handlebarsRenderCompiledTemplate(template, data);
    };


    app.config = config; // for easy access

    app.updateBackendInfo = function () {
      var url = ['//', app.config.backend, '/api/1/'].join('');

      Helpers.doHttpRequest(url, null, {method:'GET'}, function (err, response) {
        var version = 'unknown';
        if (err === null && response.version !== null) {
          version = response.version;
          $("#backend_status_bulb").removeClass('off');
        } else {
          $("#backend_status_bulb").addClass('off');
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
