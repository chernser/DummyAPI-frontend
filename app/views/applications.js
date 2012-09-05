define([

    "models/application",

    "backbone",
    "plugins/backbone.marionette"


], function (ApplicationModel, Backbone, Marionette) {

    var View = Marionette.ItemView.extend({
        template: 'applications',

        initialize: function(attributes) {
            this.collection = attributes.applications;
        },



        events: {
            'click #create_application_btn' : 'onCreateApplicationBtn'

        },

        onCreateApplicationBtn: function () {
            var application_name = $("#application_name").val();

            var application = new ApplicationModel({name: application_name});
            application.put(function(err, model) {
                debug("Application creation result: ", err, model);
                Backbone.history.navigate('app/' + model.get("id") +'/general', {trigger: true});
            });
        }


    });


    return View;
});