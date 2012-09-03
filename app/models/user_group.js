define([

    "models/backend"
], function(Backend) {

    var model = Backend.Model.extend({
        idAttribute: 'id',

        defaults: {
            name: "none_name"
        },

        initialize: function(attributes) {
            this.attributes = attributes;
        },

        resourceUrl: function(){
            return 'app/' + this.get("app_id") + '/user_group/' + this.getId();
        }
    });


    return model;
});