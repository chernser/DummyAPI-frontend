define([

    "models/backend"
], function(Backend) {

    var collectionModel = Backend.Collection.extend({

        initialize: function(application_model) {
            this.application_model = application_model;

        },

        collectionUrl: function() {
            return 'app/' + this.application_model.get("id") + '/user';
        }

    });


    return collectionModel;
});