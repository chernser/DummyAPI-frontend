define([
  "models/backend",
  "underscore"
], function (Backend, _) {

  var Documentation = {};

  Documentation.MethodDesc = Backend.Model.extend({

    defaults: {
      method: "GET"
    }
  });

  Documentation.Methods = Backend.Collection.extend({
    model: Documentation.MethodDesc
  });

  return Documentation;
});