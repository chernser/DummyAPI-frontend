define([
  "app",
  "models/event_callback",
  "models/event_callbacks",
  "socket_io",
  "backbone",
  "plugins/backbone.marionette",
  "helpers",
  "app_docs"

], function (app, EventCallback, EventCallbacks, io, Backbone, Marionette, Helpers, AppDocs) {
  var view = Marionette.ItemView.extend({
    template:"notifications",

    initialize:function (attributes) {
      debug("Initialize view notifications");
      this.model = attributes.model;

      this.event_callbacks = new EventCallbacks(this.model);
      this.current_event_callback = new EventCallback();
    },

    onShow:function () {
      var options = {
        title:"Proxy function",
        content:"<b>event</b> - event object with&nbsp;'name',&nbsp;'type',&nbsp;'data'&nbsp;fields<br>" +
        "<b>data</b> - event data<br><br>" +
        "<b>Returns</b>: <br>event object with 'data' field and fields above",
        trigger:"click"
      };
      $("#proxy_function_help_btn").popover(options);

      $("#event_data").val('{\n    "value": 123\n}\n');

      if (!this.model.has("notify_proxy_fun") || _.isEmpty(this.model.get("notify_proxy_fun"))) {
        var default_proxy_code = "function proxy(event, data) {\n    event.data = data;\n   return event;\n}";
        $("#proxy_function_code").val(default_proxy_code);
      }

      var callback_function_help_popover_options = {
        title:"Callback function",
        content: "",
        trigger:"click"
      };

      $("#callback_function_help_btn").popover(callback_function_help_popover_options);

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

      this.loadSocketIoClients();
      this.initCallbacksGrid();
      this.loadCallbacks();

      Helpers.preventTabChangeFocus("#new_callback_function_code");
      Helpers.renderModel("#event_callback_edit_form", this.current_event_callback);
    },

    onRender:function () {
      AppDocs.init(this.$el);
    },

    printEvent:function (event) {
      $("#events_log").append(JSON.stringify(event)).append("<br/>\n");

    },

    loadSocketIoClients:function () {

      this.model.getSocketClients(function (err, clients) {
        debug("got socket io clients: ", clients);

        var $client_list = $("#to_socket_io_client");
        $client_list.append("<option value=''>all</option>");
        for (var index in clients) {
          $client_list.append("<option>" + clients[index] + "</option>");
        }
      });
    },

    initCallbacksGrid:function () {
      var fields = {
        event_name:{name:"Event Name", width:250},
        is_enabled:{name:"Enabled", width:70}
      };

      Helpers.showGrid("#event_callbacks_tbl", "", fields, {datatype:'local', autowidth:false, width:400});
    },

    loadCallbacks:function () {
      var view = this;
      this.event_callbacks.load(function (err, model) {
        var data = view.event_callbacks.toJSON();
        Helpers.setGridData("#event_callbacks_tbl", data);
      });
    },


    events:{
      'click #save_proxy_function_code_btn':'onSaveProxyFunctionCodeBtn',
      'click #send_notification_btn':'onSendNotificationBtn',

      'click #edit_selected_callback_btn':'onEditSelectedCallbackBtn',
      'click #remove_selected_callback_btn':'onRemoveSelectedCallbackBtn',
      'click #add_update_event_callback_btn':'onAddUpdateEventCallbackBtn'
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
      var client_id = $("#to_socket_io_client").val();
      if (client_id === '') {
        client_id = null;
      }
      this.model.sendEvent(event_name, event_data, client_id, function (err, result) {
        debug("notification result: ", result);
        $("#sending_result").text("Delivered to " + result.notified + " clients");
      });
    },

    onEditSelectedCallbackBtn:function () {
      var selected_callback = Helpers.getSelectedRowData("#event_callbacks_tbl");
      if (selected_callback !== null) {
        this.current_event_callback.clear();
        var instances = this.event_callbacks.where({event_name:selected_callback.event_name});
        if (instances.length > 0) {
          selected_callback = instances[0].toJSON();
        }
        this.current_event_callback.set(selected_callback);
        Helpers.renderModel("#event_callback_edit_form", this.current_event_callback);
      }
    },

    onRemoveSelectedCallbackBtn:function () {
      var selected_callback = Helpers.getSelectedRowData("#event_callbacks_tbl");
      if (selected_callback !== null) {
        this.current_event_callback.clear();
        var instances = this.event_callbacks.where({event_name:selected_callback.event_name});
        if (instances.length > 0) {
          selected_callback = instances[0].toJSON();
        }

        this.current_event_callback.set(selected_callback);

        var view = this;
        this.current_event_callback.remove(function (err, result) {
          debug("Event callback remove result: ", err, result);
          view.loadCallbacks();
        });
      }

    },

    onAddUpdateEventCallbackBtn:function () {
      var view = this;

      Helpers.formToModel("#event_callback_edit_form", this.current_event_callback);
      this.current_event_callback.set("app_id", this.model.getId());

      var event_name = this.current_event_callback.get("event_name");
      var is_new = _.isEmpty(this.event_callbacks.where({event_name:event_name}));
      if (is_new === true) {
        delete this.current_event_callback._id;
        delete this.current_event_callback.id;
      }

      debug("Saving callback: ", this.current_event_callback.toJSON());
      this.current_event_callback.put(function (err, result) {
        debug("save result", err, result);
        view.loadCallbacks();
      });
    }

  });


  return view;
});