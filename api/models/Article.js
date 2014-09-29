/**
 * Article.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
    schema:true,
    attributes: {
        template: {
            type: "string",
            required: true
        },
        section: {
            type: "string",
            required: true
        },
        en: {
            model: 'articleContent'
        },
        zh: {
            model: 'articleContent'
        },
        site:{
            model: 'site'
        }
    },
    findBySiteDomainSection: function(opts, cb){
        var domain = opts.domain;
        var section = opts.section;
        var articleFindCondition = {};
        if(!!section){
            articleFindCondition = {section: section};
        }
        Article
        .find(articleFindCondition)
        .populate('en')
        .populate('zh')
        .populate('site', {domain: domain})
        .exec(function(err, articles){
            if(err) return cb(err);
            articles.forEach(function(element){
                delete element.site;
            });
            return cb(null, articles);
        });
    
    }
};