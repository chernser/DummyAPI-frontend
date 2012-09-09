define([

  "models/object_type",
  "models/object_types",
  "models/object",
  "models/objects",

  "backbone",
  "plugins/backbone.marionette",
  "underscore",

  "helpers"

], function (ObjectType, ObjectTypes, ObjectInstance, Objects, Backbone, Marionette, _, Helpers) {


  var view = Marionette.ItemView.extend({
    template:"objects",

    initialize:function (attributes) {
      debug("Initialize view objects");

      this.app_id = attributes.model.getId();
      this.object_types = new ObjectTypes(attributes.model);
      this.model = new ObjectType({});
      this.model.setAppId(this.app_id);


      this.instances = new Objects(attributes.model);
      this.cur_obj_inst = new ObjectInstance({app_id:this.app_id, __objectType:this.model.getId()});
    },


    selectObjectType:function (object_type) {
      this.model.clear();
      this.model.set(object_type.attributes);
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

    loadObjectInstances:function () {
      var view = this;
      this.cur_obj_inst.clear();
      this.cur_obj_inst.set("__objectType", this.model.get("name"));
      this.instances.setObjectTypeName(this.model.get("name"));

      debug("loading instances: ", this.model.get("name"), this.cur_obj_inst, this.instances, this.model);
      this.instances.load(function (err, model) {
        var data = model.toJSON();
        var id_field = _.isUndefined(view.model.get("id_field")) ? "_id" : view.model.get("id_field");


        var fields = {
         // _id:{name:"Id"}
        };

        fields[id_field] = {name: id_field};
        $("#object_type_id_field").append("<option>" + id_field + "</option>");
        for (var index in data) {
          var item = data[index];
          for (var field in item) {
            if (field == id_field || field == 'app_id' || field == '__objectType') {
              continue;
            }

            if (!fields.hasOwnProperty(field)) {
              $("#object_type_id_field").append("<option>" + field + "</option>");
            }
            fields[field] = {name:field};
          }
        }

        $("#object_type_id_field").val(id_field);

        Helpers.showGrid("#object_instances_tbl", "", fields, {datatype:"local"});
        Helpers.setGridData("#object_instances_tbl", data);
      });
    },

    onShow:function () {
      $('#object_tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
      });


      Helpers.preventTabChangeFocus("#proxy_function_code");
      Helpers.preventTabChangeFocus("#object_instance_json");
    },

    onRender:function () {
      var view = this;
      this.loadObjectTypes(function (err, model) {
        if (_.isUndefined(view.model.get("name")) || _.isEmpty(view.model.get("name"))) {
          debug("Object type not selected: ", model.models[0]);
          if (model.models.length > 0) {
            view.selectObjectType(model.models[model.models.length - 1]);
            view.render();
            return;
          }
        }

        view.renderCurrentObjectType();
        view.renderCurrentObjectInstance();
      });

      Helpers.preventTabChangeFocus("#proxy_function_code");
      Helpers.preventTabChangeFocus("#object_instance_json");
    },

    renderCurrentObjectType:function () {
      debug("Rendering object type: ", this.model.get("name"));
      var view = this;

      $("#object_types_nav_list li").each(function (index, item) {
        var data = $(item).data();
        if (_.isUndefined(data.get)) {
          return;
        }

        debug("compare: ", data.get("name"), view.model.get("name"));
        if (data.get("name") == view.model.get("name")) {
          $(item).addClass("active");
        } else {
          $(item).removeClass("active");
        }

      });
      this.loadObjectInstances();
    },

    renderCurrentObjectInstance:function () {
      var instance = this.cur_obj_inst.toJSON();
      delete instance.app_id;
      delete instance.__objectType;
      var json = JSON.stringify(instance, null, 4);
      $("#object_instance_json").val(json);
    },

    events:{
      'click #add_object_type_btn':'onAddObjectTypeBtn',
      'click #cancel_new_object_type':'onCancelNewObjectType',
      'click #confirm_new_object_type_name':'onConfirmNewObjectTypeName',
      'click #remove_object_type_btn':'onRemoveObjectTypeBtn',
      'click #save_proxy_function_code_btn':'onSaveProxyFunctionCodeBtn',
      'click #create_new_object_instance_btn':'onCreateNewObjectInstanceBtn',
      'click #edit_selected_object_btn':'onEditSelectedObjectBtn',
      'click #remove_selected_object_btn':'onRemoveSelectedObjectBtn',
      'click #save_object_instance_btn':'onSaveObjectInstanceBtn',
      'change #object_type_id_field':'onIdFieldChange',
      'click #save_object_type_route_pattern_btn':'onSaveObjectTypeRoutePatternBtn',
      'keypress #new_object_type_name':'onKeyPressedOnNewObjectTypeNameInput',
      'click #remove_all_instances_btn':'onRemoveAllInstancesBtn'

    },

    onAddObjectTypeBtn:function () {
      $("#new_object_type_name_form").removeClass('hidden');
      $("#new_object_type_name").val("Resource");
      $("#new_object_type_name").select();
    },

    onCancelNewObjectType:function () {
      $("#new_object_type_name_form").addClass('hidden');
    },

    onConfirmNewObjectTypeName:function () {
      var view = this;
      var object_type_name = $("#new_object_type_name").val();
      if (!_.isEmpty(object_type_name)) {
        this.model.clear();
        this.model.set({name:object_type_name});
        this.model.put(function (err, model) {
          debug("Result of creating new object type: ", err, model, view.model);
          if (err !== null && err.status == 409) {
            alert("Object type already exists.");
          } else {
            view.render();
          }
        });
        $("#new_object_type_name_form").addClass('hidden');
      }
    },

    onRemoveObjectTypeBtn:function () {
      var view = this;
      this.model.remove(function (err, model) {
        debug("Result of removing object type: ", err, model);
        view.model.set("name", '');
        view.render();
      });
    },

    onSaveProxyFunctionCodeBtn:function () {

      var code = $("#proxy_function_code").val();

      $("#proxy_function_code_error").text("");
      var proxy = null; // guard global scope
      try {

        var proxy_fun = eval(code);
        var result = proxy({value:123});
        debug("Proxy function self test", result);
        if (result.value != 123) {
          throw "invalid self-test result";
        }

        this.model.set("proxy_fun_code", code);
        this.model.put(function (err, model) {
          debug("Proxy code saved");
        });
      } catch (E) {
        debug("Error in proxy code: ", E);
        $("#proxy_function_code_error").text(E);
      } finally {
        proxy = null; // clean
      }
    },

    onCreateNewObjectInstanceBtn:function () {
      var view = this;
      try {
        var instance = JSON.parse($("#object_instance_json").val());
        this.cur_obj_inst.clear();
        this.cur_obj_inst.set("__objectType", this.model.get("name"));
        this.cur_obj_inst.set("app_id", this.app_id);
        this.cur_obj_inst.set(instance);
        delete this.cur_obj_inst.id;
        if (this.cur_obj_inst.get("__objectType") !== '') {
          debug("putting object instance: ", this.cur_obj_inst);
          this.cur_obj_inst.put(function (err, model) {
            debug("Result of putting object instance: ", err, model);
            view.loadObjectInstances();
            view.renderCurrentObjectInstance();
          });
        }

      } catch (E) {
        debug("Failed to parse object instance JSON");
        $("#object_instance_json_error").text(E);
      }

    },

    onEditSelectedObjectBtn:function () {
      var instance = Helpers.getSelectedRowData("#object_instances_tbl");
      if (instance !== null) {
        var instances = this.instances.where({_id: instance._id});
        if (instances.length > 0) {
          instance = instances[0].toJSON();
        }
        debug("Selected instance: ", instance);

        $("#object_instance_json").val(JSON.stringify(instance, null, 4));
      }

    },

    onRemoveSelectedObjectBtn:function () {
      var view = this;
      var instance = Helpers.getSelectedRowData("#object_instances_tbl");
      if (instance !== null) {

        this.cur_obj_inst.clear();
        instance.app_id = this.app_id;
        instance.__objectType = this.model.get("name");
        this.cur_obj_inst.set(instance);
        debug("Selected instance: ", this.cur_obj_inst, this.cur_obj_inst.isNew());
        this.cur_obj_inst.remove(function (err, model) {
          debug("Instance removed");
          view.loadObjectInstances();
        });
      }
    },

    onSaveObjectInstanceBtn:function () {
      var view = this;
      try {
        var instance = JSON.parse($("#object_instance_json").val());
        this.cur_obj_inst.clear();
        instance.app_id = this.app_id;
        instance.__objectType = this.model.get("name");
        this.cur_obj_inst.set(instance);
        debug("putting object instance: ", this.cur_obj_inst);
        if (this.cur_obj_inst.get("__objectType") !== '') {
          this.cur_obj_inst.put(function (err, model) {
            debug("Result of putting object instance: ", err, model);
            view.loadObjectInstances();
          });
        }

      } catch (E) {
        debug("Failed to parse object instance JSON");
        $("#object_instance_json_error").text(E);
      }
    },

    onIdFieldChange:function () {
      var id_field = $("#object_type_id_field").val();
      debug("Id field changed: ", id_field);
      this.model.set("id_field", id_field);
      this.model.put(function (err, model) {
        debug("Object type save result: ", model);
      });
    },

    onSaveObjectTypeRoutePatternBtn:function () {
      /// this.model.set("route_pattern")
    },

    onKeyPressedOnNewObjectTypeNameInput:function (event) {
      if (event.keyCode == 13) {
        this.onConfirmNewObjectTypeName();
      }
    },

    onRemoveAllInstancesBtn: function() {
      var view = this;
      this.instances.removeAll(function(err, result) {
        view.loadObjectInstances();
      });
    }
  });


  return view;
});