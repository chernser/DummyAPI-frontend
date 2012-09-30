define([
  "app",
  "plugins/backbone.marionette",
  "jquery",
  "underscore",
  "helpers"
], function(App, Marionette, $, _, Helpers) {

  var MethodView = Marionette.ItemView.extend({
    template:'documentation-method'

  });

  var CollectionView = Marionette.CollectionView.extend({
     itemView: MethodView
  });


  return CollectionView;
});