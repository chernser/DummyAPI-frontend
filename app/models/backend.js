define([

  "app",

  "backbone",
  "plugins/backbone.marionette",

  "helpers",
  "underscore"
], function (App, Backbone, Marionette, Helpers, _) {

  var API_PREFIX = '/api/1/';
  var BackendBaseModel = Backbone.Model.extend({
    idAttribute:'_id',

    url:function () {
      var url = ['http://', App.config.backend, API_PREFIX, this.resourceUrl()].join('');
      debug("backend url: ", url);
      return url;
    },

    resourceUrl:function () {
      return '';
    },

    /*
     isNew:function () {
     return this.id === null || this.id === 0 || _.isUndefined(this.get("id"));
     },
     */

    getId:function () {
      return this.isNew() ? '' : this.id;
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

    remove:function (callback) {
      this.destroy({
        success:function (model) {
          debug("model removed");
          if (_.isFunction(callback)) {
            callback(null, true);
          }
        },

        error:function (model, err) {
          debug("Failed to delete model: ", model, err);
          if (_.isFunction(callback)) {
            callback(null, false);
          }
        }

      });
    },

    /**
     * I've called it action
     */
    doAction:function (action, args, opts, callback) {
      callback = _.isFunction(opts) ? opts : callback;
      opts = _.isFunction(opts) ? null: opts;
      Helpers.doHttpRequest(this.url() + '/' + action, args, opts, callback);
    }
  });

  var BackendBaseCollection = Backbone.Collection.extend({

    url:function () {
      return ['http://', App.config.backend, API_PREFIX, this.collectionUrl()].join('');
    },

    collectionUrl:function () {
      return '';
    },

    load:function (callback) {
      var self = this;
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

    removeAll:function (callback) {
      Helpers.doHttpRequest(this.url(), null, {method: 'DELETE'}, callback);
    }

  });


  return {Model:BackendBaseModel, Collection:BackendBaseCollection};
});