define([

  "models/static_routes",
  "models/static_route",

  "plugins/backbone.marionette",
  "helpers",
  "jquery",
  "underscore"
], function (StaticRoutes, StaticRoute, Marionette, Helpers, $, _) {

  var view = Marionette.ItemView.extend({
    template:"static_routes",

    initialize:function (attributes) {

      this.model = attributes.model;
      this.static_routes = new StaticRoutes(this.model);
      this.current_static_route = new StaticRoute({});
    },

    onShow:function () {

      var resource_selector = $("#resource_selector");
      var object_type_name = null;
      resource_selector.append("<option></option>");
      var object_types = this.model.get('object_types');
      debug("object types: ", object_types);
      for (var index in object_types) {
        object_type_name = object_types[index].name;
        resource_selector.append("<option>" + object_type_name + "</option>");
      }

      this.initRoutesTable();
      this.loadStaticRoutes();

      Helpers.renderModel("#static_route_edit_form", this.current_static_route);
    },

    initRoutesTable:function () {
      var fields = {
        "route" : {name: "Route"},
        "resource" : {name: "Resource"},
        "id_fun_code": {name: "Id Function"}
      };

      Helpers.showGrid('#static_routes_tbl', null, fields, {dataType: 'local'});
    },

    loadStaticRoutes:function () {
      var view = this;

      view.static_routes.load(function(err, model) {
         Helpers.setGridData('#static_routes_tbl', view.static_routes.toJSON());
      });
    },

    events:{
      'click #edit_selected_static_route_btn':'onEditSelectedStaticRouteBtn',
      'click #remove_selected_static_route_btn':'onRemoveSelectedStaticRouteBtn',
      'click #add_update_static_route_btn':'onAddUpdateStaticRouteBtn'
    },

    onEditSelectedStaticRouteBtn:function () {

    },

    onRemoveSelectedStaticRouteBtn:function () {

    },

    onAddUpdateStaticRouteBtn:function () {

    }

  });


  return view;
});