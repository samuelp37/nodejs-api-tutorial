const knex = require("../../knex/knex.js");

class Customer{

  constructor(customer){
    this.email = customer.email;
    this.name = customer.name;
    this.active = customer.active;
  }

  toJson(){
    return {
      "email": this.email,
      "name": this.name,
      "active": this.active
    };
  }

  static create(newCustomer, result){ 
    var response;
    knex('customers')
    .insert(newCustomer)
    .returning('id')
    .then(
      function (id){
        response = {
          "statusCode": 200,
          "data": {...{"id": id[0]}, ...newCustomer.toJson()}
        };
        result(null, response);
      }
    )
    .catch(
      function(error){
        console.log(error.message);
        response = {
          "statusCode": 400,
          "message": error.message
        };
        result(response,null);
      }
    );
    return;
  }

  static findById(customerId, result){
    var response;
    knex('customers')
    .where('id', customerId)
    .select('*')
    .then(
      function (customersFound){
        if(customersFound.length>0){
          response = {
            "statusCode": 200,
            "data": {"customer": customersFound[0]}
          };
          result(null, response);
        }
        else{
          response = {
            "statusCode": 404,
            "message": `No customer found with ID ${customerId}`
          };
          result(response, null);
        }
      }
    )
    .catch(
      function(error){
        console.log(error.message);
        response = {
          "statusCode": 500,
          "message": error.message
        };
        result(response,null);
      }
    );
    return;
  }

}

module.exports = Customer;