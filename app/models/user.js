define([
    "models/backend"
], function (Backend) {

    var User = Backend.Model.extend({
        idAttribute: 'id',

        defaults: {
            user_name: "user_0x",
            password: 's3cr3t',
            groups: ["user"],
            access_token: "111111122222223333333"
        },

        initialize: function(attributes) {
            this.attributes = attributes;
        },

        resourceUrl: function() {
            return 'app/' + this.get("app_id") + '/user/' + this.getId();
        }


    });

    return User;
});