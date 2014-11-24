/**
 * PropertyController
 *
 * @description :: Server-side logic for managing properties
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	_config: {
        actions: true,
        shortcuts: false,
        rest: true,
        pluralize: true
    },
    import: function(req, res){
//         console.log(__dirname + "/../../assets/property-7.csv");
        
        MLSImporter.importFromCSV({filePath: __dirname + "/../../assets/property-7.csv"});
        
    }
};

