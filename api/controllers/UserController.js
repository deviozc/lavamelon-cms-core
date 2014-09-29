/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');
var getPublicUser = function(data) {
    var sites = data.sites.map(function(element) {
        return {
            domain: element.domain
        };
    });
    return {
        email: data.email,
        fullName: data.fullName,
        sites: sites
    };
}
module.exports = {
    _config: {
        actions: false,
        shortcuts: false,
        rest: true,
        pluralize: true
    },
    login: function(req, res) {
        if(!req.body.email) {
            res.notFound('User not found');
        }
        User.findOne({
            email: req.body.email
        }).populate('sites').exec(function(err, user) {
            if(err) res.serverError('DB error');
            if(user) {
                bcrypt.compare(req.body.password, user.password, function(err, match) {
                    if(err) res.serverError('Server error');
                    if(match) {
                        // password match
                        req.session.userId = user.id;
                        req.session.authenticated = true;
                        res.json(getPublicUser(user));
                    } else {
                        // invalid password
                        if(req.session.userId) {
                            req.session.authenticated = false;
                            req.session.userId = null;
                        }
                        res.badRequest('Invalid password');
                    }
                });
            } else {
                res.notFound('User not found');
            }
        });
    },
    logout: function(req, res) {
        req.session.userId = null;
        req.session.authenticated = false;
        res.ok("Successfully logged out");
    },
    me: function(req, res) {
        if(!req.session.userId) {
            res.notFound('User not found');
        }
        User.findOne({
            id: req.session.userId
        }).populate('sites').exec(function(err, data) {
            res.json(getPublicUser(data));
        });
    }
};