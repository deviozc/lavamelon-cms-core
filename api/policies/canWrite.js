/**
 * Created with lavamelon-sails-cms-core.
 * User: deviozc
 * Date: 2014-09-22
 * Time: 03:22 AM
 * To change this template use Tools | Templates.
 */
module.exports = function canWrite(req, res, next) {
    var userId = req.session.userId;
    
    var domain = req.param('domain');
    if(!!req.body){
        domain = (typeof req.body.domain !== "undefined") ? req.body.domain : req.param('domain');
    }
    
    if(!domain){
        console.log(domain);
        return res.forbidden('You are not permitted to perform this action.');
    }
    
    User
    .findOne({id:userId})
    .populate('sites')
    .exec(function(err, data){
        if(err) return next(err);
        var canWrite = data.sites.some(function(element) {
            if(element.domain === domain){
                // inject site id into the request object
                if(!!req.body){
                    req.body.site = element.id;
                }
                req.site = element.id;
                return true;
            }
            return false;
        });
        if(canWrite){
            return next();
        }
        console.log("domain");
        return res.forbidden('You are not permitted to perform this action.');
    });  
}