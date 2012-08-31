define([

    "backbone",
    "plugins/backbone.marionette"



], function (Backbone, Marionette, SlickGrid) {


    var view = Marionette.ItemView.extend({
        template:"notifications",

        initialize:function (attributes) {
            debug("Initialize view notifications");
        },

        onShow:function () {
            var options = {
                title: "Proxy function help",
                content: "This function should return object with fields 'name', 'type', 'data'" +
                    "By default 'event' passed to function has correct 'name', 'type' fields" +
                    "If message should be sent instead event, set event.type = 'msg'",
                trigger: "click"
            };
            $("#proxy_function_help_btn").popover(options);
        },

        events:{

        }


    });


    return view;
});