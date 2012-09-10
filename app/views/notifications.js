define([
  "app",
  "socket_io",
  "backbone",
  "plugins/backbone.marionette"
], function (app, io, Backbone, Marionette) {
  var view = Marionette.ItemView.extend({
    template:"notifications",

    initialize:function (attributes) {
      debug("Initialize view notifications");
      this.model = attributes.model;
    },

    onShow:function () {
      var options = {
        title:"Proxy function help",
        content:"This function should return object with fields 'name', 'type', 'data'" +
          "By default 'event' passed to function has correct 'name', 'type' fields" +
          "If message should be sent instead event, set event.type = 'msg'",
        trigger:"click"
      };
      $("#proxy_function_help_btn").popover(options);

      var view = this;

      // TODO:  make it more clear without assumptions
      var socket_url = "//" + app.config.backend.substr(0, app.config.backend.indexOf(':')) + ":8001";
      debug("connecting socket to: ", socket_url);
      var client_events_socket = io.connect(socket_url + "/all_events?access_token=" + this.model.get("access_token"));

      client_events_socket.on("connect", function () {
        debug("Application socket connected");
      });


      client_events_socket.on("vent", function (event) {
        debug("event from client: ", event);
        view.printEvent(event);
      });
    },

    printEvent:function (event) {
      $("#events_log").append(JSON.stringify(event)).append("<br/>");


    },

    events:{
      'click #save_proxy_function_code_btn':'onSaveProxyFunctionCodeBtn',
      'click #send_notification_btn':'onSendNotificationBtn'
    },

    onSaveProxyFunctionCodeBtn:function () {
      var code = $("#proxy_function_code").val();
      try {
        eval(code);
        this.model.set("notify_proxy_fun", code);
        this.model.put(function (err, model) {
          debug("Notification proxy code save result: ", err, model);
        });
      } catch (E) {
        $("#proxy_function_code_error").text(E);
      }
    },

    onSendNotificationBtn:function () {
      var event_name = $("#event_name").val();
      var event_data = JSON.parse($("#event_data").val());
      this.model.sendEvent(event_name, event_data, function (err, result) {
        debug("notification result: ", result);
        $("#sending_result").text("Delivered to " + result.notified + " clients");
      });
    }


  });


  return view;
});