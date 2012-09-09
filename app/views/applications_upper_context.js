define([
  "app",
  "models/backend",
  "models/applications",
  "views/applications",
  "plugins/backbone.marionette"
], function (app, Backend, ApplicationModel, ApplicationsView, Marionette) {
  var view = Marionette.ItemView.extend({
    template:"applications_upper_context",

    initialize:function (attributes) {
      this.applications_view = attributes.applications_view;
    },

    serializeData:function () {
      var backends = [];
      for (var title in app.config.backends) {
        backends.push({title: title, server: app.config.backends[title]});
      }
      return {backends: backends};
    },

    events:{
      'change #backend_selector':'onBackendSelectorChange'

    },

    onBackendSelectorChange:function () {
      var backend_title = $("#backend_selector option:selected").text();
      var backend_server = $("#backend_selector").val();

      debug("Backend changed to: ", backend_title, backend_server);
      $("#current_backend").text(backend_title);
      app.config.backend = backend_server;
      this.applications_view.reload();

    }

  });


  return view;
});