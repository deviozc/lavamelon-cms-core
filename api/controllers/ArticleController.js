/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var findDomainSection = function(req, res) {
    var domain = req.param('domain');
    var section = req.param('section');
    Article.findBySiteDomainSection({domain: domain, section: section}, function(err, articles) {
        if(err) res.serverError('Server error');
        res.json(articles);
    })
}
module.exports = {
    _config: {
        actions: true,
        shortcuts: false,
        rest: true,
        pluralize: true
    },
    findByDomain: function(req, res) {
        findDomainSection(req, res);
    },
    findBySection: function(req, res) {
        findDomainSection(req, res);
    }
};