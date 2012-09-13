define([

    "models/backend"
], function (Backend) {

    var DEFAULT_PROXY_FUNCTION_CODE = "function proxy(resource) { \n " +
        "     return resource;\n" +
        "}";

    var model = Backend.Model.extend({

        idAttribute: 'name',

        defaults : {
            proxy_fun_code: DEFAULT_PROXY_FUNCTION_CODE
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
            return 'app/' + this.app_id + '/object_type/' + this.getId();
        }
    });

    return model;
});