define([

    "views/general",

    "backbone",
    "plugins/backbone.marionette"

], function(DefaultView, Backbone, Marionette) {


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
            debug("On Show view: ", this.viewClass);
            var view =  new this.viewClass({});
            this.view.show(view);
        }

    });


    return layout;

});