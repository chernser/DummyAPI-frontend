define([

    "app",

    "views/general",
    "views/application_upper_context",
    "backbone",
    "plugins/backbone.marionette"

], function(app, DefaultView, AppUpperContext, Backbone, Marionette) {

    var layout = Marionette.Layout.extend({
        template: "application",


        initialize: function(attributes) {
            this.viewClass = DefaultView;

            if (!_.isUndefined(attributes.viewClass)) {
                this.viewClass = attributes.viewClass;
            }

            this.model = attributes.model;
        },

        regions: {
            nav: "#nav_list",
            view: "#view"
        },

        onShow: function() {
            var view =  new this.viewClass({model: this.model});
            this.view.show(view);

            var upper_context = new AppUpperContext({model: this.model});
            app.upper_context.show(upper_context);
        }

    });


    return layout;

});