define([
    "models/application",

    "backbone",
    "plugins/backbone.marionette"
], function (ApplicationModel, Backbone, Marionette) {

    var View = Marionette.ItemView.extend({
        template:'applications',

        initialize:function (attributes) {
            this.collection = attributes.applications;
        },

        onShow:function () {

            $("#applications_list li > a ").each(function (index, item) {
                var $item = $(item);
                var options = {
                    title:$item.text(),
                    content:$item.attr("desc"),
                    trigger:"hover"
                };
                $item.popover(options);

                $item.click(function () {
                    $(this).popover('destroy');
                    return true;
                });

            });

        },

        events:{
            'click #create_application_btn':'onCreateApplicationBtn'
        },

        onCreateApplicationBtn:function () {
            var application_name = $("#application_name").val();
            var application_description = $("#application_description").val();

            var application = new ApplicationModel({name:application_name, description: application_description});
            application.put(function (err, model) {
                debug("Application creation result: ", err, model);
                Backbone.history.navigate('app/' + model.get("id") + '/general', {trigger:true});
            });
        }

    });


    return View;
});