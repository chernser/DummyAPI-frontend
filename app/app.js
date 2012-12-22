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

        var app  = new Marionette.Application( {
            root: config.backend.root,

            getJSTTemplate:function(template, data) {
                return Handlebars.templates[template](data);
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
