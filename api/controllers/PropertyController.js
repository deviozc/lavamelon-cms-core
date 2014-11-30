/**
 * PropertyController
 *
 * @description :: Server-side logic for managing properties
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
    _config: {
        actions: true,
        shortcuts: false,
        rest: true,
        pluralize: true
    },
    import: function(req, res) {
        MLSImporter.importFromCSV({
            filePath: __dirname + "/../../assets/property-11.csv",
            site: '54228a6912e32302038e11c2'
        });
    },
    getOne: function(req, res) {
        var id = req.param('id');
        Property.findOne({id:id})
        .exec(function(err, property){
            if(err) res.serverError('db error');
            res.json(property);
            return;
        });
    },
    get: function(req, res) {
        var domain = req.query.domain;
        var agent = req.query.agent;
        var type = req.query.type;
        if(!domain) {
            res.badRequest('Invalid request, missing domain');
            return;
        }
        var condition = {};
        if( !! agent) {
            condition["listAgentId"] = agent;
        }
        if( !! type) {
            condition["propertyType"] = type;
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
            if(err){
                res.serverError("DB error");
            }
            if(!siteId){
                res.badRequest("Site not found");
            }
            condition.site = siteId;
            Property.find(condition).exec(function(err, properties) {
                if(err) res.serverError("db error");
                res.json(properties);
                return;
            });
        });
    }
};