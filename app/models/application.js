define([

    "backbone",
    "plugins/backbone.marionette"

], function (Backbone, Marionette) {

    var model =  Backbone.Model.extend({

        defaults: {
            id: 0

        }



    });


    return model;

});