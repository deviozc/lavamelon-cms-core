/**
 * Property.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
    attributes: {
        sysid: {
            type: "integer",
            required: true
        },
        type: {
            type: "string",
            required: true
        },
        propertyType: {
            type: "string",
            required: true
        },
        postalCode: {
            type: "string",
            required: true
        },
        fullAddress: {
            type: "string",
            required: false
        },
        address: {
            type: "string",
            required: false
        },
        area: {
            type: "string",
            required: true
        },
        city: {
            type: "string",
            required: true
        },
        imported: {
            type: "boolean",
            required: true,
            defaultsTo: true
        },
        yearBuilt: {
            type: "integer"
        },
        houseNumber: {
            type: "integer"
        },
        numberOfImages: {
            type: "integer"
        },
        images: {
            type: "array"
        },
        listingDate: {
            type: "date"
        },
        listingPrice: {
            type: "integer"
        },
        mlsNumber: {
            type: "string"
        },
        totalBedroom: {
            type: "integer"
        },
        totalBath: {
            type: "integer"
        },
        remarks: {
            type: "string"
        },
        remarks2: {
            type: "string"
        },
        lotSize: {
            type: "float"
        },
        totalFloorSize: {
            type: "float"
        },
        style: {
            type: "string"
        },
        typeOfDwelling: {
            type: "string"
        },
        influence: {
            type: "string"
        },
        imageTransDate: {
            type: "date"
        },
        site: {
            model: 'site'
        },
        listAgentId: {
            type: "string"
        },
        listAgentName: {
            type: "string"
        },
        listAgentPhone: {
            type: "string"
        },
        listAgentURL: {
            type: "string"
        },
        listFirmName: {
            type: "string"
        }
    }
};
