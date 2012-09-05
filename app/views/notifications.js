define([

    "backbone",
    "plugins/backbone.marionette"



], function (Backbone, Marionette) {


    var view = Marionette.ItemView.extend({
        template:"notifications",

        initialize:function (attributes) {
            debug("Initialize view notifications");
            this.model = attributes.model;
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
            'click #save_proxy_function_code_btn' : 'onSaveProxyFunctionCodeBtn',
            'click #send_notification_btn' : 'onSendNotificationBtn'
        },

        onSaveProxyFunctionCodeBtn: function() {
            var code = $("#proxy_function_code").val();
            try {
                eval(code);
                this.model.set("notify_proxy_fun", code);
                this.model.put(function(err, model) {
                    debug("Notification proxy code save result: ", err, model);
                });
            } catch (E) {
                $("#proxy_function_code_error").text(E);
            }
        },

        onSendNotificationBtn: function() {
            var event_name = $("#event_name").val();
            var event_data = JSON.parse($("#event_data").val());
            this.model.sendEvent(event_name, event_data, function(err,result) {
                debug("notification result: ", result);
                $("#sending_result").text("Delivered to " + result.notified + " clients");
            });
        }


    });


    return view;
});