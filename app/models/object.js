define([

    "models/backend"
], function(Backend) {

    var model = Backend.Model.extend({

        idAttribute: '_id',

        resourceUrl: function() {
            return 'app/' + this.get("app_id") + '/object/' + this.get("__object_type") + '/' + this.getId();
        }


    });

    return model;
});