define([

    "backbone",
    "plugins/backbone.marionette"

], function (Backbone, Marionette) {

    var view = Marionette.ItemView.extend({
        template: "general",

        initialize:function(attributes) {
            debug("Initialize view general");
        },

        events: {

            'click #renew_access_token_btn' : 'renewAccessToken'
        },

        renewAccessToken: function() {
            debug("Renewing access token");

        }
    });


    return view;
});