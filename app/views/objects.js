define([

    "backbone",
    "plugins/backbone.marionette",

    "jqgrid"

], function (Backbone, Marionette, Grid) {


    var view = Marionette.ItemView.extend({
        template:"objects",

        initialize:function (attributes) {
            debug("Initialize view objects");
        },

        onShow:function () {
            $('#object_tabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });

        },

        events:{


        }


    });


    return view;
});