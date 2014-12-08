/**
 * PropertyController
 *
 * @description :: Server-side logic for managing properties
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
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
            status: 'active'
        }).exec(function(err, property) {
            if(err) res.serverError('db error');
            res.json(property);
            return;
        });
    },
    deleteProperty: function(req, res) {
        var id = req.param('id');
        Property.update({
            id: id
        }, {
            status: 'deleted'
        }).exec(function(err, property) {
            if(err) res.serverError('db error');
            if(property.length === 0){
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
        var limit = 100;
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
            status: 'active'
        };
        if( !! agent) {
            condition["listAgentId"] = agent;
        }
        if( !! type) {
            condition["propertyType"] = type;
        }
        if( !! mlsID) {
            condition["mlsNumber"] = mlsID;
        }
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
            condition.site = siteId;
            Property.find(condition).paginate(pagination).exec(function(err, properties) {
                if(err) res.serverError("db error");
                res.json(properties);
                return;
            });
        });
    }
};