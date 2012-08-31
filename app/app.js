define([
    // Libraries.
    "jquery",
    "underscore",
    "backbone",

    // Plugins.
    "plugins/backbone.marionette"
],

    function ($, _, Backbone, Marionette) {

        var TEMPLATE_PREFIX = 'app/templates/';
        var TEMPLATE_EXT = '.hbs';

        var app  = new Marionette.Application( {
            // The root path to run the application.
            root:"/",

            getJSTTemplate:function(template, data) {
                // Small optimization ??
                //var templateKey = [TEMPLATE_PREFIX, template, TEMPLATE_EXT].join('');
                return Handlebars.templates[template](data);
                //return JST[templateKey](data);
            }
        });

        app.addRegions({
            main: "#main"
        });

        // Tunes
        Marionette.Renderer.render = function(template, data) {
            return app.getJSTTemplate(template, data);
        };


        return app;

    });
