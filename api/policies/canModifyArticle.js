/**
 * Created with lavamelon-sails-cms-core.
 * User: deviozc
 * Date: 2014-09-22
 * Time: 03:22 AM
 * To change this template use Tools | Templates.
 */
module.exports = function canModifyArticle(req, res, next) {
    var userId = req.session.userId;
    var articleId = req.param('id');
    if(!articleId){
        return res.forbidden('You are not permitted to perform this action.');
    }
    Article.findOne({id:articleId})
    .populate('site')
    .then(function(article){
        user = User.findOne({id:userId})
                .populate('sites')
                .then(function(user){
            return user;
        });
        console.log(article);
        return [article.site, user];
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