define([
    "models/backend"
], function (Backend) {

    var ApplicationsModel = Backend.Collection.extend({

        collectionUrl: function() {
            return 'app/';
        }

    });


    return ApplicationsModel;
});