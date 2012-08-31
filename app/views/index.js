define([
    // Layouts
    "views/application",

    // Views
    "views/applications",
    "views/general",
    "views/objects",
    "views/notifications",
    "views/auth"
], function (Application, Applications, General, Objects, Notifications, Auth) {

    var ViewClasses = {
        'applications': Applications,
        'general':General,
        'objects':Objects,
        'notifications':Notifications,
        'auth' : Auth

    };

    var LayoutClasses = {
        'application':Application
    };

    return {
        viewClasses: ViewClasses,
        layoutClasses: LayoutClasses
    };
});