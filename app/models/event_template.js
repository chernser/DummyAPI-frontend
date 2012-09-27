define([
  "models/backend"
], function (Backend) {

  var model = Backend.Model.extend({
    idAttribute:'_id',

    defaults: {
      event_name: 'event',
      event_data: '{}'
    },

    resourceUrl: function() {
      return 'app/' + this.get('app_id') + '/event_template/' + this.getId();
    }
  });


  return model;
});