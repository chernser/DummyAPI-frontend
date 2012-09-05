define([


    "models/backend"
], function(Backend) {

    var collection  = Backend.Collection.extend({

        initialize: function(application_model) {
            this.application_model = application_model;
        },

        collectionUrl: function() {
            return 'app/' + this.application_model.getId() + '/object_type/';
        }

    });

    return collection;

});