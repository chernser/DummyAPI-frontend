define([

    "backbone",
    "plugins/backbone.marionette"

], function (Backbone, Marionette) {

    var view = Marionette.ItemView.extend({
        template: "general",

        initialize:function(attributes) {
            debug("Initialize view general");
        }


    });


    return view;
});