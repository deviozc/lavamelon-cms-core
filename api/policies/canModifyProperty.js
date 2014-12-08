/**
* Created with lavamelon-sails-cms-core.
* User: deviozc
* Date: 2014-12-04
* Time: 04:32 AM
* To change this template use Tools | Templates.
*/
module.exports = function canModifyProperty(req, res, next) {
    var userId = req.session.userId;
    var propertyId = req.param('id');
    if(!propertyId){
        return res.forbidden('You are not permitted to perform this action.');
    }
    Property.findOne({id:propertyId})
    .populate('site')
    .then(function(property){
        user = User.findOne({id:userId})
                .populate('sites')
                .then(function(user){
            return user;
        });
        console.log(property);
        return [property.site, user];
    }).spread(function(site, user){
        var sites = user.sites;
        if(!sites){
            return res.forbidden('You are not permitted to perform this action.');
        }
        
        var canModified = sites.some(function(element){
            
            return element.id === site.id;
        });
        if(canModified){
            return next();
        }
        return res.forbidden('You are not permitted to perform this action.');
    }).catch(function(err){
        console.log(err);
        return res.serverError(err);
    });  
}