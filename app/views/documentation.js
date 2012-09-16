define([
  "app",
  "models/object_type",
  "models/object_types",
  "plugins/backbone.marionette",
  "jquery",
  "underscore",
  "helpers"

], function (App, ObjectType, ObjectTypes, Marionette, $, _, Helpers) {


  var view = Marionette.ItemView.extend({
    template:'documentation',

    initialize:function (attributes) {

      debug("documentation: ", attributes.model.getId());
      this.app_id = attributes.model.getId();
      this.object_types = new ObjectTypes(attributes.model);
      this.model = attributes.model;

      this.current_object_type = new ObjectType({});

    },


    selectObjectType:function (object_type) {
      this.current_object_type.clear();
      this.current_object_type.set(object_type.attributes);
    },

    loadObjectTypes:function (callback) {
      var view = this;
      var resource_nav_handler = function (event) {
        view.selectObjectType($(this).data());
        view.render();
        event.preventDefault();
        return false;
      };

      this.object_types.load(function (err, model) {
        for (var index in model.models) {
          var object_type = model.models[index];
          var nav_item = $("<li><a href='#'>" + object_type.get("name") + "</a></li>");
          nav_item.data(object_type);
          nav_item.click(resource_nav_handler);
          $("#object_types_nav_list").append(nav_item);
        }

        if (_.isFunction(callback)) {
          callback(err, model);
        }
      });
    },


    renderCurrentObjectType:function () {
      debug("Rendering object type: ", this.current_object_type.get("name"));
      var view = this;

      $("#object_types_nav_list li").each(function (index, item) {
        var data = $(item).data();
        if (_.isUndefined(data.get)) {
          return;
        }

        debug("compare: ", data.get("name"), view.current_object_type.get("name"));
        if (data.get("name") == view.current_object_type.get("name")) {
          $(item).addClass("active");
        } else {
          $(item).removeClass("active");
        }
      });

      // Showing object type documentation
    },

    onRender: function() {

      var view = this;
      this.loadObjectTypes(function (err, model) {
        if (view.current_object_type.has("name") === false) {
          debug("Object type not selected: ", model.models[0]);
          if (model.models.length > 0) {
            view.selectObjectType(model.models[0]);
            view.render();
            return;
          }
        }

        view.renderCurrentObjectType();
      });


      $(".collapse").collapse().first().collapse('show');

/*

      $("a.accordion-toggle").click(function(e) {
        $(this.href).collapse('toggle');
        e.preventDefault(); return false;
      });*/
    },

    events:{


    }


  });


  return view;
});