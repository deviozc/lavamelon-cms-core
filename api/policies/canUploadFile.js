/**
 * Created with lavamelon-sails-cms-core.
 * User: deviozc
 * Date: 2014-12-22
 * Time: 12:43 AM
 * To change this template use Tools | Templates.
 */
var multiparty = require('multiparty');
module.exports = function canUploadFile(req, res, next) {
    var userId = req.session.userId;
    async.waterfall([
        function(callback) {
            var form = new multiparty.Form();
            form.parse(req, function(err, fields, files) {
                callback(err, fields.domain);
            });
        }
    ], function(err, domain) {
        console.log(domain);
        if(!domain) {
            return res.forbidden('You are not permitted to perform this action.');
        }
        domain = domain[0];
        // inject domain to body
        req.body.domain = domain;
        User.findOne({
            id: userId
        }).populate('sites').exec(function(err, data) {
            if(err) return next(err);
            var canWrite = data.sites.some(function(element) {
                if(element.domain === domain) {
                    // inject site id into the request object
                    if( !! req.body) {
                        req.body.site = element.id;
                    }
                    req.site = element.id;
                    return true;
                }
                return false;
            });
            if(canWrite) {
                return next();
            }
            console.log("domain");
            return res.forbidden('You are not permitted to perform this action.');
        });
    });
}