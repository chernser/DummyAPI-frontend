define([

    "models/backend"
], function(Backend) {

    var model = Backend.Model.extend({

        idAttribute: '_id',

        initialize: function(attributes) {
            this.attributes = attributes;
        },

        resourceUrl: function() {
            return 'app/' + this.get("app_id") + '/object/' + this.get("__objectType") + '/' + this.getId();
        }


    });

    return model;
});