define([

    "models/user",
    "models/users",

    "backbone",
    "plugins/backbone.marionette",

    "jquery",
    "jqgrid",

    "helpers"

], function (User, Users, Backbone, Marionette, $, Grid, Helpers) {

    // Init slick plugin
    var view = Marionette.ItemView.extend({
        template:"auth",

        initialize:function (attributes) {
            debug("Initialize view dummy auth");

            var view = this;
            this.users = new Users(attributes.model);
            this.current_user = new User({app_id:attributes.model.getId()});
        },

        onShow:function () {
            $('#auth_tabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });

            this.initUsersTable();
            this.initGroupsTable();

            this.reloadUsers();
            this.renderCurrentUser();
        },

        initUsersTable:function () {

            var fields = {
                id:{name:"id"},
                user_name:{name:"Name"},
                password:{name:"Password"},
                access_token:{name:"Access Token"},
                groups: {name: "Groups"}
            };

            Helpers.showGrid("#users", "", fields, {datatype:"local"});
        },

        initGroupsTable:function () {
            var fields = {
                id:{name:"id"},
                name:{name:"Name"}
            };

            Helpers.showGrid("#groups", "", fields, {datatype:"local"});
        },

        reloadUsers:function () {
            this.users.load(function (err, users) {
                Helpers.setGridData("#users", users.toJSON());
            });
        },

        renderCurrentUser:function () {
            $("#user_id").text(this.current_user.getId());
            Helpers.renderModel("#user_edit_form", this.current_user);
        },

        events:{
            'change #user_edit_form input':'inputChanged',
            'click #create_user_btn':'createUserBtn',
            'click #save_user_btn':'saveUserBtn',
            'click #edit_selected_user_btn':'onEditSelectedUserBtn',
            'click #remove_selected_user_btn':'onRemoveSelectedUserBtn'
        },


        inputChanged:function (event) {
            Helpers.handleInputChanges(event, this.current_user);
            debug(this.current_user);
        },


        createUserBtn:function () {
            var view = this;
            delete this.current_user.attributes.id;
            this.current_user.put(function (err, model) {
                view.reloadUsers();
                view.renderCurrentUser();
            });
        },

        saveUserBtn:function () {
            var view = this;
            this.current_user.put(function (err, model) {
                view.reloadUsers();
            });
        },

        onEditSelectedUserBtn:function () {
            var user_to_edit = Helpers.getSelectedRowData('#users');
            if (user_to_edit !== null) {
                this.current_user.set(user_to_edit);
                this.renderCurrentUser();
            }
        },

        onRemoveSelectedUserBtn:function () {
            var view = this;
            var user_to_delete = Helpers.getSelectedRowData('#users');
            if (user_to_delete !== null) {
                this.current_user.set(user_to_delete);
                this.current_user.remove(function (err, result) {
                    view.reloadUsers();
                });
            }
        }


    });


    return view;
});