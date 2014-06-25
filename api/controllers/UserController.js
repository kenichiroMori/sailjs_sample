/**
 * UserController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */

module.exports = {

  // This loads the sign-up page --> new.ejs
  'new': function(req, res) {
    Master.find().sort('id ASC').done(function(err, masters) {
      // Error handling
      if (err) {
        return console.log(err);
      }

      res.view({
        masters:masters
      });
    });
  },

  create: function(req, res, next) {

    // var userObj = {
    //   name: req.param('name'),
    //   // title: req.param('title'),
    //   email: req.param('email'),
    //   bet: req.param('bet'),
    //   // password: req.param('password'),
    //   confirmation: req.param('confirmation')
    // }

    // Create a User with the params sent from 
    // the sign-up form --> new.ejs
    User.create(req.params.all(), function userCreated(err, user) {

      // // If there's an error
      // if (err) return next(err);

      if (err) {
        console.log(err);
        // req.session.flash = {
        //   err: err
        // }

        // If error redirect back to sign-up page
        return res.redirect('/user/new');
      }

      res.redirect('/user/show/' + user.id);
    });
  },

  // render the profile view (e.g. /views/show.ejs)
  show: function(req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();

      Master.find().sort('id ASC').done(function(err, masters) {
        if (err) return next(err);
        if (!user) return next();

        res.view({
          user: user,
          masters: masters
        });
      });
    });
  },

  index: function(req, res, next) {

    // Get an array of all users in the User collection(e.g. table)
    User.find(function foundUsers(err, users) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        users: users
      });
    });
  },

  ranking: function(req, res, next) {

    // Get an array of all users in the User collection(e.g. table)
    Ranking.find().sort('score DESC').done(function(err, rankings) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        rankings: rankings
      });
    });
  },


  // render the edit view (e.g. /views/edit.ejs)
  edit: function(req, res, next) {

    // Find the user from the id passed in via params
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next('User doesn\'t exist.');

      Master.find().sort('id ASC').done(function(err, masters) {
        // Error handling
        if (err) {
          return console.log(err);
        }

        res.view({
          user: user,
          masters:masters
        });
      });
    });
  },

  // process the info from edit view
  update: function(req, res, next) {

    var userObj = {
      name: req.param('name'),
      bet: req.param('bet'),
      email: req.param('email')
    }

    User.update(req.param('id'), userObj, function userUpdated(err) {
      if (err) {
        return res.redirect('/user/edit/' + req.param('id'));
      }

      res.redirect('/user/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {

    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);

      if (!user) return next('User doesn\'t exist.');

      User.destroy(req.param('id'), function userDestroyed(err) {
        if (err) return next(err);
      });

      res.redirect('/user');

    });
  },

};
