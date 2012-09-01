define([
    // Layouts
    "views/application",

    // Views
    "views/applications",
    "views/general",
    "views/objects",
    "views/notifications",
    "views/auth",
    "views/application_upper_context"
], function (Application, Applications, General, Objects, Notifications, Auth, ApplicationUpperContext) {

    var ViewClasses = {
        'applications': Applications,
        'general':General,
        'objects':Objects,
        'notifications':Notifications,
        'auth' : Auth,
        'app_upper_context' : ApplicationUpperContext

    };

    var LayoutClasses = {
        'application':Application
    };

    var Views = {
        viewClasses: ViewClasses,
        layoutClasses: LayoutClasses
    };

    debug(">>>>> ", Views);

    return Views;
});