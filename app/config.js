// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps:["main"],

    paths:{
        // JavaScript folders.
        libs:"../assets/js/libs",
        plugins:"../assets/js/plugins",
        models: "models",
        views: "views",

        // Libraries.
        handlebars:"../assets/js/libs/handlebars_runtime",
        jquery:"../assets/js/libs/jquery",
        underscore:"../assets/js/libs/lodash",
        backbone:"../assets/js/libs/backbone",
        marionette:"../assets/js/plugins/backbone.marionette"
    },

    shim:{

        handlebars: {
            exports:"Handlebars"
        },

        backbone:{
            deps:["underscore", "jquery"],
            exports:"Backbone"
        },


        JST: {
            deps: ["handlebars"]
        },

        marionette: {
            deps: ["underscore", "backbone"],
            exports: "Backbone.Marionette"
        }
    }

});
