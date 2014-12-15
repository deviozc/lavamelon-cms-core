/**
 * Created with lavamelon-sails-cms-core.
 * User: deviozc
 * Date: 2014-11-24
 * Time: 02:27 AM
 * To change this template use Tools | Templates.
 */
var csv = require("fast-csv");
module.exports = {
    importFromCSV: function(options) {
        var mapping = sails.config.constants.mlsFieldToMongoMapping;
        var filePath = options.filePath;
        var site = options.site;
        var count = 0;
        csv.fromPath(filePath, {
            headers: true
        }).on("data", function(data) {
            var record = {};
            count++;
            record.site = site;
            record.type = 'for_sale';
            record.status = 'active';
            Object.keys(mapping).forEach(function(key) {
                var mapTo = mapping[key];
                var field = data[key];
                if( !! field) {
                    record[mapTo] = field;
                }
            });
            record.remarks = {en: record.remarks + record.remarks2};
            Property.create(record).exec(function(err, created) {
                if(err){
                    console.log(err);
                }
//                 console.log(record);
            });
        }).on("end", function() {
            console.log("done");
        });
    }
};