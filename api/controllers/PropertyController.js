/**
 * PropertyController
 *
 * @description :: Server-side logic for managing properties
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var ObjectId = require('mongodb').ObjectID;
var _formatMapBound = function(req) {
    if( !! req.query.nek && !! req.query.neC && !! req.query.swk && !! req.query.swC) {
        return [[parseFloat(req.query.swC), parseFloat(req.query.swk)], [parseFloat(req.query.neC), parseFloat(req.query.nek)]];
    }
    return;
};
module.exports = {
    _config: {
        actions: false,
        shortcuts: false,
        rest: true,
        pluralize: true
    },
    importProperties: function(req, res) {
        console.log('test');
        MLSImporter.importFromCSV({
            filePath: __dirname + "/../../assets/property-11.csv",
            site: '547a9b245f6520773cef756c'
        });
    },
    getOne: function(req, res) {
        var id = req.param('id');
        Property.findOne({
            id: id,
            $or: [{
                status: 'active'
            }, {
                status: 'processed'
            }]
        }).exec(function(err, property) {
            if( !! err) {
                res.serverError('db error');
                return;
            }
            if(!property) {
                res.badRequest('Property cannot be found.');
                return;
            }
            if( !! property.images) {
                File.populateArrayOfFiles({
                    files: property.images
                }, function(err, files) {
                    property.images = files;
                    res.json(property);
                    return;
                });
            } else {
                res.json(property);
                return;
            }
        });
    },
    deleteProperty: function(req, res) {
        var id = req.param('id');
        Property.update({
            id: id
        }, {
            status: 'deleted'
        }).exec(function(err, property) {
            if(err) {
                res.serverError('db error');
            }
            if(property.length === 0) {
                res.badRequest('Property not found');
            }
            res.ok('success');
            return;
        });
    },
    get: function(req, res) {
        var domain = req.query.domain;
        var agent = req.query.agent;
        var type = req.query.type;
        var mlsID = req.query.mls;
        var page = req.query.page;
        var limit = req.query.limit || 100000;
        var boundingBox = _formatMapBound(req);
        var priceLow = parseFloat(req.query.price_low) || 0;
        var priceHigh = parseFloat(req.query.price_high) || -1;
        var pagination = {
            limit: limit
        };
        if( !! page) {
            pagination.page = page;
        }
        if(!domain) {
            res.badRequest('Invalid request, missing domain');
            return;
        }
        var condition = {
            //             status: 'active'
        };
        condition["listingPrice"] = {
            $gte: priceLow
        };
        if(priceHigh !== -1) {
            condition.listingPrice["$lte"] = priceHigh;
        }
        if( !! agent) {
            condition["listAgentId"] = agent;
        }
        if( !! type) {
            condition["propertyType"] = type;
        }
        if( !! mlsID) {
            condition["mlsNumber"] = mlsID;
        }
        if( !! boundingBox) {
//             condition["location"] = {
//                 "$geoWithin": {
//                     "$box": boundingBox
//                 }
//             };
        }
        console.log(JSON.stringify(condition));
        async.waterfall([
            function(cb) {
                Site.findOne({
                    domain: domain
                }).exec(function(err, site) {
                    cb(err, site.id)
                });
            }
        ], function(err, siteId) {
            if(err) {
                res.serverError("DB error");
            }
            if(!siteId) {
                res.badRequest("Site not found");
            }
            condition.site = new ObjectId(siteId);
            Property.native(function(err, collection) {
                collection.find(condition, {remarks: 0, remarks2: 0}).limit(limit).toArray(function(err, properties) {
                    if(err) {
                        res.serverError("db error");
                    }
                    async.each(properties, function(property, cb) {
                        if( !! property.numberOfImages && property.numberOfImages > 0) {
                            property.importedImages = [];
                            for(var i = 0; i < property.numberOfImages; i++) {
                                property.importedImages.push(sails.config.constants.basePropertyImageURL + 'image-' + property.sysid + '-' + i + '.jpg');
                            }
                        }
                        if( !! property.images) {
                            File.populateArrayOfFiles({
                                files: property.images
                            }, function(err, files) {
                                property.images = files;
                                cb(err);
                            });
                        } else {
                            cb();
                        }
                    }, function(err) {
                        if( !! err) {
                            res.serverError("DB Error");
                            return;
                        }
                        res.json(properties);
                        return;
                    });
                });
            });
            //             Property.find(condition).paginate(pagination).exec(function(err, properties) {
            //                 if(err) res.serverError("db error");
            //                 async.each(properties, function(property, cb) {
            //                     if( !! property.numberOfImages && property.numberOfImages > 0) {
            //                         property.importedImages = [];
            //                         for(var i = 0; i < property.numberOfImages; i++) {
            //                             property.importedImages.push(sails.config.constants.basePropertyImageURL + 'image-' + property.sysid + '-' + i + '.jpg');
            //                         }
            //                     }
            //                     if( !! property.images) {
            //                         File.populateArrayOfFiles({
            //                             files: property.images
            //                         }, function(err, files) {
            //                             property.images = files;
            //                             cb(err);
            //                         });
            //                     } else {
            //                         cb();
            //                     }
            //                 }, function(err) {
            //                     if( !! err) {
            //                         res.serverError("DB Error");
            //                         return;
            //                     }
            //                     res.json(properties);
            //                     return;
            //                 });
            //             });
        });
    }
};