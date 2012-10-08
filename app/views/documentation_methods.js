define([
  "app",
  "plugins/backbone.marionette",
  "jquery",
  "underscore",
  "helpers"
], function (App, Marionette, $, _, Helpers) {

  var EditFieldDescriptionView = Marionette.ItemView.extend({
    template: 'documentation-method-field-edit',

    events: {
      'click #done_field_desc_edit_btn': 'onDoneFieldDescEditBtn'
    },

    onDoneFieldDescEditBtn: function () {
      debug("Field desc edit is done");
    },

    onRender: function() {
      // TODO: unwrapping, but why wrapped into div???
      this.setElement(this.el.childNodes[0]);
    }
  });

  var EditResultCodeDescriptionView = Marionette.ItemView.extend({
    template: 'documentation-method-result-edit'
  });

  var MethodView = Marionette.ItemView.extend({
    template: 'documentation-method',
    field_desc_table: '#fields_desc_table',

    onRender: function () {
      debug("Showing method view");
      this.showEditFieldDescriptionView();
    },

    showEditFieldDescriptionView: function (field) {
      debug("showEditFieldDescriptionView: ", field);
      var edit_view = new EditFieldDescriptionView();
      var tbody = this.$el.find(this.field_desc_table + " tbody");
      edit_view.render();

      if (field) {
        var field_desc = this.$el.find("#field_desc_" + field);
        debug("field desc: ", field_desc);
        field_desc.replaceWith(edit_view.$el.detach());
      } else {
        // just append to tbody for new field description
        tbody.append(edit_view.el);
      }
    },

    events: {
      'click .icon-edit' : 'onEditFieldBtn'
    },

    onEditFieldBtn: function(e) {
      debug($(e.target));
      var field = $(e.target).attr("field");

      if (!_.isEmpty(field)) {
        debug("editing field: ", field);
        this.showEditFieldDescriptionView(field);
      }
    }
  });

  var CollectionView = Marionette.CollectionView.extend({
    itemView: MethodView
  });


  return CollectionView;
});