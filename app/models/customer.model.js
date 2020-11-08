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

}

module.exports = Customer;