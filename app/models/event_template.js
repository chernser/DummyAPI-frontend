define([

  "app",
  "underscore",
  "models/backend"

], function (app, _, Backend) {

  var DEFAULT_CODE = '{\n' +
  '           "value": 123,\n' +
  '           }';

  var model = Backend.Model.extend({
    idAttribute:'_id',

    /*defaults:{
      code:DEFAULT_CODE
    },*/

    initialize:function (attributes) {

    },

    resourceUrl:function () {
      return 'app/' + this.get('app_id') + '/event_template/' + (this.isNew() ? '' : this.get("event_name"));
    }

  });


  return model;
});