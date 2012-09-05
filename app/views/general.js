define([

    "helpers",
    "backbone",
    "plugins/backbone.marionette"

], function (Helpers, Backbone, Marionette) {

    var view = Marionette.ItemView.extend({
        template:"general",

        initialize:function (attributes) {
            debug("Initialize view general");
            this.model = attributes.model;

            var view = this;
            this.model.on('change', function () {
                view.render();
            });
        },


        onShow: function() {
            $("#confirmation_code").text(Helpers.generateCode());
        },

        events:{

            'click #renew_access_token_btn':'renewAccessToken',
            'click #save_application_description_btn':'onSaveApplicationDescriptionBtn',
            'click #delete_application_btn' : 'onDeleteApplicationBtn'

        },

        renewAccessToken:function () {
            var that = this;
            this.model.renewAccessToken();
        },

        onSaveApplicationDescriptionBtn:function () {

            this.model.set("description", $("#application_description").val());
            this.model.put(function(err, model) {
                debug("Description save result");
            });
        },

        onDeleteApplicationBtn: function() {
            debug("removing application!!");
            if ($("#confirmation_code").text() == $("#delete_application_confirmation_code").val()) {
                this.model.remove(function(err, result ) {
                    debug("application remove result", err, result);
                    Backbone.history.navigate("/", {trigger: true});
                });

            }
        }
    });


    return view;
});