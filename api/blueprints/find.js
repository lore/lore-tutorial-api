/**
 * Module dependencies
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _ = require('lodash');

/**
 * Find Records
 *
 *  get   /:modelIdentity
 *   *    /:modelIdentity/find
 *
 * An API call to find and return model instances from the data adapter
 * using the specified criteria.  If an id was specified, just the instance
 * with that unique id will be returned.
 *
 * Optional:
 * @param {Object} where       - the find criteria (passed directly to the ORM)
 * @param {Integer} limit      - the maximum number of records to send back (useful for pagination)
 * @param {Integer} skip       - the number of records to skip (useful for pagination)
 * @param {String} sort        - the order of returned records, e.g. `name ASC` or `age DESC`
 * @param {String} callback - default jsonp callback param (i.e. the name of the js function returned)
 */

module.exports = function findRecords (req, res) {

  // Look up the model
  var Model = actionUtil.parseModel(req);

  req.options.criteria = req.options.criteria || {
    blacklist: ['limit', 'skip', 'sort', 'populate', 'page', 'perPage']
  };

  // Get all query paramters
  var params = req.params.all();
  var page = params.page ? Number(params.page) : undefined;
  var perPage = params.perPage ? Number(params.perPage) : undefined;
  var populate = params.populate ? params.populate.split(',') : [];

  Model.pagify('data', {
    findQuery: actionUtil.parseCriteria(req),
    sort: params.sort ? [params.sort] : ['createdAt DESC'],
    // sort: params.sort ? [params.sort] : [],
    page: page,
    perPage: perPage,
    populate: populate
  }).then(function(result){
    var matchingRecords = result.data;

    // Only `.watch()` for new instances of the model if
    // `autoWatch` is enabled.
    if (req._sails.hooks.pubsub && req.isSocket) {
      Model.subscribe(req, matchingRecords);
      if (req.options.autoWatch) { Model.watch(req); }
      // Also subscribe to instances of all associated models
      _.each(matchingRecords, function (record) {
        actionUtil.subscribeDeep(req, record);
      });
    }

    res.ok(result);
  }).catch(function(err){
    res.serverError(err);
  });
};
