/**
 * Created with lavamelon-sails-cms-core.
 * User: deviozc
 * Date: 2014-09-22
 * Time: 03:22 AM
 * To change this template use Tools | Templates.
 */
module.exports = function isAdmin(req, res, next) {
    var userId = req.session.userId;
    User
    .findOne({id:userId})
    .exec(function(err, data){
        if(err) return next(err);
        if(!!data.admin){
            return next();
        }
        return res.forbidden('You are not permitted to perform this action.');
    });
}