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
      Helpers.renderModel("#static_route_edit_form", this.current_static_route);
    },

    onRender: function() {
      this.loadStaticRoutes();
    },

    initRoutesTable:function () {
      var fields = {
        "route" : {name: "Route"},
        "resource" : {name: "Resource"},
        "id_fun_code": {name: "Id Function"}
      };

      Helpers.showGrid('#static_routes_tbl', null, fields, {datatype: 'local'});
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
      var selected_route = Helpers.getSelectedRowData('#static_routes_tbl');
      if (selected_route !== null) {
        selected_route = this.static_routes.where({route: selected_route.route});
        this.current_static_route.clear();
        this.current_static_route.set(selected_route[0]);

        debug("current_route: ", this.current_static_route.toJSON());
        Helpers.renderModel("#static_route_edit_form", this.current_static_route);
      }
    },

    onRemoveSelectedStaticRouteBtn:function () {
      var view = this;
      var selected_route = Helpers.getSelectedRowData('#static_routes_tbl');
      if (selected_route !== null) {
        selected_route = this.static_routes.where({route: selected_route.route});
        this.current_static_route.clear();
        this.current_static_route.set(selected_route[0]);
        debug("removing: ", this.current_static_route.toJSON());
        this.current_static_route.remove(function(err, result) {
          view.loadStaticRoutes();
        });
      }
    },

    onAddUpdateStaticRouteBtn:function () {
      var view = this;
      this.current_static_route.set("app_id", this.model.getId());
      Helpers.formToModel('#static_route_edit_form', this.current_static_route);
      var is_new = _.isEmpty(this.static_routes.where({route: this.current_static_route.get("route")}));
      if (is_new === true) {
        delete this.current_static_route.id;
        delete this.current_static_route._id;
      }
      debug("saving static route: ", is_new, this.current_static_route);
      this.current_static_route.put(function(err, result) {
        debug("save result", err, result);
        view.loadStaticRoutes();
      });
    }

  });


  return view;
});