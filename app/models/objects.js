define([

  "models/backend"

], function (Backend) {

  var collection = Backend.Collection.extend({
    initialize:function (application_model) {
      this.application_model = application_model;
    },

    setObjectTypeName:function (object_type_name) {
      this.object_type_name = object_type_name;
    },

    collectionUrl:function () {
      return 'app/' + this.application_model.getId() + '/object/' + this.object_type_name + '/';
    }
  });


  return collection;
});