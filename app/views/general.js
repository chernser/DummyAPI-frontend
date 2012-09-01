define([

    "backbone",
    "plugins/backbone.marionette"

], function (Backbone, Marionette) {

    var view = Marionette.ItemView.extend({
        template: "general",

        initialize:function(attributes) {
            debug("Initialize view general");
            this.model = attributes.model;

            var view = this;
            this.model.on('change', function() { view.render(); });
        },

        events: {

            'click #renew_access_token_btn' : 'renewAccessToken'
        },

        renewAccessToken: function() {
            debug("Renewing access token");
            var that = this;
            this.model.renewAccessToken();
        }
    });


    return view;
});