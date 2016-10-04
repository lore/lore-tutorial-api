/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function(req, res) {
    res.json({
      tweets: req.baseUrl + '/tweets',
      users: req.baseUrl + '/users'
    })
  }

};

