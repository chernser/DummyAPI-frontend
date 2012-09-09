define([

  "models/user",
  "models/users",
  "models/user_group",
  "models/user_groups",

  "backbone",
  "plugins/backbone.marionette",

  "jquery",
  "jqgrid",

  "helpers"

], function (User, Users, UserGroup, UserGroups, Backbone, Marionette, $, Grid, Helpers) {

  // Init slick plugin
  var view = Marionette.ItemView.extend({
    template:"auth",

    initialize:function (attributes) {
      debug("Initialize view dummy auth");

      var view = this;
      this.users = new Users(attributes.model);
      this.current_user = new User({app_id:attributes.model.getId()});

      this.user_groups = new UserGroups(attributes.model);
      this.current_user_group = new UserGroup({app_id:attributes.model.getId()});

      this.object_types = attributes.model.get("object_types");
    },

    onShow:function () {
      $('#auth_tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
      });

      var resource_selector = $("#resource_selector");
      var object_type_name = null;
      resource_selector.append("<option></option>");
      for (var index in this.object_types) {
        object_type_name = this.object_types[index].name;
        resource_selector.append("<option>" + object_type_name + "</option>");
      }

      this.initUsersTable();
      this.initGroupsTable();

      this.reloadUsers();
      this.renderCurrentUser();

      this.reloadUserGroups();
      this.renderCurrentUserGroup();
    },

    initUsersTable:function () {

      var fields = {
        id:{name:"id", width:50},
        user_name:{name:"Name", width:120},
        password:{name:"Password", width:120},
        resource:{name:"Resource", width:120},
        resource_id:{name:"Resource Id", width:120},
        access_token:{name:"Access Token", width:120},
        groups:{name:"Groups"}
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

    reloadUserGroups:function () {
      this.user_groups.load(function (err, user_groups) {
        Helpers.setGridData("#groups", user_groups.toJSON());
      });
    },

    renderCurrentUser:function () {
      $("#user_id").text(this.current_user.getId());
      Helpers.renderModel("#user_edit_form", this.current_user);
    },

    renderCurrentUserGroup:function () {
      $("#user_group_id").text(this.current_user_group.getId());
      Helpers.renderModel("#user_group_edit_form", this.current_user_group);
    },

    events:{
      'change #user_edit_form input, select':'userFormInputChange',
      'change #user_group_edit_form input':'userGroupFormInputChange',
      'click #create_user_btn':'createUserBtn',
      'click #save_user_btn':'saveUserBtn',
      'click #edit_selected_user_btn':'onEditSelectedUserBtn',
      'click #remove_selected_user_btn':'onRemoveSelectedUserBtn',

      'click #edit_selected_user_group_btn':'onEditSelectedUserGroupBtn',
      'click #remove_selected_user_group_btn':'onRemoveSelectedUserGroupBtn',
      'click #create_user_group_btn':'onCreateUserGroupBtn',
      'click #save_user_group_btn':'onSaveUserGroupBtn'

    },


    userFormInputChange:function (event) {
      Helpers.handleInputChanges(event, this.current_user);
      debug(this.current_user);
    },

    userGroupFormInputChange:function (event) {
      Helpers.handleInputChanges(event, this.current_user_group);
      debug(this.current_user_group);
    },

    createUserBtn:function () {
      var view = this;
      delete this.current_user.id;
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
    },

    onEditSelectedUserGroupBtn:function () {
      var group_to_edit = Helpers.getSelectedRowData('#groups');
      if (group_to_edit !== null) {
        this.current_user_group.set(group_to_edit);
        this.renderCurrentUserGroup();
      }

    },

    onRemoveSelectedUserGroupBtn:function () {
      var view = this;
      var group_to_delete = Helpers.getSelectedRowData("#groups");
      if (group_to_delete !== null) {
        this.current_user_group.set(group_to_delete);
        this.current_user_group.remove(function (err, resutl) {
          view.reloadUserGroups();
        });
      }
    },

    onCreateUserGroupBtn:function () {
      var view = this;
      delete this.current_user_group.id;
      this.current_user_group.put(function (err, result) {
        view.reloadUserGroups();
        view.renderCurrentUserGroup();
      });
    },

    onSaveUserGroupBtn:function () {
      var view = this;
      this.current_user_group.put(function (err, result) {
        view.reloadUserGroups();
      });
    }
  });


  return view;
});