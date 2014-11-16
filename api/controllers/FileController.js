/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require("fs");

module.exports = {
    _config: {
        actions: true,
        shortcuts: false,
        rest: true,
        pluralize: true
    },
    upload: function(req, res){
        if(req.file("file")._files.length === 0){
            res.badRequest("Missing File");
        }
        var filename = req.file("file")._files[0].stream.filename;
        res.setTimeout(sails.config.constants.uploadTimeout);
        async.waterfall([
            function(callback){
                Site.getAssetPath(req.body.domain, callback);
            },
            
            function(path, cb){
                req.file('file')
                .upload({
                    maxBytes: sails.config.constants.uploadMaxBytes,
                    dirname: sails.config.constants.baseAssetsDirectory + path,
                    saveAs: filename
                }, function (err, uploadedFiles){
                    cb(err, uploadedFiles, path)
                })
            },
            function(uploadedFiles, path, cb){
                uploadedFiles.forEach(function(element){
                    console.log(element);
                    File
                    .create({filename: filename, relativePath: path + "/" + filename, contentType: element.type, site: req.site})
                    .exec(function(err, created){
                        cb(err, created);
                    });
                });
            }
        ], function(err, uploadedFiles){
            if (err) return res.serverError(err);
            else return res.json(uploadedFiles);
        });
    },
    delete: function(req, res) {
        if(! req.param('fileId')){
            res.badRequest("Missing file id");
        }
        async.waterfall([
            function(cb){
                File
                .findOne({id: req.param('fileId')})
                .exec(function(err, file){
                    
                    cb(err, file)
                });
            },
            function(file, cb){
                if(!file){
                    cb(new Error("No such file"), null);
                    return;
                }
                fs.unlink(sails.config.constants.baseAssetsDirectory + file.relativePath, function (err) {
                    cb(err, file);
                });
            },
            function(file, cb){
                File.destroy({id: file.id})
                .exec(function(err, files){
                    if (err) cb(err, files);
                    else cb(null, files);
                });
            }
        ], function(err, files){
            if(err) return res.badRequest(err);
            else return res.json(files);
        });
    },
    findByDomain: function(req, res) {
        var domain = req.param('domain');
        File.findBySiteDomain({domain: domain, imageOnly: false}, function(err, files) {
            if(err) res.serverError('Server error');
            res.json(files);
        });
    },
    findImageByDomain: function(req, res) {
        var domain = req.param('domain');
        File.findBySiteDomain({domain: domain, imageOnly: true}, function(err, files) {
            if(err) res.serverError('Server error');
            res.json(files);
        });
    }
};

