/**
 * Article.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
    schema: true,
    attributes: {
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
        images: {
            type: "array"
        },
        site: {
            model: 'site'
        }
    },
    findBySiteDomainSection: function(opts, callback) {
        var domain = opts.domain;
        var section = opts.section;
        var articleFindCondition = {};
        if( !! section) {
            articleFindCondition = {
                section: section
            };
        }
        async.waterfall([
            function(cb) {
                Article.find(articleFindCondition).populate('en').populate('zh').populate('site', {
                    domain: domain
                }).exec(function(err, articles) {
                    if(err) return cb(err);
                    return cb(null, articles);
                });
            },
            function(articles, cb) {
                var condition = [];
                async.each(articles, function(article, cb) {
                    delete article.site;
                    if( !! article.images && article.images.length > 0) {
                        File.populateArrayOfFiles({
                            files: article.images
                        }, function(err, files) {
                            article.images = files;
                            cb(err);
                        });
                    }else{
                        cb();
                    }
                }, function(err) {
                    if( !! err) {
                        return cb(err);
                    }
                    return cb(null, articles);
                });
            }
        ], function(err, articles) {
            if(err) {
                callback(err);
            }
            return callback(null, articles);
        });
    }
};