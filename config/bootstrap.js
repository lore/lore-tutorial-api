/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var _ = require('lodash');
var userTweets = require('../tweets.json');
var moment = require('moment');

function createUsers() {
  return User.create([
    {
      nickname: 'ayla',
      authId: 'auth0|57f1e2ad68e2b55a013258cd',
      avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027069/a356e82a-88e1-11e6-87d8-e3e74f55c069.png'
    },
    {
      nickname: 'crono',
      authId: 'auth0|57f1e2bc5326643b67959d15',
      avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027070/a3659c76-88e1-11e6-8434-5d66c70956c7.png'
    },
    {
      nickname: 'frog',
      authId: 'auth0|57f1e2cf68e2b55a013258d6',
      avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027071/a36ef028-88e1-11e6-9756-5e35b6fed834.png'
    },
    {
      nickname: 'lucca',
      authId: 'auth0|57f1e2e05326643b67959d1a',
      avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027072/a36f0c7a-88e1-11e6-931e-7f67fe01367b.png'
    },
    {
      nickname: 'magus',
      authId: 'auth0|57f1e30368e2b55a013258df',
      avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027073/a36f67f6-88e1-11e6-9168-7687083cb994.png'
    },
    {
      nickname: 'marle',
      authId: 'auth0|57f1d0c55461dea8581fa42b',
      avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027074/a37105c0-88e1-11e6-9645-3e1af37671f7.png'
    },
    {
      nickname: 'robo',
      authId: 'auth0|57f1e30d68e2b55a013258e0',
      avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027075/a3719e2c-88e1-11e6-9abe-5186abc4b04d.png'
    }
  ]);
}

function getTweetsFor(user, offset) {
  var timestamp = moment();
  return userTweets[user.nickname].map(function(tweet) {
    return {
      user: user,
      text: tweet,
      createdAt: timestamp.subtract(3, 'hours').subtract(offset, 'minutes').toJSON()
    };
  });
}

module.exports.bootstrap = function(cb) {
  createUsers().then(function(users) {
    var ayla = _.find(users, {nickname: 'ayla'});
    var crono = _.find(users, {nickname: 'crono'});
    var frog = _.find(users, {nickname: 'frog'});
    var lucca = _.find(users, {nickname: 'lucca'});
    var magus = _.find(users, {nickname: 'magus'});
    var marle = _.find(users, {nickname: 'marle'});
    var robo = _.find(users, {nickname: 'robo'});

    var data = _.flatten([
      getTweetsFor(ayla, 0),
      getTweetsFor(marle, 1),
      getTweetsFor(frog, 2),
      getTweetsFor(lucca, 3),
      getTweetsFor(robo, 4),
      getTweetsFor(magus, 5),
      getTweetsFor(crono, 6)
    ]);

    return Tweet.create(data);
  }).then(function(tweets){
    cb();
  });
};
