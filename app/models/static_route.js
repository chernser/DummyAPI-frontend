define([
  "models/backend"
], function(Backend) {

  var model = Backend.Model.extend({
    idAttribute:'_id',
    defaults:{
      route: '',
      resource: '',
      id_fun_code: 'function id_fun(req, utils) { \n    return {id: 1, id_field: "id"};\n}'
    },

    initialize: function(attributes) {
      this.attributes = this.defaults;
    },

    resourceUrl:function() {
      return 'app/' + this.get("app_id") + '/static_route' + (this.isNew() ? '' : this.get("route"));
    }

  });


  return model;
});