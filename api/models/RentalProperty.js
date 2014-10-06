/**
* RentalProperty.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      title: {
          type: 'string',
          required: true
      },
      description: {
          type: 'string',
          required: true
      },
      phone: {
          type: 'string',
          required: true
      },
      email: {
          type: 'string'
      },
      city: {
          type: 'string'
      },
      address: {
          type: 'string'
      },
      contactPerson: {
          type: 'string',
          required: true
      },
      price: {
          type: 'float'
      }
  }
};

