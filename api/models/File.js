/**
 * File.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
    attributes: {
        filename: {
            type: "string",
            required: true
        },
        relativePath: {
            type: "string",
            required: true
        },
        contentType: {
            type: "string",
            required: true
        },
        site: {
            model: 'site'
        }
    },
    populateFileUrls: function(opts, cb) {
        var files = opts.files;
        files.forEach(function(element) {
            element.url = sails.config.constants.baseAssetsURL + element.relativePath;
            delete element.site;
        });
        return cb(null, files);
    },
    findBySiteDomain: function(opts, cb) {
        var domain = opts.domain;
        var condition = {};
        if(opts.imageOnly) {
            condition["contentType"] = /image.*/;
        }
        File.find(condition).populate('site', {
            domain: domain
        }).exec(function(err, files) {
            if(err) return cb(err);
            
            return File.populateFileUrls({files: files}, cb);
        });
    },
    populateArrayOfFiles: function(opts, cb) {
        var fileIds = opts.files;
        File.find({id: {$in: fileIds}}).exec(function(err, files){
            return File.populateFileUrls({files: files}, cb);
        });
    }
};