/**
 * Article.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
    schema: true,
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
                articles.forEach(function(element) {
                    delete element.site;
                    if( !! element.images && element.images.length > 0) {
                        element.images.forEach(function(image) {
                            condition.push({
                                id: image
                            });
                        });
                    }
                });
                File.find({
                    $or: condition
                }).exec(function(err, imageResult) {
                    articles.forEach(function(element) {
                        if( !! element.images) {
                            element.images = element.images.map(function(image) {
                                var mappedResult = {};
                                imageResult.some(function(result) {
                                    if(result.id == image) {
                                        mappedResult = result;
                                        return true;
                                    }
                                    return false;
                                });
                                return mappedResult;
                            });
                        }
                    });
                    cb(null, articles);
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