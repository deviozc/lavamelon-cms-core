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
        }
    }
};