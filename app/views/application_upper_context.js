define([

    "backbone",
    "plugins/backbone.marionette"
], function (Backbone, Marionette) {

    var view = Marionette.ItemView.extend({
        template:"application_upper_context",

        initialize: function(attributes) {
            this.model = attributes.model;
        }

    });


    return view;
});