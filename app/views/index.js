define([
    // Layouts
    "views/application",

  // Views
  "views/applications",
  "views/general",
  "views/objects",
  "views/notifications",
  "views/auth",
  "views/application_upper_context",
  "views/static_routes",
  "views/documentation"
], function (Application, Applications, General, Objects, Notifications, Auth, ApplicationUpperContext, StaticRoutes, Documentation) {

  var ViewClasses = {
    'applications':Applications,
    'general':General,
    'objects':Objects,
    'notifications':Notifications,
    'auth':Auth,
    'app_upper_context':ApplicationUpperContext,
    'static_routes':StaticRoutes,
    'documentation' : Documentation
  };

  var LayoutClasses = {
    'application':Application
  };

  var Views = {
    viewClasses:ViewClasses,
    layoutClasses:LayoutClasses
  };

  return Views;
});