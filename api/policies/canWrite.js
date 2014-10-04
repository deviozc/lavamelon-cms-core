/**
 * Created with lavamelon-sails-cms-core.
 * User: deviozc
 * Date: 2014-09-22
 * Time: 03:22 AM
 * To change this template use Tools | Templates.
 */
module.exports = function canWrite(req, res, next) {
    var userId = req.session.userId;
    var domain = req.body.domain;
    if(!domain){
        return res.forbidden('You are not permitted to perform this action.');
    }
    
    User
    .findOne({id:userId})
    .populate('sites')
    .exec(function(err, data){
        if(err) return next(err);
        var canWrite = data.sites.some(function(element) {
            return element.domain === domain;
        });
        if(canWrite){
            return next();
        }
        return res.forbidden('You are not permitted to perform this action.');
    });  
}