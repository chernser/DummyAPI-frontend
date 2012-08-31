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
        tbootstrap:"../assets/js/libs/bootstrap.min",
        event_drag:"../assets/js/libs/jquery.event.drag-2.0.min",
        event_drop:"../assets/js/libs/jquery.event.drop-2.0.min",
        slickgrid_core: "../assets/js/libs/slick.core",
        slickgrid: "../assets/js/libs/slick.grid",

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

        slickgrid: {
            deps:["jquery", "event_drag", "event_drop", "slickgrid_core"],
            exports:"SlickGrid"
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
