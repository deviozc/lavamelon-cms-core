/**
 * User.js
 *
 * @description :: User model
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt');
var _hashPassword = function(values, cb) {
    
    if(!values.password){
        return cb();
    }
    // Encrypt password
    bcrypt.hash(values.password, 10, function(err, hash) {
        if(err) return cb(err);
        values.password = hash;
        //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
        cb();
    });
};
module.exports = {
    schema: true,
    attributes: {
        email: {
            type: 'string',
            unique: true,
            required: true
        },
        password: {
            type: 'string',
            required: true,
            minLength: 6
        },
        fullName: {
            type: 'string',
            required: true
        },
        sites: {
            collection: "site",
            via: "owners",
            dominant: true
        },
        admin: {
            type: 'boolean',
            defaultsTo: false
        }
    },
    // Lifecycle Callbacks
    beforeCreate: function(values, cb) {
        _hashPassword(values, cb);
    }
};