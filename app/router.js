define([
    // Application.
    "app",

    "plugins/backbone.marionette",

    //models
    "models/application",

    "views/index"
],

    function (app, Marionette, ApplicationModel, views) {

        // Defining the application router, you can attach sub routers here.
        var Router = Marionette.AppRouter.extend({
            routes:{
                "":"index",
                "app/:id/:view":"showApplication"
            },

            index:function () {
                var view = new views.viewClasses.applications({});
                app.main.show(view);
            },

            showApplication:function (id, view) {
                debug("Showing application: ", id);
                var application_model = new ApplicationModel();
                var layoutAttributes = {model:application_model,
                    viewClass:views.viewClasses[view]
                };
                var layout = new views.layoutClasses.application(layoutAttributes);
                app.main.show(layout);
            },

            navigate:function (fragment) {
                console.log("router navigate() " + fragment);
                Backbone.history.navigate(fragment, true);
            }
        });

        return Router;

    });
