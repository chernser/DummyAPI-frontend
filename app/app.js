define([
    "app.config",

    // Libraries.
    "jquery",
    "underscore",
    "backbone",

    // Plugins.
    "plugins/backbone.marionette"
],

    function (config, $, _, Backbone, Marionette) {
        debug(config);
        var TEMPLATE_PREFIX = 'app/templates/';
        var TEMPLATE_EXT = '.hbs';

        var app  = new Marionette.Application( {
            // The root path to run the application.
            root:"/",

            getJSTTemplate:function(template, data) {
                // Small optimization ??
                //var templateKey = [TEMPLATE_PREFIX, template, TEMPLATE_EXT].join('');
                //return Handlebars.templates[template](data);
                return JST[template](data);
            }
        });

        app.addRegions({
            main: "#main",
            upper_context: "#upper_context"
        });

        // Tunes
        Marionette.Renderer.render = function(template, data) {
            return app.getJSTTemplate(template, data);
        };


        app.config = config; // for easy access

        return app;

    });
