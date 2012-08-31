define([
    // Application.
    "app",

    "plugins/backbone.marionette",

    //models
    "models/application",

    // Views
    "views/applications",
    "views/application"
],

    function (app, Marionette, ApplicationModel, ApplicationsView, ApplicationLayout) {

        // Defining the application router, you can attach sub routers here.
        var Router = Marionette.AppRouter.extend({
            routes:{
                "":"index",
                "app/:id/:view":"showApplication"
            },

            index:function () {
                var view = new ApplicationsView({});
                app.main.show(view);
            },

            showApplication:function(id, view) {
                debug("Showing application: ", id);
                var application_model = new ApplicationModel();
                var layout = new ApplicationLayout({model: application_model});
                app.main.show(layout);
            },

            navigate: function(fragment){
                console.log("router navigate() " + fragment);
                Backbone.history.navigate(fragment, true);
            }
        });

        return Router;

    });
