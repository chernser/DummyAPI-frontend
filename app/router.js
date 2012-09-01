define([
    // Application.
    "app",

    "plugins/backbone.marionette",

    //models/
    "models/applications",
    "models/application",

    "views/index"
],

    function (app, Marionette, ApplicationsCollection, ApplicationModel, views) {

        // Defining the application router, you can attach sub routers here.
        var Router = Marionette.AppRouter.extend({
            routes:{
                "":"index",
                "app/:id/:view":"showApplication"
            },

            index:function () {
                var collection = new ApplicationsCollection();
                collection.load(function(err, collection) {
                    var view = new views.viewClasses.applications({applications: collection});
                    app.main.show(view);
                });
            },

            showApplication:function (id, view) {
                debug("Showing application: ", id);
                var application_model = new ApplicationModel({id: id});

                application_model.load(function(err, model) {
                    var layoutAttributes = {model:application_model,
                        viewClass:views.viewClasses[view]
                    };

                    app.layout = new views.layoutClasses.application(layoutAttributes);
                    app.main.show(app.layout);
                });
            },

            navigate:function (fragment) {
                console.log("router navigate() " + fragment);
                Backbone.history.navigate(fragment, true);
            }
        });

        return Router;

    });
