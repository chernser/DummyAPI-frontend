define([
    "models/backend",
            "backbone",
    "plugins/backbone.marionette",
    "underscore"

], function (Backend, Backbone, Marionette, _) {

    var model =  Backend.Model.extend({

        idAttribute: 'id',

        defaults: {
            name: "My Sample "
        },


        resourceUrl: function() {
            return 'app/' + this.getId();
        },


        renewAccessToken: function(callback) {
            var that = this;
            this.doAction('new_access_token', {}, function(err, result) {
                if (result !== null) {
                    that.set('access_token', result.access_token);
                }

                if (_.isFunction(callback)) {
                    callback(err, result);
                }
            });
        }


    });


    return model;

});