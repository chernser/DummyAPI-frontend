define([

    "app",

    "backbone",
    "plugins/backbone.marionette",

    "underscore"
], function (App, Backbone, Marionette, _) {

    var API_HOST = 'http://localhost:8000';
    var API_PREFIX = '/api/1/';


    var BackendBaseModel = Backbone.Model.extend({
        idAttribute:'_id',

        url:function () {
            return [API_HOST, API_PREFIX, this.resourceUrl()].join('');
        },

        resourceUrl:function () {
            return '';
        },

        isNew:function () {
            return this.attributes.id === null || this.attributes.id === 0 || _.isUndefined(this.get("id"));
        },

        getId:function () {
            return this.isNew() ? '' : this.get("id");
        },

        load:function (callback) {
            this.fetch({
                success:function (model) {
                    debug("Model loaded", model);
                    if (_.isFunction(callback)) {
                        callback(null, model);
                    }

                },

                error:function (err) {
                    debug("Failed to load model", err);
                    if (_.isFunction(callback)) {
                        callback(err, null);
                    }
                }
            });
        },

        put:function (callback) {
            this.save(null, {
                success:function (model) {
                    debug("Model created", model);
                    if (_.isFunction(callback)) {
                        callback(null, model);
                    }
                },

                error:function (model, err) {
                    debug("Failed to create model", err);
                    if (_.isFunction(callback)) {
                        callback(err, null);
                    }

                }
            });

        },

        remove: function(callback) {
            this.destroy(null, {
                success: function(model) {
                    if (_.isFunction(callback)) {
                        callback(null, true);
                    }

                },

                error: function(model, err) {
                    debug("Failed to delete model: ", model, err);

                }

            });
        },

        /**
         * I've called it action
         */
        doAction:function (action, args, callback) {

            $.ajax({
                type:'POST',
                dataType:'json',
                contentType:'application/json',
                data:JSON.stringify(args),
                url:this.url() + action,

                success:function (result) {
                    if (_.isFunction(callback)) {
                        callback(null, result);
                    }
                },

                error:function (xhr) {
                    if (_.isFunction(callback)) {
                        callback('invalid', null);
                    }
                }

            });
        }
    });

    var BackendBaseCollection = Backbone.Collection.extend({

        url:function () {
            return [API_HOST, API_PREFIX, this.collectionUrl()].join('');
        },

        collectionUrl:function () {
            return '';
        },

        load:function (callback) {
            this.fetch({
                success:function (model) {
                    debug("Model loaded", model);
                    if (_.isFunction(callback)) {
                        callback(null, model);
                    }

                },

                error:function (err) {
                    debug("Failed to load model", err);
                    if (_.isFunction(callback)) {
                        callback(err, null);
                    }
                }
            });
        }

    });


    return {Model:BackendBaseModel, Collection:BackendBaseCollection};
});