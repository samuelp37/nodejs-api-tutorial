const knex = require("../../knex/knex.js");

// constructor
const Customer = function(customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

const toJson = function(customer){
  return {
    "email": customer.email,
    "name": customer.name,
    "active": customer.active
  };
}

Customer.create = (newCustomer, result) => { 
  knex('customers')
  .insert(newCustomer)
  .returning('id')
  .then(
    function (id){
      result(null, {"data": {...{"id": id[0]}, ...toJson(newCustomer)} });
    }
  )
  .catch(
    function(error){
      console.log(error.message);
      result({"code": 500, "message": error.message},null);
    }
  );
  return;
};

module.exports = Customer;