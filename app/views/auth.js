define([

    "backbone",
    "plugins/backbone.marionette"



], function (Backbone, Marionette, SlickGrid) {


    var view = Marionette.ItemView.extend({
        template:"auth",

        initialize:function (attributes) {
            debug("Initialize view dummy auth");
        },

        onShow:function () {
        },

        events:{

        }


    });


    return view;
});