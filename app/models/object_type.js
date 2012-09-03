define([

    "models/backend"
], function (Backend) {

    var model = Backend.Model.extend({

        idAttribute: 'name',

        defaults : {

        },

        initialize:function (attributes) {
            this.attributes = attributes;
        },

        isNew:function () {
            return !this.has("app_id");
        },

        setAppId: function(app_id) {
            this.app_id = app_id;
        },

        resourceUrl:function () {
            debug("application id: ", this.getId(), this);
            return 'app/' + this.app_id + '/object_type/' + this.getId();
        }
    });

    return model;
});