define([
  "models/backend",
  "models/event_template"
], function (Backend, EventTemplate) {

  var collection = Backend.Collection.extend({


    model:EventTemplate, 
    initialize:function (application_model) {
      this.application_model = application_model;
    },

    collectionUrl:function () {
      return 'app/' + this.application_model.getId() + '/event_template/';
    }
  });


  return collection;
});