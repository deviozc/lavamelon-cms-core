/**
* File.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      filename: {
          type: "string",
          required: true
      },
      relativePath: {
          type: "string",
          required: true
      },
      contentType: {
          type: "string",
          required: true
      },
      site:{
            model: 'site'
      }
  },
  findBySiteDomain: function(opts, cb){
      var domain = opts.domain;
      var condition = {};
      if(opts.imageOnly){
          condition["contentType"] = /image.*/;
      }
          

      File
      .find(condition)
      .populate('site', {domain: domain})
      .exec(function(err, files){
          if(err) return cb(err);
          files.forEach(function(element){
              delete element.site;
          });
          return cb(null, files);
      });
  }
};

