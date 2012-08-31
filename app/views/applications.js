define([


    "backbone",
    "plugins/backbone.marionette"

], function (Backbone, Marionette) {

    var View = Marionette.ItemView.extend({
        template: 'applications',

        initialize: function(attributes) {
            debug("Initializing Applications selection screen");
        },

        events: {

        }


    });


    return View;
});