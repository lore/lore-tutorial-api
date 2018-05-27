/**
 * TodoController
 *
 * @description :: Server-side logic for managing Todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

module.exports = {

  create: function createRecord (req, res) {

    // Create data object (monolithic combination of all parameters)
    // Omit the blacklisted params (like JSONP callback param, etc.)
    var data = actionUtil.parseValues(req);

    // Set the current user as the tweet author
    data.user = req.user.id;

    // Create new instance of model using data from params
    Tweet.create(data).exec(function created (err, newInstance) {

      // Differentiate between waterline-originated validation errors
      // and serious underlying issues. Respond with badRequest if a
      // validation error is encountered, w/ validation info.
      if (err) return res.negotiate(err);

      // If we have the pubsub hook, use the model class's publish method
      // to notify all subscribers about the created item
      if (req._sails.hooks.pubsub) {
        if (req.isSocket) {
          Tweet.subscribe(req, newInstance);
          Tweet.introduce(newInstance);
        }
        // Make sure data is JSON-serializable before publishing
        var publishData = _.isArray(newInstance) ?
          _.map(newInstance, function(instance) {return instance.toJSON();}) :
          newInstance.toJSON();
        Tweet.publishCreate(publishData, !req.options.mirror && req);
      }

      // Send JSONP-friendly response if it's supported
      res.created(newInstance);
    });
  }

};
