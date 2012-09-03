define([

    "models/object_type",
    "models/object_types",

    "backbone",
    "plugins/backbone.marionette",
    "underscore",

    "helpers"

], function (ObjectType, ObjectTypes, Backbone, Marionette, _, Helpers) {


    var view = Marionette.ItemView.extend({
        template:"objects",

        initialize:function (attributes) {
            debug("Initialize view objects");

            this.app_id = attributes.model.getId();
            this.model = new ObjectType({name: "none"});
            this.model.setAppId(this.app_id);
            this.object_types = new ObjectTypes(attributes.model);


        },


        loadObjectTypes: function() {
            var view = this;
            var resource_nav_handler = function(event) {
                view.model.clear();
                view.model.set($(this).data().attributes);
                view.render();
                event.preventDefault();
                return false;
            };

            this.object_types.load(function(err, model) {
                for (var index in model.models) {
                    var object_type = model.models[index];
                    debug(">> object type: ", object_type);
                    var nav_item = $("<li><a href='#'>" + object_type.get("name") + "</a></li>");
                    nav_item.data(object_type);
                    nav_item.click(resource_nav_handler);
                    $("#object_types_nav_list").prepend(nav_item);

                }
            });
        },

        onShow:function () {
            $('#object_tabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });

            this.renderCurrentObjectType();
        },

        onRender:function() {
            this.loadObjectTypes();
            this.renderCurrentObjectType();
        },

        renderCurrentObjectType: function() {
            var fields = {
                id: {name: "Id"}
            };

            Helpers.showGrid("#object_instances_tbl", "", fields, {dataType: "local"});

        },

        events:{
            'click #add_object_type_btn': 'onAddObjectTypeBtn',
            'click #cancel_new_object_type': 'onCancelNewObjectType',
            'click #confirm_new_object_type_name': 'onConfirmNewObjectTypeName'

        },

        onAddObjectTypeBtn: function() {
            $("#new_object_type_name_form").removeClass('hidden');
            $("#new_object_type_name").val("Resource");
            $("#new_object_type_name").select();
        },

        onCancelNewObjectType: function() {
            $("#new_object_type_name_form").addClass('hidden');
        },

        onConfirmNewObjectTypeName: function() {
            var view = this;
            var object_type_name = $("#new_object_type_name").val();
            if (!_.isEmpty(object_type_name)) {
                this.model.clear();
                this.model.set({name: object_type_name});
                this.model.put(function(err, model) {
                    debug("Result of creating new object type: ", err, model);
                    view.render();
                });
                $("#new_object_type_name_form").addClass('hidden');
            }
        }


    });


    return view;
});