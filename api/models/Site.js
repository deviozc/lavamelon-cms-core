/**
 * Site.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
    schema:true,
    attributes: {
        domain: {
            type: 'string',
            unique: true,
            required: true
        },
        owners: {
            collection: "user",
            via: "sites"
        },
        articles: {
            collection: "article",
            via: "site"
        },
        file: {
            collection: "file",
            via: "site"
        },
        property: {
            collection: "property",
            via: "site"
        },
        assetPath: {
            type: 'string',
            required: true
        }
    },
    getAssetPath: function(domain, cb){
        Site
        .findOne({domain: domain})
        .exec(function(err, site){
            if(err) return cb(err);
            return cb(null, site.assetPath);
        });;
    }
};