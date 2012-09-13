define([

  "app",
  "underscore",
  "models/backend"

], function (app, _, Backend) {

  var DEFAULT_CODE = 'function event_callback(context) {\n   return {event_name: "vent",\n event_data: {\n v: 1\n}}; \n}';
  var model = Backend.Model.extend({
    idAttribute:'_id',

    defaults:{
      code:DEFAULT_CODE
    },

    initialize:function (attributes) {
      this.attributes = attributes;
    },

    resourceUrl:function () {
      return 'app/' + this.get('app_id') + '/event_callback/' + (this.isNew() ? '' : this.get("event_name"));
    }

  });


  return model;
});