/**
* Created with lavamelon-sails-cms-core.
* User: deviozc
* Date: 2014-10-24
* Time: 10:47 PM
* To change this template use Tools | Templates.
*/
module.exports.constants = {
    // 0 => infinite
    // 240000 => 4 minutes (240,000 miliseconds)
    uploadTimeout: 120000,
    uploadMaxBytes: 10000000,
    baseAssetsDirectory: "/var/www/lavamelon.com/public_html/assets/uploads",
    baseAssetsURL: "www.lavamelon.com/assets/uploads/",
    basePropertyImageURL: "http://www.lavamelon.com/mls/mls-images",
    
    mlsFieldToMongoMapping: {
        sysid: "sysid",
        1: "propertyType",
        11: "postalCode",
        14: "fullAddress",
        16: "yearBuilt",
        181: "houseNumber",
        3976: "address",
        2283: "area",
        3794: "city",
        186: "numberOfImages",
        224: "listingDate",
        226: "listingPrice",
        248: "mlsNumber",
        378: "totalBedroom",
        3928: "totalBath",
        411: "remarks",
        3985: "remarks2",
        2460: "lotSize",
        3922: "totalFloorSize",
        2731: "style",
        2733: "typeOfDwelling",
        3926: "influence",
        342: "listAgentId",
        2703: "listAgentName",
        2711: "listAgentPhone",
        2705: "listAgentURL",
        2679: "listFirmName"
    }
}